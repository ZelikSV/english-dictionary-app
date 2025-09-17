import {CheckIcon, XMarkIcon} from '@heroicons/react/24/outline';
import React from 'react';
import {IFeedback, QuestionData} from '@/ui/SpellingGame';

interface IGameQuestionProps {
    currentQuestion: QuestionData;
    feedback: IFeedback;
    checkAnswer: () => void;
    userInput: string;
    setUserInput: (value: string) => void;
}

export const GameQuestion:React.FC<IGameQuestionProps> = ({currentQuestion, feedback, checkAnswer, userInput, setUserInput}) => {

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !feedback.show) {
            checkAnswer();
        }
    };

    return (
                <div className='bg-white rounded-lg shadow-lg p-8'>
                    <div className='text-center mb-8'>
                        <p className='text-gray-600 mb-2'>Переклад:</p>
                        <p className='text-3xl font-bold text-gray-800'>{currentQuestion.word.ua}</p>
                    </div>

                    <div className='text-center mb-8'>
                        <p className='text-gray-600 mb-2'>Введіть англійське слово:</p>
                        <p className='text-4xl font-mono font-bold text-blue-600 tracking-wider mb-4'>
                            {currentQuestion.maskedWord}
                        </p>
                        <p className='text-sm text-gray-500'>
                            Підказка: {currentQuestion.word.en.length} літер
                        </p>
                    </div>

                    <div className='space-y-4'>
                        <input
                            type='text'
                            value={userInput}
                            onChange={e => setUserInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder='Введіть слово...'
                            disabled={feedback.show}
                            className='w-full px-4 py-3 text-xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-gray-800'
                            autoFocus
                        />

                        <button
                            onClick={checkAnswer}
                            disabled={!userInput.trim() || feedback.show}
                            className='w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center'
                        >
                            <CheckIcon className='w-5 h-5 mr-2' />
                            Перевірити
                        </button>
                    </div>
                    {feedback.show && (
                        <div className={`mt-6 p-4 rounded-lg text-center ${
                            feedback.isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                        }`}>
                            <div className='flex items-center justify-center mb-2'>
                                {feedback.isCorrect ? (
                                    <CheckIcon className='w-6 h-6 mr-2' />
                                ) : (
                                    <XMarkIcon className='w-6 h-6 mr-2' />
                                )}
                                <span className='font-semibold'>{feedback.message}</span>
                            </div>
                        </div>
                    )}
                </div>
    );
};
