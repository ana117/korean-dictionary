import { KRDICT_API_KEY } from '$env/static/private';
import type { KoreanTranslation, KoreanWord, Pronounciation } from '$lib/types';
import { json } from '@sveltejs/kit';
import { XMLParser } from 'fast-xml-parser';
import { parseHTML } from 'linkedom';
import { default as hangul } from 'hangul-js';

const API_URL = 'https://krdict.korean.go.kr/api/search';
const SCRAPE_URL =
	'https://krdict.korean.go.kr/eng/dicMarinerSearch/search?nation=eng&nationCode=6&sort=C&mainSearchWord=';

const POS_MAPPING: Record<string, string> = {
	'명사': 'noun',
	'동사': 'verb',
	'형용사': 'adjective',
	'대명사': 'pronoun',
	'부사': 'adverb',
	'어미': 'ending',
	'조사': 'particle',
	'관형사': 'determiner',
	'감탄사': 'interjection',
	'수사': 'numeral',
};

const ROMANIZATION_MAPPING: Record<string, string> = {
	'ㄱ': 'g',
	'ㄲ': 'kk',
	'ㄴ': 'n',
	'ㄷ': 'd',
	'ㄸ': 'tt',
	'ㄹ': 'r',
	'ㅁ': 'm',
	'ㅂ': 'b',
	'ㅃ': 'pp',
	'ㅅ': 's',
	'ㅆ': 'ss',
	'ㅇ': '',
	'ㅈ': 'j',
	'ㅉ': 'jj',
	'ㅊ': 'ch',
	'ㅋ': 'k',
	'ㅌ': 't',
	'ㅍ': 'p',
	'ㅎ': 'h',
	'ㅏ': 'a',
	'ㅐ': 'ae',
	'ㅑ': 'ya',
	'ㅒ': 'yae',
	'ㅓ': 'eo',
	'ㅔ': 'e',
	'ㅕ': 'yeo',
	'ㅖ': 'ye',
	'ㅗ': 'o',
	'ㅘ': 'wa',
	'ㅙ': 'wae',
	'ㅚ': 'oe',
	'ㅛ': 'yo',
	'ㅜ': 'u',
	'ㅝ': 'wo',
	'ㅞ': 'we',
	'ㅟ': 'wi',
	'ㅠ': 'yu',
	'ㅡ': 'eu',
	'ㅢ': 'ui',
	'ㅣ': 'i',
};

export async function POST({ request }) {
	const { word }: { word: string } = await request.json();
	if (hangul.isCompleteAll(word)) {
		return json(await _api(word));
	}

	return json(await _scrape(word));
}

const _romanize = (word: string): string => {
	const disassembled = hangul.disassemble(word, true);
	let romanized = '';
	for (const group of disassembled) {
		for (let i = 0; i < group.length; i++) {
			const char = group[i];
			romanized += ROMANIZATION_MAPPING[char] ?? char;

			const isLast = i === group.length - 1;
			if (isLast && char === 'ㅇ') romanized += 'ng';
		}
		romanized += '-';
	}
	romanized = romanized.slice(0, -1);
	return romanized;
}

const _parseXML = (xml: string): KoreanWord[] => {
	const parser = new XMLParser();
	const doc = parser.parse(xml);

	const error = doc.error;
	if (error) {
		throw new Error(error.error_code + ': ' + error.message);
	}

	const channel = doc.channel;

	let items = channel.item;
	if (!items) {
		return [];
	}

	if (!Array.isArray(items)) {
		items = [items];
	}

	const results: KoreanWord[] = [];
	for (const item of items) {
		const translations: KoreanTranslation[] = [];
		let senses = item.sense;
		if (!Array.isArray(senses)) {
			senses = [senses];
		}

		for (const s of senses) {
			const translation = s.translation;
			translations.push({
				text: translation.trans_word,
				definition: translation.trans_dfn
			});
		}

		results.push({
			code: item.target_code,
			koreanWord: item.word,
			romanization: _romanize(item.word),
			translations: translations,
			partOfSpeech: POS_MAPPING[item.pos] ?? '-',
		});
	}

	return results;
};

const _api = async (word: string): Promise<KoreanWord[]> => {
	const params = new URLSearchParams({
		key: KRDICT_API_KEY,
		q: word,
		sort: 'popular',
		part: 'word',
		translated: 'y',
		trans_lang: '1'
	});

	const response = await fetch(`${API_URL}?${params.toString()}`);
	const xml = await response.text();
	return _parseXML(xml);
};

const _cleanWord = (word: string): string => {
	return word.split(/\s+/).join(' ').trim();
};

const _parseHTML = (html: string): KoreanWord[] => {
	const { document } = parseHTML(html);
	const results: KoreanWord[] = [];

	const items = document.querySelectorAll('dl');
	for (const item of items) {
		let koreanWord = _cleanWord(item.querySelector('.word_type1_17')?.textContent ?? '');
		if (/\d$/.test(koreanWord)) {
			koreanWord = koreanWord.split(' ').slice(0, -1).join(' ');
		}

		const code = _cleanWord(item.querySelector('a')?.href.split("'")[1] ?? '');

		const translations: KoreanTranslation[] = [];
		const rawTranslations = item.querySelectorAll('dd');
		for (let i = 0; i < rawTranslations.length; i += 3) {
			let translation = _cleanWord(rawTranslations[i].textContent ?? '');
			if (/^\d/.test(translation)) {
				translation = translation.split(' ').slice(1).join(' ');
			}

			const definition = _cleanWord(rawTranslations[i + 2].textContent ?? '')
				.replaceAll('"', '')
				.trim();

			translations.push({
				text: translation,
				definition
			});
		}

		let pronounciation: Pronounciation | undefined = undefined;
		const sound = item.querySelector('.sound');
		if (sound) {
			const soundRef = sound.getAttribute('href') ?? null;
			if (soundRef && soundRef.startsWith("javascript:fnSoundPlay('")) {
				const soundParent = sound.parentElement;
				const pronounciationText = soundParent?.textContent?.replace('듣기', '').trim();

				pronounciation = {
					pronounciationText: pronounciationText ?? '-',
					audioUrl: soundRef.split("'")[1]
				};
			}
		}

		const posContainer = item.querySelector('.word_att_type1')?.querySelector('.manyLang6');
		const partOfSpeech = posContainer
			? _cleanWord(posContainer.textContent?.replaceAll(/\s+/g, ' ') ?? '')
			: '-';
		

		results.push({
			code: code,
			koreanWord: koreanWord,
			romanization: _romanize(koreanWord),
			translations: translations,
			partOfSpeech: partOfSpeech.toLowerCase(),
			pronounciation: pronounciation
		});
	}

	return results;
};

const _scrape = async (word: string): Promise<KoreanWord[]> => {
	const url = SCRAPE_URL + word;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch');
	}

	const html = await response.text();
	return _parseHTML(html);
};
