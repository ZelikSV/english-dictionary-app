import Link from 'next/link';
import { Suspense } from 'react';

import { WordGroupCard } from '@/ui/WordGroupCard';
import { SearchGroups } from '@/ui/SearchGroups';
import ActivityCards from '@/ui/ActivityCards';
import { getWordsGroupByUserId } from '@/lib/actions';
import { WordGroupCardsGridSkeleton } from '@/ui/WordGroupCard/WordGroupCardSkeleton';
import styles from './page.module.scss';

const Home = async ({ searchParams }: { searchParams: { search?: string } }) => {
    const { search } = await searchParams;
    const wordGroups = await getWordsGroupByUserId(search);

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <div className={styles.header}>
                    <SearchGroups />
                    <Link href="/groups/create" className={styles.createButton}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        <span>Створити групу</span>
                    </Link>
                </div>

                <Suspense fallback={<WordGroupCardsGridSkeleton />}>
                    <div className={styles.cardsGrid}>
                        {wordGroups.map(group => (
                            <WordGroupCard key={group.id} group={group} />
                        ))}
                    </div>
                </Suspense>
                <ActivityCards />
            </div>
        </div>
    );
};

export default Home;
