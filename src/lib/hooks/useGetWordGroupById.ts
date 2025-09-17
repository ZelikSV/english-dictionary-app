import {useEffect, useState} from 'react';
import {WORDS_GROUPS_API_URL} from '@/lib/api';
import {IWord, IWordGroup} from '@/types';
import Cookies from 'js-cookie';
import {log} from '@/lib/logger';

export const useGetWordsByGroupId = () => {
    const groupId = Cookies.get('group');
    const [words, setWords] = useState<IWord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!groupId) {
            return;
        }

        const fetchGroup = async () => {
            setLoading(true);

            try {
                const response = await fetch(`${WORDS_GROUPS_API_URL}/${groupId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch group');
                }

                const data = await response.json();

                const wordsList = data.group.flatMap((el: IWordGroup) => el.words);

                setWords( wordsList);
            } catch (err) {
                log.error(`Failed GET Words Groups by id: ${groupId}`,err);
            } finally {
                setLoading(false);
            }
        };

        fetchGroup();
    }, [groupId, setWords, setLoading]);

    return {
        loading,
        wordsByGroups: words
    };
};
