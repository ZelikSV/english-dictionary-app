import {Feedback} from '@/ui/QuizGame/Feedback';
import {IAnswerFeedback, IQuizQuestion} from '@/ui/QuizGame';
import React from 'react';

interface IQuizQuestionProps {
    currentQuestion: IQuizQuestion;
    feedback: IAnswerFeedback;
    selectedOption: string;
    handleAnswerSelect: (option: string) => () => void;
}

export const QuizQuestion: React.FC<IQuizQuestionProps> = ({currentQuestion, feedback, selectedOption, handleAnswerSelect}) => {
    return (
                <div className='bg-white rounded-lg shadow-lg p-8'>
                    <div className='text-center mb-4'>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentQuestion.questionLanguage === 'en'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
              }`}>
                {currentQuestion.questionLanguage === 'en' ? '🇬🇧 English' : '🇺🇦 Українська'}
              </span>
                    </div>

                    <div className='text-center mb-8'>
                        <p className='text-gray-600 mb-2'>
                            {currentQuestion.questionLanguage === 'en'
                                ? 'Оберіть переклад слова:'
                                : 'Оберіть англійський переклад:'}
                        </p>
                        <p className='text-4xl font-bold text-gray-800 mb-4'>
                            {currentQuestion.questionWord}
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                        {currentQuestion.options.map((option, index) => {
                            let buttonClass = 'w-full p-4 text-left border-2 rounded-lg transition-all duration-200 font-medium';

                            if (feedback.show) {
                                if (option === currentQuestion.correctAnswer) {
                                    buttonClass += ' bg-green-100 border-green-500 text-green-800';
                                } else if (option === selectedOption && option !== currentQuestion.correctAnswer) {
                                    buttonClass += ' bg-red-100 border-red-500 text-red-800';
                                } else {
                                    buttonClass += ' bg-gray-50 border-gray-300 text-gray-500';
                                }
                            } else {
                                if (selectedOption === option) {
                                    buttonClass += ' bg-blue-100 border-blue-500 text-blue-800';
                                } else {
                                    buttonClass += ' bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400';
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerSelect(option)}
                                    disabled={feedback.show}
                                    className={buttonClass}
                                >
                                <span className='text-sm text-gray-500 block mb-1'>
                                  {String.fromCharCode(65 + index)}
                                </span>
                                    {option}
                                </button>
                            );
                        })}
                    </div>

                    {feedback.show && (<Feedback feedback={feedback} />)}
                </div>
    );
};
