import { ArrowPathIcon, HomeIcon } from '@heroicons/react/24/outline';
import { IQuizStats } from '@/ui/QuizGame';
import React from 'react';
import { getGradeInfo } from '@/lib/quizeHelpers';
import styles from './QuizResult.module.scss';

interface IQuizResultProps {
    quizStats: IQuizStats;
    restartQuiz: () => void;
    handleBackToHomePage: () => void;
}

export const QuizResult: React.FC<IQuizResultProps> = ({
    quizStats,
    restartQuiz,
    handleBackToHomePage,
}) => {
    const accuracy =
        quizStats.totalQuestions > 0
            ? (quizStats.correct / quizStats.totalQuestions) * 100
            : 0;
    const { gradeText, gradeColor } = getGradeInfo(accuracy);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Тестування завершено!</h1>
                <p className={`${styles.grade} ${styles[gradeColor]}`}>{gradeText}</p>

                <div className={styles.stats}>
                    <div className={`${styles.statCard} ${styles.correct}`}>
                        <p className={styles.statLabel}>Правильних відповідей</p>
                        <p className={styles.statValue}>{quizStats.correct}</p>
                    </div>

                    <div className={`${styles.statCard} ${styles.incorrect}`}>
                        <p className={styles.statLabel}>Неправильних відповідей</p>
                        <p className={styles.statValue}>{quizStats.incorrect}</p>
                    </div>

                    <div className={`${styles.statCard} ${styles.accuracy}`}>
                        <p className={styles.statLabel}>Результат</p>
                        <p className={styles.statValue}>{accuracy.toFixed(1)}%</p>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button
                        onClick={restartQuiz}
                        className={`${styles.button} ${styles.restart}`}
                    >
                        <ArrowPathIcon />
                        Пройти знову
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
