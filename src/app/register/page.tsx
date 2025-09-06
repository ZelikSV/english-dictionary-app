import React from 'react';
import Link from 'next/link';

import RegisterForm from '@/ui/RegisterForm';

const RegisterPage = () => {
    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center p-6'>
            <div className='w-full max-w-md'>
                <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50'>
                    <div className='text-center mb-8'>
                        <div className='w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4'>
                            <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
                            </svg>
                        </div>
                        <h1 className='text-2xl font-bold text-gray-800 mb-2'>Реєстрація</h1>
                        <p className='text-gray-600'>Створіть новий обліковий запис</p>
                    </div>
                    <RegisterForm />
                    <div className='text-center mt-6'>
                        <p className='text-gray-600'>
                            Вже є обліковий запис?{' '}
                            <Link href='/login' className='text-blue-600 hover:text-blue-700 font-medium'>
                                Увійти
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
