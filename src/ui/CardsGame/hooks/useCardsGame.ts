import { useState, useEffect } from 'react';
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

  const createCards = (gameWords: IWord[], language: 'en' | 'ua'): Card[] => {
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
  };

  const initializeGame = (selectedLanguage: 'en' | 'ua' = 'en') => {
    setGameLanguage(selectedLanguage);
    setGameStarted(true);
    const newCards = createCards(words, selectedLanguage);
    setCurrentCards(newCards);
    setAllCardsFlipped(false);
  };

  const startNewRound = () => {
    const newCards = createCards(words, gameLanguage);
    setCurrentCards(newCards);
    setAllCardsFlipped(false);
  };

  const flipCard = (cardId: string) => {
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
  };

  const nextRound = () => {
    setRoundStats(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
    }));
    startNewRound();
  };

  const changeLanguage = (newLanguage: 'en' | 'ua') => {
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
  };

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
