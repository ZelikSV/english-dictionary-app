import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { IFeedback, QuestionData } from '@/ui/SpellingGame';
import styles from './GameQuestion.module.scss';

interface IGameQuestionProps {
    currentQuestion: QuestionData;
    feedback: IFeedback;
    checkAnswer: () => void;
    userInput: string;
    setUserInput: (value: string) => void;
}

export const GameQuestion: React.FC<IGameQuestionProps> = ({
    currentQuestion,
    feedback,
    checkAnswer,
    userInput,
    setUserInput,
}) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !feedback.show) {
            checkAnswer();
        }
    };

    const feedbackClass = feedback.isCorrect
        ? `${styles.feedback} ${styles.correct}`
        : `${styles.feedback} ${styles.incorrect}`;

    return (
        <div className={styles.container}>
            <div className={styles.translationSection}>
                <p className={styles.label}>Переклад:</p>
                <p className={styles.translation}>{currentQuestion.word.ua}</p>
            </div>

            <div className={styles.questionSection}>
                <p className={styles.label}>Введіть англійське слово:</p>
                <p className={styles.maskedWord}>{currentQuestion.maskedWord}</p>
                <p className={styles.hint}>
                    Підказка: {currentQuestion.word.en.length} літер
                </p>
            </div>

            <div className={styles.inputSection}>
                <input
                    type="text"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Введіть слово..."
                    disabled={feedback.show}
                    className={styles.input}
                    autoFocus
                />

                <button
                    onClick={checkAnswer}
                    disabled={!userInput.trim() || feedback.show}
                    className={styles.submitButton}
                >
                    <CheckIcon />
                    Перевірити
                </button>
            </div>
            {feedback.show && (
                <div className={feedbackClass}>
                    <div className={styles.feedbackContent}>
                        {feedback.isCorrect ? <CheckIcon /> : <XMarkIcon />}
                        <span className={styles.message}>{feedback.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
};
