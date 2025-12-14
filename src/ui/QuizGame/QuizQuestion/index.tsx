import React from 'react';
import { Feedback } from '@/ui/QuizGame/Feedback';
import { IAnswerFeedback, IQuizQuestion } from '@/ui/QuizGame';
import { Lang } from '@/lib/constants';
import styles from './QuizQuestion.module.scss';

interface QuizQuestionProps {
    currentQuestion: IQuizQuestion;
    feedback: IAnswerFeedback;
    selectedOption: string;
    handleAnswerSelect: (option: string) => () => void;
}

interface LanguageBadgeProps {
    language: string;
}

const LanguageBadge: React.FC<LanguageBadgeProps> = ({ language }) => {
    const isEnglish = language === Lang.EN;
    const badgeClass = isEnglish ? styles.english : styles.ukrainian;
    const badgeText = isEnglish ? '🇬🇧 English' : '🇺🇦 Українська';

    return <span className={`${styles.badge} ${badgeClass}`}>{badgeText}</span>;
};

const getOptionButtonStyles = (
    option: string,
    selectedOption: string,
    correctAnswer: string,
    showFeedback: boolean,
): string => {
    if (showFeedback) {
        if (option === correctAnswer) {
            return `${styles.optionButton} ${styles.correct}`;
        }

        if (option === selectedOption && option !== correctAnswer) {
            return `${styles.optionButton} ${styles.incorrect}`;
        }

        return `${styles.optionButton} ${styles.disabled}`;
    }

    if (selectedOption === option) {
        return `${styles.optionButton} ${styles.selected}`;
    }

    return `${styles.optionButton} ${styles.default}`;
};

const getQuestionPrompt = (language: string): string => {
    return language === Lang.EN
        ? 'Оберіть переклад слова:'
        : 'Оберіть англійський переклад:';
};

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
    currentQuestion,
    feedback,
    selectedOption,
    handleAnswerSelect,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.badgeWrapper}>
                <LanguageBadge language={currentQuestion.questionLanguage} />
            </div>

            <div className={styles.questionSection}>
                <p className={styles.prompt}>
                    {getQuestionPrompt(currentQuestion.questionLanguage)}
                </p>
                <p className={styles.questionWord}>{currentQuestion.questionWord}</p>
            </div>

            <div className={styles.optionsGrid}>
                {currentQuestion.options.map((option, index) => {
                    const buttonStyles = getOptionButtonStyles(
                        option,
                        selectedOption,
                        currentQuestion.correctAnswer,
                        feedback.show,
                    );

                    return (
                        <button
                            key={index}
                            onClick={handleAnswerSelect(option)}
                            disabled={feedback.show}
                            className={buttonStyles}
                        >
                            <span className={styles.optionLabel}>
                                {String.fromCharCode(65 + index)}
                            </span>
                            {option}
                        </button>
                    );
                })}
            </div>

            {feedback.show && <Feedback feedback={feedback} />}
        </div>
    );
};
