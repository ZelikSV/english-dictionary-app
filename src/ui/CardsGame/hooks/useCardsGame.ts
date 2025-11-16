import { useState, useCallback } from 'react';
import { IWord } from '@/types';

import { Lang } from '@/lib/constants';

export interface Card {
  id: string;
  word: IWord;
  frontText: string;
  backText: string;
  frontLanguage: Lang;
  isFlipped: boolean;
}

export interface RoundStats {
  currentRound: number;
  totalFlipped: number;
  cardsPerRound: number;
}

export const CARDS_PER_ROUND = 4;

export const useCardsGame = (words: IWord[]) => {
  const [currentCards, setCurrentCards] = useState<Card[]>([]);
  const [roundStats, setRoundStats] = useState<RoundStats>({
    currentRound: 1,
    totalFlipped: 0,
    cardsPerRound: CARDS_PER_ROUND,
  });
  const [gameLanguage, setGameLanguage] = useState<Lang>(Lang.EN);
  const [gameStarted, setGameStarted] = useState(false);
  const [allCardsFlipped, setAllCardsFlipped] = useState(false);

  const createCards = useCallback(
    (gameWords: IWord[], language: Lang): Card[] => {
      const shuffledWords = [...gameWords].sort(() => Math.random() - 0.5);
      const selectedWords = shuffledWords.slice(0, CARDS_PER_ROUND);
      const isEnglish = language === Lang.EN;

      return selectedWords.map(word => ({
        id: word.id,
        word,
        frontText: isEnglish ? word.en : word.ua,
        backText: isEnglish ? word.ua : word.en,
        frontLanguage: language,
        isFlipped: false,
      }));
    },
    []
  );

  const initializeGame = useCallback(
    (selectedLanguage: Lang = Lang.EN) => {
      setGameStarted(true);

      const newCards = createCards(words, selectedLanguage);

      setCurrentCards(newCards);
    },
    [words]
  );

  const startNewRound = () => {
    const newCards = createCards(words, gameLanguage);
    setCurrentCards(newCards);
    setAllCardsFlipped(false);
  };

  const flipCard = useCallback(
    (cardId: string) => {
      const updatedCards = currentCards.map(card => {
        if (card.id === cardId && !card.isFlipped) {
          setRoundStats(prev => ({
            ...prev,
            totalFlipped: prev.totalFlipped + 1,
          }));
          return { ...card, isFlipped: true };
        }
        return card;
      });

      setCurrentCards(updatedCards);

      const allFlipped = updatedCards.every(card => card.isFlipped);

      if (allFlipped) {
        setAllCardsFlipped(true);
      }
    },
    [currentCards, setRoundStats, setAllCardsFlipped]
  );

  const nextRound = () => {
    setRoundStats(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
    }));
    startNewRound();
  };

  const changeLanguage = useCallback(
    (newLanguage: Lang) => {
      setGameLanguage(newLanguage);

      const isEnglish = newLanguage === Lang.EN;
      const updatedCards = currentCards.map(card => ({
        ...card,
        frontText: isEnglish ? card.word.en : card.word.ua,
        backText: isEnglish ? card.word.ua : card.word.en,
        frontLanguage: newLanguage,
        isFlipped: false,
      }));

      setCurrentCards(updatedCards);

      setAllCardsFlipped(false);
    },
    [currentCards, setAllCardsFlipped, setCurrentCards]
  );

  return {
    currentCards,
    roundStats,
    gameLanguage,
    gameStarted,
    allCardsFlipped,
    initializeGame,
    flipCard,
    nextRound,
    changeLanguage,
    startNewRound,
  };
};
