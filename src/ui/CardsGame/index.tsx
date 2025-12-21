'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useGetWordsByGroupId } from '@/lib/hooks/useGetWordGroupById';
import {
    editCard,
    selectNewWord,
    selectPrevWord,
    useCardGameStore,
    setWordsMaps,
    setAvailableWordsIds,
    resetCardGameStore,
} from '@/store/cardGameStore';

import { CardPreLoader, GameCard, GameCardActions } from './components';

const CARDS_PER_ROUND = 1;

const CardsGame = () => {
    const router = useRouter();
    const { wordsByGroups, loading } = useGetWordsByGroupId();
    const { card, availableWordIds, wordsMap, currentWordId } = useCardGameStore();

    useEffect(() => {
        setWordsMaps(wordsByGroups);
    }, [wordsByGroups]);

    useEffect(() => {
        if (Object.keys(wordsMap).length && !availableWordIds.length) {
            setAvailableWordsIds(Object.keys(wordsMap));
        }

        if (!currentWordId && availableWordIds.length) {
            selectNewWord();
        }
    }, [wordsMap, availableWordIds]);

    useEffect(() => {
        if (!loading && wordsByGroups?.length) {
            if (wordsByGroups?.length < CARDS_PER_ROUND) {
                alert(`Потрібно мінімум ${CARDS_PER_ROUND} слів для вивчення карток!`);
                router.push('/');

                return;
            }
        }

        return () => resetCardGameStore();
    }, [loading, wordsByGroups]);

    if (wordsByGroups.length === 0 || !card) {
        return <CardPreLoader />;
    }

    return (
        <>
            <GameCard key={card.id} card={card} onFlip={editCard} />
            <GameCardActions onNextRound={selectNewWord} onPrevRound={selectPrevWord} />
        </>
    );
};

export default CardsGame;
