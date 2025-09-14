import {IWordGroup} from '@/types';
import {sql} from './db';
import {getCurrentUser} from '@/lib/session';
import {log} from '@/lib/logger';

export const createWordsGroup = async (wordsGroup: IWordGroup) => {
    try {
        await sql.begin(async trx => {
            const insertedWords = await Promise.all(
                wordsGroup.words.map(async word => {
                    const result = await trx`
                        INSERT INTO words (en, ua)
                        VALUES (${word.en}, ${word.ua})
                        RETURNING id
                    `;

                    return result[0].id;
                })
            );

            await trx`
                INSERT INTO words_groups (id, name, user_id, words)
                VALUES (${wordsGroup.id}, ${wordsGroup.name}, ${wordsGroup.userId}, ${insertedWords})
            `;
        });
    } catch (error) {
        log.error('createWordsGroup', error);
        throw error;
    }
};

export const getWordsGroupByUserId = async (): Promise<IWordGroup[]> => {
    try {
        const user = await getCurrentUser();

        const groups = await sql<IWordGroup[]>`
    SELECT 
        wg.id, 
        wg.name, 
        wg.user_id,
        COALESCE(
            JSON_AGG(
                JSON_BUILD_OBJECT('id', w.id, 'en', w.en, 'ua', w.ua)
            ) FILTER (WHERE w.id IS NOT NULL), 
            '[]'::json
        ) as words
    FROM words_groups wg
    LEFT JOIN words w ON w.id = ANY(wg.words)
    WHERE wg.user_id = ${user?.id ?? 0}
    GROUP BY wg.id, wg.name, wg.user_id
`;

        if (groups.length === 0) {
            return [];
        }

        return groups;
    } catch (error) {
        log.error('getWordsGroupByUserId', error);
        throw error;
    }
};

export const getWordsGroupById = async (id: string): Promise<IWordGroup[]> => {
    try {
        const user = await getCurrentUser();

        const groups = await sql<IWordGroup[]>`
    SELECT 
        wg.id, 
        wg.name, 
        wg.user_id,
        COALESCE(
            JSON_AGG(
                JSON_BUILD_OBJECT('id', w.id, 'en', w.en, 'ua', w.ua)
            ) FILTER (WHERE w.id IS NOT NULL), 
            '[]'::json
        ) as words
    FROM words_groups wg
    LEFT JOIN words w ON w.id = ANY(wg.words)
    WHERE wg.user_id = ${user?.id ?? 0} AND wg.id = ${id}
    GROUP BY wg.id, wg.name, wg.user_id
`;

        if (groups.length === 0) {
            return [];
        }

        return groups;
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
