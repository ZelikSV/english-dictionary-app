import {IWordGroup, UpdateWordsGroupPayload} from '@/types';
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

export const getWordsGroupByUserId = async (search: string = ''): Promise<IWordGroup[]> => {
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
    ${search ? sql`AND LOWER(wg.name) LIKE ${`%${search.toLowerCase()}%`}` : sql``}
    GROUP BY wg.id, wg.name, wg.user_id
    ORDER BY wg.name
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

export const updateWordsGroup = async (payload: UpdateWordsGroupPayload) => {
    try {
        await sql.begin(async trx => {
            const {operations, name, id} = payload;
            const currentGroupResult = await trx`
                SELECT words FROM words_groups WHERE id = ${id}
            `;
            let currentWordIds = (currentGroupResult[0]?.words as string[]) || [];

            if (operations.create.length > 0) {
                const newWordIds = await Promise.all(
                    operations.create.map(async word => {
                        const result = await trx`
                            INSERT INTO words (en, ua)
                            VALUES (${word.en}, ${word.ua})
                            RETURNING id
                        `;

                        return result[0].id as string;
                    })
                );
                currentWordIds = [...currentWordIds, ...newWordIds];
            }

            if (operations.update.length > 0) {
                await Promise.all(
                    operations.update.map(word =>
                        trx`
                            UPDATE words 
                            SET en = ${word.en}, ua = ${word.ua}
                            WHERE id = ${word.id}
                        `
                    )
                );
            }

            if (operations.removeFromGroup.length > 0) {
                currentWordIds = currentWordIds.filter(wordId =>
                    !operations.removeFromGroup.includes(wordId)
                );

                const unusedWordsResult = await trx`
                    SELECT w.id 
                    FROM words w
                    WHERE w.id = ANY(${operations.removeFromGroup})
                    AND NOT EXISTS (
                        SELECT 1 FROM words_groups wg 
                        WHERE wg.id != ${id} 
                        AND w.id = ANY(wg.words)
                    )
                `;

                const unusedWordIds = unusedWordsResult.map(row => row.id as string);

                if (unusedWordIds.length > 0) {
                    await trx`
                        DELETE FROM words 
                        WHERE id = ANY(${unusedWordIds})
                    `;
                }
            }

            await trx`
                UPDATE words_groups 
                SET 
                    name = ${name},
                    words = ${currentWordIds},
                    updated_at = NOW()
                WHERE id = ${id}
            `;
        });
    } catch (error) {
        log.error('updateWordsGroup', error);
        throw error;
    }
};
