'use client';
import React, {useState} from 'react';
import Link from 'next/link';
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline';

interface LoginFormData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const isLoading = false;
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<LoginFormData>>({});

    const validateForm = () => {
        const newErrors: Partial<LoginFormData> = {};

        if (!formData.email) {
            newErrors.email = 'Email обов\'язковий';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Невірний формат email';
        }

        if (!formData.password) {
            newErrors.password = 'Пароль обов\'язковий';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль має бути мінімум 6 символів';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
        }
    };

    const handleChange = (field: keyof LoginFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, [field]: e.target.value}));
        if (errors[field]) {
            setErrors(prev => ({...prev, [field]: undefined}));
        }
    };

    return (
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

                    <div className='space-y-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Email
                            </label>
                            <input
                                type='email'
                                value={formData.email}
                                onChange={handleChange('email')}
                                className='w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-black transition-all'
                                placeholder='your@email.com'
                            />
                            {errors.email && (
                                <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Пароль
                            </label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange('password')}
                                    className='w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-black transition-all pr-12'
                                    placeholder='Введіть пароль'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className='w-5 h-5' />
                                    ) : (
                                        <EyeIcon className='w-5 h-5' />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
                            )}
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className='w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 rounded-xl font-medium hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? 'Вхід...' : 'Увійти'}
                        </button>
                    </div>

                    <div className='text-center mt-6'>
                        <p className='text-gray-600'>
                            Немає облікового запису?{' '}
                            <Link href='/login' className='text-green-600 hover:text-green-700 font-medium'>
                                Зареєструватися
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
    );
};

export default LoginForm;
