import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { IAnswerFeedback } from '@/ui/QuizGame';
import styles from './Feedback.module.scss';

interface IFeedbackProps {
  feedback: IAnswerFeedback;
}

export const Feedback: React.FC<IFeedbackProps> = ({ feedback }) => {
  const containerClass = feedback.isCorrect
    ? `${styles.container} ${styles.correct}`
    : `${styles.container} ${styles.incorrect}`;

  return (
    <div className={containerClass}>
      <div className={styles.header}>
        {feedback.isCorrect ? <CheckIcon /> : <XMarkIcon />}
        <span className={styles.text}>
          {feedback.isCorrect ? 'Правильно!' : 'Неправильно'}
        </span>
      </div>
      {!feedback.isCorrect && (
        <p className={styles.message}>
          {feedback.selectedAnswer === 'Час вийшов'
            ? `Час вийшов! Правильна відповідь: ${feedback.correctAnswer}`
            : `Правильна відповідь: ${feedback.correctAnswer}`}
        </p>
      )}
    </div>
  );
};
