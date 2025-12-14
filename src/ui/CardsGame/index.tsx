'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetWordsByGroupId } from '@/lib/hooks/useGetWordGroupById';
import { Loading } from '@/ui/Loading';
import { CARDS_PER_ROUND, useCardsGame } from './hooks/useCardsGame';
import { GameCard, GameCardActions } from './components';

const CardsGame = () => {
    const router = useRouter();
    const { wordsByGroups, loading } = useGetWordsByGroupId();

    const { currentCard, gameStarted, initializeGame, flipCard, startNewRound } =
        useCardsGame(wordsByGroups);

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

    if (wordsByGroups.length === 0 || !gameStarted || !currentCard) {
        return <Loading />;
    }

    return (
        <>
            <GameCard key={currentCard.id} card={currentCard} onFlip={flipCard} />
            <GameCardActions onNextRound={startNewRound} onPrevRound={startNewRound} />
        </>
    );
};

export default CardsGame;
