import React from 'react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

import styles from './styles.module.scss';

interface RoundCompleteProps {
    onNextRound: () => void;
    onPrevRound: () => void;
}

export const GameCardActions: React.FC<RoundCompleteProps> = ({
    onNextRound,
    onPrevRound,
}) => (
    <div className={styles.container}>
        <div className={styles.card}>
            <div className={styles.actions}>
                <button
                    onClick={onPrevRound}
                    className={`${styles.button} ${styles.nextRound}`}
                >
                    <ArrowLeftIcon />
                    Попереднє слово
                </button>

                <button
                    onClick={onNextRound}
                    className={`${styles.button} ${styles.shuffle}`}
                >
                    <ArrowRightIcon />
                    Наступне слово
                </button>
            </div>
        </div>
    </div>
);
