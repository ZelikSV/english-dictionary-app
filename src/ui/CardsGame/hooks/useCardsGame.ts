import { useState, useCallback } from 'react';
import { IWord } from '@/types';

export interface Card {
  id: string;
  word: IWord;
  frontText: string;
  backText: string;
  frontLanguage: 'en' | 'ua';
  isFlipped: boolean;
}

export interface RoundStats {
  currentRound: number;
  totalFlipped: number;
  cardsPerRound: number;
}

const CARDS_PER_ROUND = 4;

export const useCardsGame = (words: IWord[]) => {
  const [currentCards, setCurrentCards] = useState<Card[]>([]);
  const [roundStats, setRoundStats] = useState<RoundStats>({
    currentRound: 1,
    totalFlipped: 0,
    cardsPerRound: CARDS_PER_ROUND,
  });
  const [gameLanguage, setGameLanguage] = useState<'en' | 'ua'>('en');
  const [gameStarted, setGameStarted] = useState(false);
  const [allCardsFlipped, setAllCardsFlipped] = useState(false);

  const createCards = useCallback(
    (gameWords: IWord[], language: 'en' | 'ua'): Card[] => {
      const shuffledWords = [...gameWords].sort(() => Math.random() - 0.5);
      const selectedWords = shuffledWords.slice(0, CARDS_PER_ROUND);

      return selectedWords.map(word => ({
        id: word.id,
        word,
        frontText: language === 'en' ? word.en : word.ua,
        backText: language === 'en' ? word.ua : word.en,
        frontLanguage: language,
        isFlipped: false,
      }));
    },
    []
  );

  const initializeGame = useCallback(
    (selectedLanguage: 'en' | 'ua' = 'en') => {
      setGameStarted(true);

      const newCards = createCards(words, selectedLanguage);

      setCurrentCards(newCards);

      setAllCardsFlipped(false);
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
    (newLanguage: 'en' | 'ua') => {
      setGameLanguage(newLanguage);

      const updatedCards = currentCards.map(card => ({
        ...card,
        frontText: newLanguage === 'en' ? card.word.en : card.word.ua,
        backText: newLanguage === 'en' ? card.word.ua : card.word.en,
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
    CARDS_PER_ROUND,
    initializeGame,
    flipCard,
    nextRound,
    changeLanguage,
    startNewRound,
  };
};
