import { KRDICT_API_KEY } from '$env/static/private';
import type { KoreanTranslation, KoreanWord } from '$lib/types';
import { json } from '@sveltejs/kit';
import { XMLParser } from 'fast-xml-parser';
import { parseHTML } from 'linkedom';
import { default as hangul } from 'hangul-js';

const API_URL = 'https://krdict.korean.go.kr/api/search';
const SCRAPE_URL = 'https://krdict.korean.go.kr/eng/dicMarinerSearch/search?nation=eng&nationCode=6&sort=C&mainSearchWord=';

export async function POST({ request }) {
	const { word }: { word: string } = await request.json();
	if (hangul.isCompleteAll(word)) {
		return json(await _api(word));
	}

	return json(await _scrape(word));
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
			translations: translations
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
}


const _cleanWord = (word: string): string => {
  return word.split(/\s+/).join(' ').trim();
}

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

			const definition = _cleanWord(rawTranslations[i + 2].textContent ?? '').replaceAll('"', '').trim();

			translations.push({ 
				text: translation, 
				definition
			});
		}

		results.push({
			code: code,
			koreanWord: koreanWord,
			translations: translations
		});
	}

	return results;
}

const _scrape = async (word: string): Promise<KoreanWord[]> => {
	const url = SCRAPE_URL + word;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch');
	}

	const html = await response.text();
	return _parseHTML(html);
}
