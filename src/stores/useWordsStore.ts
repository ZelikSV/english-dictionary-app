import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

import {IDBWord, IWord} from '@/types';
import {DELETE_WORD_URL, GET_WORDS_URL, SET_WORD_URL, SET_WORDS_BULK_URL, UPDATE_WORD_URL} from '@/lib/api';

interface WordsState {
    wordsList: IWord[]
    isLoading: boolean
    error: string | null

    getWords: () => Promise<void>
    addWord: (word: IWord) => Promise<void>
    addWordsBulk: (words: IWord[]) => Promise<void>
    updateWord: (id: string, updates: Partial<IWord>) => Promise<void>
    deleteWord: (id: string) => Promise<void>
    clearError: () => void

    getWordById: (id: string) => IWord | undefined
    getWordsByCategory: (category: string) => IWord[]
    getTotalWords: () => number
}

export const useWordsStore = create<WordsState>()(
    devtools(
        (set, _) => ({
            // Initial State
            wordsList: [],
            isLoading: false,
            error: null,

            getWords: async () => {
                set({isLoading: true, error: null}, false, 'getWords/start');

                try {
                    const response = await fetch(GET_WORDS_URL);

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const words: IDBWord[] = await response.json();

                    set({
                        wordsList: words.map((word: IDBWord) => ({
                            id: word._id,
                            en: word.en,
                            ua: word.ua
                        })),
                        isLoading: false
                    }, false, 'getWords/success');

                } catch (error) {
                    const errorMessage = error instanceof Error
                        ? error.message
                        : 'Unknown error occurred';

                    set({
                        isLoading: false,
                        error: errorMessage
                    }, false, 'getWords/error');

                    throw error;
                }
            },

            addWord: async (wordData: Omit<IWord, 'id'>) => {
                set({isLoading: true, error: null}, false, 'addWord/start');

                try {
                    const response = await fetch(SET_WORD_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(wordData)
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to add IWord: ${response.status}`);
                    }

                    const newWord: IWord = await response.json();

                    set(state => ({
                        wordsList: [...state.wordsList, newWord],
                        isLoading: false
                    }), false, 'addWord/success');

                } catch (error) {
                    const errorMessage = error instanceof Error
                        ? error.message
                        : 'Failed to add IWord';

                    set({
                        isLoading: false,
                        error: errorMessage
                    }, false, 'addWord/error');

                    throw error;
                }
            },

            addWordsBulk: async (wordsList: Omit<IWord, 'id'>[]) => {
                set({isLoading: true, error: null}, false, 'addWordsBulk/start');

                try {
                    const response = await fetch(SET_WORDS_BULK_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(wordsList)
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to add IWord: ${response.status}`);
                    }

                    const newWords: IWord[] = await response.json();


                    set(state => ({
                        wordsList: [...state.wordsList, ...newWords],
                        isLoading: false
                    }), false, 'addWordsBulk/success');

                } catch (error) {
                    const errorMessage = error instanceof Error
                        ? error.message
                        : 'Failed to add IWord';

                    set({
                        isLoading: false,
                        error: errorMessage
                    }, false, 'addWordsBulk/error');

                    throw error;
                }
            },

            updateWord: async (id: string, updates: Partial<IWord>) => {
                set({isLoading: true, error: null}, false, 'updateWord/start');

                try {
                    const response = await fetch(`${UPDATE_WORD_URL}/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updates)
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to update IWord: ${response.status}`);
                    }

                } catch (error) {
                    const errorMessage = error instanceof Error
                        ? error.message
                        : 'Failed to update IWord';

                    set({
                        isLoading: false,
                        error: errorMessage
                    }, false, 'updateWord/error');

                    throw error;
                }
            },

            deleteWord: async (id: string) => {
                set({isLoading: true, error: null}, false, 'deleteWord/start');

                try {
                    const response = await fetch(`${DELETE_WORD_URL}/${id}`, {
                        method: 'DELETE'
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to delete IWord: ${response.status}`);
                    }

                } catch (error) {
                    const errorMessage = error instanceof Error
                        ? error.message
                        : 'Failed to delete IWord';

                    set({
                        isLoading: false,
                        error: errorMessage
                    }, false, 'deleteWord/error');

                    throw error;
                }
            }
        }),
        {
            name: 'words-store'
        }
    )
);

// Хуки-селектори для оптимізації ре-рендерів
export const useWords = () => useWordsStore(state => state.wordsList);
export const useWordsLoading = () => useWordsStore(state => state.isLoading);


// ACTIONS HOOKS
export const useGetWords = () => useWordsStore(state => state.getWords);
export const useAddWord = () => useWordsStore(state => state.addWord);
export const useAddWordsBulk = () => useWordsStore(state => state.addWordsBulk);
export const useUpdateWord = () => useWordsStore(state => state.updateWord);
export const useDeleteWord = () => useWordsStore(state => state.deleteWord);
