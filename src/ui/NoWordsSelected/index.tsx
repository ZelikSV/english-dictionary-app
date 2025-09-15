import React from 'react';
import Link from 'next/link';

const EmptyWordsPage = () => {
    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6'>
            <div className='max-w-md w-full'>
                <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50 text-center'>
                    <div className='w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-6'>
                        <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' />
                        </svg>
                    </div>

                    <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                        Група слів не обрана
                    </h2>

                    <p className='text-gray-600 mb-8 leading-relaxed'>
                        Для початку гри потрібно спочатку обрати групу слів на головній сторінці
                    </p>

                    <Link
                        href='/'
                        className='inline-flex items-center space-x-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-3 rounded-xl font-medium hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl'
                    >
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                        </svg>
                        <span>Повернутись до груп</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EmptyWordsPage;
