export type KoreanTranslation = {
	text: string;
	definition: string;
};

export type KoreanWord = {
	code: string;
	koreanWord: string;
	translations: KoreanTranslation[];
};
