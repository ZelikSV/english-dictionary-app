import {CheckIcon, XMarkIcon} from '@heroicons/react/24/outline';
import React from 'react';
import {IAnswerFeedback} from '@/ui/QuizGame';

interface IFeedbackProps {
    feedback: IAnswerFeedback
}

export const Feedback: React.FC<IFeedbackProps> = ({feedback}) => {
    return (
        <div className={`p-4 rounded-lg text-center ${
            feedback.isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
            <div className='flex items-center justify-center mb-2'>
                {feedback.isCorrect ? (
                    <CheckIcon className='w-6 h-6 mr-2' />
                ) : (
                    <XMarkIcon className='w-6 h-6 mr-2' />
                )}
                <span className='font-semibold'>
                    {feedback.isCorrect ? 'Правильно!' : 'Неправильно'}
                  </span>
            </div>
            {!feedback.isCorrect && (
                <p className='text-sm'>
                    {feedback.selectedAnswer === 'Час вийшов'
                        ? `Час вийшов! Правильна відповідь: ${feedback.correctAnswer}`
                        : `Правильна відповідь: ${feedback.correctAnswer}`
                    }
                </p>
            )}
        </div>
    );
};
