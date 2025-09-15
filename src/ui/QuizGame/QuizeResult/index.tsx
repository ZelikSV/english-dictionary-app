import {ArrowPathIcon, HomeIcon} from '@heroicons/react/24/outline';
import {IQuizStats} from '@/ui/QuizGame';
import React from 'react';
import {getGradeInfo} from '@/lib/quizeHelpers';

interface IQuizResultProps {
    quizStats: IQuizStats;
    restartQuiz: () => void;
    handleBackToHomePage: () => void;
}

export const QuizResult: React.FC<IQuizResultProps> = ({quizStats, restartQuiz, handleBackToHomePage}) => {
    const accuracy = quizStats.totalQuestions > 0 ? (quizStats.correct / quizStats.totalQuestions) * 100 : 0;
    const {gradeText, gradeColor} = getGradeInfo(accuracy);

    return (
        <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4'>
            <div className='bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center'>
                <h1 className='text-3xl font-bold text-gray-800 mb-2'>Тестування завершено!</h1>
                <p className={`text-xl font-semibold mb-6 ${gradeColor}`}>{gradeText}</p>

                <div className='space-y-4 mb-8'>
                    <div className='bg-green-50 p-4 rounded-lg'>
                        <p className='text-green-800 font-semibold'>Правильних відповідей</p>
                        <p className='text-3xl font-bold text-green-600'>{quizStats.correct}</p>
                    </div>

                    <div className='bg-red-50 p-4 rounded-lg'>
                        <p className='text-red-800 font-semibold'>Неправильних відповідей</p>
                        <p className='text-3xl font-bold text-red-600'>{quizStats.incorrect}</p>
                    </div>

                    <div className='bg-blue-50 p-4 rounded-lg'>
                        <p className='text-blue-800 font-semibold'>Результат</p>
                        <p className='text-3xl font-bold text-blue-600'>{accuracy.toFixed(1)}%</p>
                    </div>
                </div>

                <div className='flex gap-4'>
                    <button
                        onClick={restartQuiz}
                        className='flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center'
                    >
                        <ArrowPathIcon className='w-5 h-5 mr-2' />
                        Пройти знову
                    </button>

                    <button
                        onClick={handleBackToHomePage}
                        className='flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center'
                    >
                        <HomeIcon className='w-5 h-5 mr-2' />
                        На головну
                    </button>
                </div>
            </div>
        </div>
    );
};
