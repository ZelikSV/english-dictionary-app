import React from 'react';
import { ArrowPathIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import styles from './RoundComplete.module.scss';

interface RoundCompleteProps {
    onNextRound: () => void;
    onShuffle: () => void;
}

export const RoundComplete: React.FC<RoundCompleteProps> = ({
    onNextRound,
    onShuffle,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h3 className={styles.title}>🎉 Раунд завершено!</h3>
                <p className={styles.message}>
                    Всі картки відкриті. Готові до наступного раунду?
                </p>

                <div className={styles.actions}>
                    <button
                        onClick={onNextRound}
                        className={`${styles.button} ${styles.nextRound}`}
                    >
                        <ArrowPathIcon />
                        Новий раунд
                    </button>

                    <button
                        onClick={onShuffle}
                        className={`${styles.button} ${styles.shuffle}`}
                    >
                        <ArrowsUpDownIcon />
                        Перемішати
                    </button>
                </div>
            </div>
        </div>
    );
};
