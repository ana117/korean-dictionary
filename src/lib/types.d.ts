export type KoreanTranslation = {
	text: string;
	definition: string;
};

export type Pronounciation = {
	pronounciationText: string;
	audioUrl: string;
}

export type KoreanWord = {
	code: string;
	koreanWord: string;
	romanization: string;
	translations: KoreanTranslation[];
	partOfSpeech: string;
	pronounciation?: Pronounciation;
};
