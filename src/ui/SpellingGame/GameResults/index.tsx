import React from 'react';
import { ArrowPathIcon, HomeIcon } from '@heroicons/react/24/outline';
import { GameStats } from '@/ui/SpellingGame';
import styles from './GameResults.module.scss';

interface IGameResultsProps {
    gameStats: GameStats;
    restartGame: () => void;
    handleBackToHomePage: () => void;
}

export const GameResults: React.FC<IGameResultsProps> = ({
    gameStats,
    handleBackToHomePage,
    restartGame,
}) => {
    const accuracy =
        gameStats.totalQuestions > 0
            ? (gameStats.correct / gameStats.totalQuestions) * 100
            : 0;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Гра завершена! 🎯</h1>

                <div className={styles.stats}>
                    <div className={`${styles.statCard} ${styles.correct}`}>
                        <p className={styles.statLabel}>Правильних відповідей</p>
                        <p className={styles.statValue}>{gameStats.correct}</p>
                    </div>

                    <div className={`${styles.statCard} ${styles.incorrect}`}>
                        <p className={styles.statLabel}>Неправильних відповідей</p>
                        <p className={styles.statValue}>{gameStats.incorrect}</p>
                    </div>

                    <div className={`${styles.statCard} ${styles.accuracy}`}>
                        <p className={styles.statLabel}>Точність</p>
                        <p className={styles.statValue}>{accuracy.toFixed(1)}%</p>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button
                        onClick={restartGame}
                        className={`${styles.button} ${styles.restart}`}
                    >
                        <ArrowPathIcon />
                        Грати знову
                    </button>

                    <button
                        onClick={handleBackToHomePage}
                        className={`${styles.button} ${styles.home}`}
                    >
                        <HomeIcon />
                        На головну
                    </button>
                </div>
            </div>
        </div>
    );
};
