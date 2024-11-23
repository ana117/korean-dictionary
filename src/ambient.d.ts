type KoreanTranslation = {
  text: string;
  definition: string;
}

type KoreanWord = {
  code: string;
  koreanWord: string;
  translations: KoreanTranslation[];
}
