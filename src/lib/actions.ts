'use server';

import {IDBWordGroup, IWord, IWordGroup, UpdateWordsGroupPayload} from '@/types';
import {getCurrentUser} from '@/lib/session';
import {log} from '@/lib/logger';
import {sql} from './db';

export const createWordsGroup = async (wordsGroup: IWordGroup) => {
    try {
        const user = await getCurrentUser();

        await sql`
            INSERT INTO words_groups (id, name, user_id, words)
            VALUES (
                ${wordsGroup.id}, 
                ${wordsGroup.name}, 
                ${user?.id ?? wordsGroup.userId}, 
                ${JSON.stringify(wordsGroup.words)}
            )
        `;

        log.info(`✅ Words group "${wordsGroup.name}" created with ${wordsGroup.words.length} words`);
    } catch (error) {
        log.error('createWordsGroup', error);
        throw error;
    }
};

export const getWordsGroupByUserId = async (search: string = ''): Promise<IWordGroup[]> => {
    try {
        const user = await getCurrentUser();

        const groups = await sql<IDBWordGroup[]>`
            SELECT 
                wg.id, 
                wg.name, 
                wg.user_id,
                wg.words,
                wg.created_at,
                wg.updated_at
            FROM words_groups wg
            WHERE wg.user_id = ${user?.id ?? 0}
            ${search ? sql`AND LOWER(wg.name) LIKE ${`%${search.toLowerCase()}%`}` : sql``}
            ORDER BY wg.created_at
        `;

        if (groups.length === 0) {
            return [];
        }

        return groups.map(group => ({
            ...group,
            words: JSON.parse(group.words ?? '[]')
        }));
    } catch (error) {
        log.error('getWordsGroupByUserId', error);
        throw error;
    }
};

export const getWordsGroupById = async (id: string): Promise<IWordGroup | null> => {
    try {
        const user = await getCurrentUser();

        const groups = await sql<IDBWordGroup[]>`
            SELECT 
                wg.id, 
                wg.name, 
                wg.user_id,
                wg.words,
                wg.created_at,
                wg.updated_at
            FROM words_groups wg
            WHERE wg.user_id = ${user?.id ?? 0} AND wg.id = ${id}
        `;

        if (groups.length === 0) {
            return null;
        }

        const group = groups[0];

        let parsedWords: IWord[];

        try {
            parsedWords = JSON.parse(group.words ?? '[]');
        } catch (parseError) {
            log.warn(`Failed to parse words for group ${group.id}:`, parseError);

            parsedWords = [];
        }

        return {
            ...group,
            words: parsedWords
        };
    } catch (error) {
        log.error('getWordsGroupById', error);
        throw error;
    }
};

export const deleteWordsGroup = async (groupId: string) => {
    try {
        await sql`DELETE FROM words_groups WHERE id = ${groupId}`;
    } catch (error) {
        log.error('deleteWordsGroup', error);
        throw error;
    }
};

export const updateWordsGroup = async (payload: UpdateWordsGroupPayload) => {
    try {
        await sql.begin(async trx => {
            const {words, name, id} = payload;

            await trx`
                UPDATE words_groups
                SET
                    name = ${name},
                    words = ${JSON.stringify(words)},
                    updated_at = NOW()
                WHERE id = ${id}
            `;
        });
    } catch (error) {
        log.error('updateWordsGroup', error);
        throw error;
    }
};
