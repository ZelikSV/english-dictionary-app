import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

import {IWordGroup} from '@/types';
import {GET_WORDS_GROUPS_URL, SET_WORDS_GROUPS_URL} from '@/lib/api';

interface WordGroupsState {
    wordsGroups: IWordGroup[]
    selectedGroup: IWordGroup | null
    isLoading: boolean
    error: string | null

    getWordsGroups: () => Promise<void>
    addNewGroup: (group: Partial<IWordGroup>) => Promise<void>
    clearError: () => void
    selectGroup: (id: string) => void
}

export const useWordsGroupStore = create<WordGroupsState>()(
    devtools(
        (set, getState) => ({
            wordsGroups: [],
            selectedGroup: null,
            isLoading: false,
            error: null,

            getWordsGroups: async () => {
                set({isLoading: true, error: null}, false, 'getWordsGroups/start');

                try {
                    const response = await fetch(GET_WORDS_GROUPS_URL);

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const wordsGroups: IWordGroup[] = await response.json();

                    set({
                        wordsGroups,
                        isLoading: false
                    }, false, 'getWordsGroups/success');

                } catch (error) {
                    const errorMessage = error instanceof Error
                        ? error.message
                        : 'Unknown error occurred';

                    set({
                        isLoading: false,
                        error: errorMessage
                    }, false, 'getWordsGroups/error');

                    throw error;
                }
            },

            selectGroup: (id: string) => {
                const group = getState().wordsGroups.find(el => el.id === id) ?? null;

                set({selectedGroup: group}, false, 'selectGroup/success');
            },

            addNewGroup: async (groupData: IWordGroup) => {
                set({isLoading: true, error: null}, false, 'addNewGroup/start');

                try {
                    const res = await fetch(SET_WORDS_GROUPS_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(groupData)
                    });
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }

                    set({isLoading: false, error: null}, false, 'addNewGroup/success');
                } catch (error) {
                    const errorMessage = error instanceof Error
                        ? error.message
                        : 'Unknown error occurred';

                    set({
                        isLoading: false,
                        error: errorMessage
                    }, false, 'addNewGroup/error');

                    throw error;
                }
            }
        }),
        {
            name: 'words-groups-store'
        }
    )
);

export const useWordsGroups = () => useWordsGroupStore(state => state.wordsGroups);
export const useSelectedGroup = () => useWordsGroupStore(state => state.selectedGroup);


// ACTIONS HOOKS
export const useSelectGroup = () => useWordsGroupStore(state => state.selectGroup);
export const useGetWordsGroups = () => useWordsGroupStore(state => state.getWordsGroups);
export const useAddNewGroup = () => useWordsGroupStore(state => state.addNewGroup);
