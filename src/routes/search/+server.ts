import { KRDICT_API_KEY } from '$env/static/private';
import type { KoreanTranslation, KoreanWord } from '$lib/types';
import { json } from '@sveltejs/kit';
import { XMLParser } from 'fast-xml-parser';

const API_URL = 'https://krdict.korean.go.kr/api/search';

export async function POST({ request }) {
	const { word }: { word: string } = await request.json();

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

	let words: KoreanWord[] = [];
	try {
		words = _parse_xml(xml);
	} catch (e) {
		console.error(e);
		console.error(xml);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
	return json(words);
}

const _parse_xml = (xml: string): KoreanWord[] => {
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
	for (const item of channel.item) {
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
