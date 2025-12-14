import { useState, useCallback } from 'react';
import { IWord } from '@/types';

import { Lang } from '@/lib/constants';

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
    const [currentCard, setCurrentCard] = useState<ICard | null>(null);
    const [gameStarted, setGameStarted] = useState(false);
    const gameLanguage = Lang.EN;

    const createCard = useCallback((gameWords: IWord[], language: Lang): ICard => {
        const shuffledWords = [...gameWords].sort(() => Math.random() - 0.5);
        const selectedWords = shuffledWords.slice(0, CARDS_PER_ROUND);
        const isEnglish = language === Lang.EN;

        const [createdCard] = selectedWords.map(word => ({
            id: word.id,
            word,
            frontText: isEnglish ? word.en : word.ua,
            backText: isEnglish ? word.ua : word.en,
            frontLanguage: language,
            isFlipped: false,
        }));

        return createdCard;
    }, []);

    const initializeGame = useCallback(() => {
        setGameStarted(true);

        const newCard = createCard(words, gameLanguage);

        setCurrentCard(newCard);
    }, [words, gameLanguage, createCard]);

    const startNewRound = () => {
        const newCard = createCard(words, gameLanguage);
        setCurrentCard(newCard);
    };

    const flipCard = useCallback(
        (cardId: string) => {
            if (currentCard?.id === cardId) {
                setCurrentCard({ ...currentCard, isFlipped: !currentCard.isFlipped });
            }
        },
        [currentCard],
    );

    return {
        currentCard,
        gameStarted,
        initializeGame,
        flipCard,
        startNewRound,
    };
};
