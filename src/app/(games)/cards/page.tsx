import { Suspense } from 'react';
import clsx from 'clsx';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import CardsGame from '@/ui/CardsGame';
import { CardPreLoader } from '@/ui/CardsGame/components/CardPreLoader';

import styles from './styles.module.scss';

const Cards = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <Link href="/" className={styles.backButton}>
                        <ArrowLeftIcon />
                        На головну
                    </Link>

                    <div className={styles.headerCenter}>
                        <h1>Навчальні картки</h1>
                        <p className={clsx(styles.languageMode, styles.english)}>
                            🇬🇧 English → Українська
                        </p>
                    </div>
                </div>

                <Suspense fallback={<CardPreLoader />}>
                    <CardsGame />
                </Suspense>
            </div>
        </div>
    );
};

export default Cards;
