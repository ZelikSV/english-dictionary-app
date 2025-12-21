import { useEffect } from 'react';
import { IWord } from '@/types';

import { Lang } from '@/lib/constants';
import {
    selectNewWord,
    setAvailableWordsIds,
    setWordsMaps,
    useCardGameStore,
} from '@/store/cardGameStore';

export interface ICard {
    id: string;
    word: IWord;
    frontText: string;
    backText: string;
    frontLanguage: Lang;
    isFlipped: boolean;
}

export const CARDS_PER_ROUND = 1;

export const useCardsGame = (words: IWord[]) => {
    const { card, availableWordIds, wordsMap, currentWordId } = useCardGameStore();

    useEffect(() => {
        setWordsMaps(words);
    }, [words]);

    useEffect(() => {
        if (Object.keys(wordsMap).length && !availableWordIds.length) {
            setAvailableWordsIds(Object.keys(wordsMap));
        }

        if (!currentWordId && availableWordIds.length) {
            selectNewWord();
        }
    }, [wordsMap, availableWordIds]);

    return {
        currentCard: card,
    };
};
