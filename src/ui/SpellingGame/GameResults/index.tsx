import React from 'react';
import {ArrowPathIcon, HomeIcon} from '@heroicons/react/24/outline';
import {GameStats} from '@/ui/SpellingGame';

interface IGameResultsProps {
    gameStats: GameStats;
    restartGame: () => void;
    handleBackToHomePage: () => void;
}

export const GameResults:React.FC<IGameResultsProps> = ({gameStats, handleBackToHomePage, restartGame}) => {
    const accuracy = gameStats.totalQuestions > 0 ? (gameStats.correct / gameStats.totalQuestions) * 100 : 0;

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
            <div className='bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center'>
                <h1 className='text-3xl font-bold text-gray-800 mb-6'>Гра завершена! 🎯</h1>

                <div className='space-y-4 mb-8'>
                    <div className='bg-green-50 p-4 rounded-lg'>
                        <p className='text-green-800 font-semibold'>Правильних відповідей</p>
                        <p className='text-3xl font-bold text-green-600'>{gameStats.correct}</p>
                    </div>

                    <div className='bg-red-50 p-4 rounded-lg'>
                        <p className='text-red-800 font-semibold'>Неправильних відповідей</p>
                        <p className='text-3xl font-bold text-red-600'>{gameStats.incorrect}</p>
                    </div>

                    <div className='bg-blue-50 p-4 rounded-lg'>
                        <p className='text-blue-800 font-semibold'>Точність</p>
                        <p className='text-3xl font-bold text-blue-600'>{accuracy.toFixed(1)}%</p>
                    </div>
                </div>

                <div className='flex gap-4'>
                    <button
                        onClick={restartGame}
                        className='flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center'
                    >
                        <ArrowPathIcon className='w-5 h-5 mr-2' />
                        Грати знову
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
