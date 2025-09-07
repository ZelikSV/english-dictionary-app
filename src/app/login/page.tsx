import React from 'react';
import Link from 'next/link';

import LoginForm from '@/ui/LoginForm';

const LoginPage = async () => {
    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center p-6'>
            <div className='w-full max-w-md'>
                <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50'>
                    <div className='text-center mb-8'>
                        <div className='w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4'>
                            <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                            </svg>
                        </div>
                        <h1 className='text-2xl font-bold text-gray-800 mb-2'>Вхід</h1>
                        <p className='text-gray-600'>Увійдіть до свого облікового запису</p>
                    </div>
                    <LoginForm />
                    <div className='text-center mt-6'>
                        <p className='text-gray-600'>
                            Немає облікового запису?{' '}
                            <Link href='/register' className='text-green-600 hover:text-green-700 font-medium'>
                                Зареєструватися
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default LoginPage;
