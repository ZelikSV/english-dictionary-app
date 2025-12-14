'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { IWordGroup } from '@/types';
import { WORDS_GROUPS_API_URL } from '@/lib/api';
import { log } from '@/lib/logger';
import Spinner from '@/ui/Spinner';
import { useSelectGroup } from '@/lib/hooks/useSelectGroup';
import styles from './WordGroupCard.module.scss';

export const WordGroupCard = ({ group }: { group: IWordGroup }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { isSelectingGroup, handleSelectGroup, isSelected } = useSelectGroup(group.id);
    const wordsCount = group.words.length;

    const handleDeleteGroup = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${WORDS_GROUPS_API_URL}/${group.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                log.error('Failed to delete group');
            }

            router.refresh();
        } catch (error) {
            log.error('Error deleting group:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`${styles.card} ${isSelected ? styles.selected : ''}`}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <div
                        className={`${styles.indicator} ${isSelected ? styles.selected : styles.default}`}
                    ></div>
                    <h3 className={styles.title}>{group.name}</h3>
                    {isSelected && (
                        <div className={styles.selectedBadge}>
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>Обрано</span>
                        </div>
                    )}
                </div>
                <div className={styles.actions}>
                    <Link
                        href={`/groups/${group.id}/edit`}
                        className={`${styles.actionButton} ${styles.edit}`}
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                    </Link>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <button
                            className={`${styles.actionButton} ${styles.delete}`}
                            onClick={handleDeleteGroup}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <div className={styles.wordsCount}>
                <span className={styles.count}>{wordsCount}</span>
                <span className={styles.label}>слів</span>
            </div>

            <div className={styles.content}>
                <div className={styles.wordsList}>
                    {group.words.slice(0, 6).map((word, index) => (
                        <span key={index} className={styles.wordTag}>
                            {word.en}
                        </span>
                    ))}
                    {wordsCount > 6 && (
                        <span className={styles.moreTag}>+{wordsCount - 6} ще</span>
                    )}
                </div>
            </div>

            <button
                className={`${styles.selectButton} ${isSelected ? styles.selected : styles.default}`}
                disabled={isSelectingGroup || isSelected}
                onClick={handleSelectGroup}
            >
                {isSelectingGroup ? (
                    <Spinner />
                ) : isSelected ? (
                    <>
                        <svg fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>Група обрана</span>
                    </>
                ) : (
                    <>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                        <span>Вибрати групу</span>
                    </>
                )}
            </button>
        </div>
    );
};
