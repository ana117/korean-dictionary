import os
import requests
from bs4 import BeautifulSoup
import re
import xmltodict


_CERT_PATH = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'kr.pem')
_BASE_SEARCH_URL = 'https://krdict.korean.go.kr/eng/dicSearch/search?nation=eng&nationCode=6&sort=C&mainSearchWord='
_BASE_API_URL = 'https://krdict.korean.go.kr/api/search'


def clean_word(word):
    word = ' '.join(re.split('\s+', word, flags=re.UNICODE))
    return word


def fetch_html(url, cert_path=_CERT_PATH):
    page = requests.get(url, verify=cert_path)
    return BeautifulSoup(page.content, 'html.parser')


def parse_search_results(soup):
    raw_items = soup.find_all('dl')
    if len(raw_items) == 0:
        return []

    items = []
    for raw_item in raw_items:
        korean_word = raw_item.find('span', class_='word_type1_17').get_text()
        korean_word = clean_word(korean_word)
        korean_word = korean_word.split()[0]

        raw_code = raw_item.find('a', class_='allview manyLang6')['href']
        pattern = "'(\d+)'"
        code = re.search(pattern, raw_code).group(1)

        translations = []
        raw_translations = raw_item.find_all('dd', class_='manyLang6')
        for i in range(0, len(raw_translations), 2):
            word_translation = clean_word(raw_translations[i].get_text())

            if any(char.isdigit() for char in word_translation):
                word_translation = " ".join(word_translation.split()[1:])

            definition_translation = clean_word(raw_translations[i+1].get_text())
            translations.append({
                'translation': {
                    'trans_word': word_translation,
                    'trans_dfn': definition_translation
                }
            })

        items.append({
            'target_code': code,
            'word': korean_word,
            'sense': translations
        })

    return items


def eng_to_kor(word):
    soup = fetch_html(_BASE_SEARCH_URL + word)
    items = parse_search_results(soup)
    channel = {
        'total': str(len(items)),
        'item': items
    }
    return channel


def kor_to_eng(params):
    response = requests.get(_BASE_API_URL, params=params, verify=_CERT_PATH)
    return xmltodict.parse(response.content)
