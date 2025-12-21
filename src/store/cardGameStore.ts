import { create } from 'zustand';
import { keyBy } from 'lodash';

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

export interface ICardGameStore {
    currentWordId: string;
    selectedWordIds: string[];
    availableWordIds: string[];
    wordsMap: Record<string, IWord>;
    card: ICard | null;
}

const prepareCard = (word: IWord | null) => {
    if (!word) {
        return null;
    }

    return {
        id: word.id,
        word: word,
        frontText: word.en,
        backText: word.ua,
        frontLanguage: Lang.EN,
        isFlipped: false,
    };
};

const defaultCardGameState = {
    currentWordId: '',
    selectedWordIds: [],
    availableWordIds: [],
    wordsMap: {},
    card: null,
};

export const useCardGameStore = create<ICardGameStore>(() => defaultCardGameState);

export const selectNewWord = () =>
    useCardGameStore.setState(state => {
        const availableWordIds = state.availableWordIds;
        const newId = availableWordIds.length ? availableWordIds.pop() : null;
        const currentCard = state.card;

        return {
            ...state,
            ...(newId && {
                currentWordId: newId,
                selectedWordIds: [
                    ...state.selectedWordIds,
                    ...(currentCard?.id ? [currentCard.id] : []),
                ],
                availableWordIds,
                card: prepareCard(state.wordsMap[newId] ?? null),
            }),
        };
    });

export const selectPrevWord = () =>
    useCardGameStore.setState(state => {
        const selectedWordIds = state.selectedWordIds;
        const prevId = selectedWordIds.length ? selectedWordIds.pop() : null;
        const currentCard = state.card;

        return {
            ...state,
            ...(prevId && {
                currentWordId: prevId,
                selectedWordIds: selectedWordIds,
                availableWordIds: [
                    ...state.availableWordIds,
                    ...(currentCard?.id ? [currentCard.id] : []),
                ],
                card: prepareCard(state.wordsMap[prevId] ?? null),
            }),
        };
    });

export const setAvailableWordsIds = (ids: string[]) =>
    useCardGameStore.setState({ availableWordIds: ids });

export const editCard = () =>
    useCardGameStore.setState(state => ({
        card: state.card
            ? {
                  ...state.card,
                  isFlipped: !state.card?.isFlipped,
              }
            : null,
    }));

export const setWordsMaps = (wordsList: IWord[]) =>
    useCardGameStore.setState({ wordsMap: keyBy(wordsList, word => word.id) });

export const resetCardGameStore = () => useCardGameStore.setState(defaultCardGameState);
