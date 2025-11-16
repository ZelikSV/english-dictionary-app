'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetWordsByGroupId } from '@/lib/hooks/useGetWordGroupById';
import { Loading } from '@/ui/Loading';
import { CARDS_PER_ROUND, useCardsGame } from './hooks/useCardsGame';
import { GameHeader } from './components/GameHeader';
import { GameProgress } from './components/GameProgress';
import { GameCard } from './components/GameCard';
import { RoundComplete } from './components/RoundComplete';
import { ProgressIndicator } from './components/ProgressIndicator';

const CardsGame = () => {
  const router = useRouter();
  const { wordsByGroups, loading } = useGetWordsByGroupId();

  const {
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
  } = useCardsGame(wordsByGroups);

  useEffect(() => {
    if (!loading) {
      if (wordsByGroups?.length < CARDS_PER_ROUND) {
        alert(`Потрібно мінімум ${CARDS_PER_ROUND} слів для вивчення карток!`);
        router.push('/');
        return;
      }

      initializeGame();
    }
  }, [loading, wordsByGroups.length, initializeGame, router]);

  if (wordsByGroups.length === 0 || !gameStarted) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        <GameHeader
          currentRound={roundStats.currentRound}
          gameLanguage={gameLanguage}
          totalFlipped={roundStats.totalFlipped}
          onLanguageChange={changeLanguage}
        />

        <GameProgress
          cards={currentCards}
          cardsPerRound={CARDS_PER_ROUND}
          allCardsFlipped={allCardsFlipped}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentCards.map(card => (
            <GameCard key={card.id} card={card} onFlip={flipCard} />
          ))}
        </div>

        {allCardsFlipped && (
          <RoundComplete onNextRound={nextRound} onShuffle={startNewRound} />
        )}

        <ProgressIndicator cards={currentCards} />
      </div>
    </div>
  );
};

export default CardsGame;
