'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useGetWordsByGroupId } from '@/lib/hooks/useGetWordGroupById';
import { editCard, selectNewWord, selectPrevWord } from '@/store/cardGameStore';
import { Loading } from '@/ui/Loading';

import { CARDS_PER_ROUND, useCardsGame } from './hooks/useCardsGame';
import { GameCard, GameCardActions } from './components';

const CardsGame = () => {
    const router = useRouter();
    const { wordsByGroups, loading } = useGetWordsByGroupId();
    const { currentCard } = useCardsGame(wordsByGroups);

    useEffect(() => {
        if (!loading && wordsByGroups?.length) {
            if (wordsByGroups?.length < CARDS_PER_ROUND) {
                alert(`Потрібно мінімум ${CARDS_PER_ROUND} слів для вивчення карток!`);
                router.push('/');

                return;
            }
        }
    }, [loading, wordsByGroups]);

    if (wordsByGroups.length === 0 || !currentCard) {
        return <Loading />;
    }

    return (
        <>
            <GameCard key={currentCard.id} card={currentCard} onFlip={editCard} />
            <GameCardActions onNextRound={selectNewWord} onPrevRound={selectPrevWord} />
        </>
    );
};

export default CardsGame;
