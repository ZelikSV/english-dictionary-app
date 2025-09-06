'use client';
import React, {useState} from 'react';
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}

const RegisterForm = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
    const isLoading = false;

    const validateForm = () => {
        const newErrors: Partial<RegisterFormData> = {};

        if (!formData.name) {
            newErrors.name = 'Ім\'я обов\'язкове';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Ім\'я має бути мінімум 2 символи';
        }

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
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...formData, username: formData.name})
            });

           await response.json();
        }
    };

    const handleChange = (field: keyof RegisterFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, [field]: e.target.value}));
        if (errors[field]) {
            setErrors(prev => ({...prev, [field]: undefined}));
        }
    };

    return (
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

                    <div className='space-y-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Імя
                            </label>
                            <input
                                type='text'
                                value={formData.name}
                                onChange={handleChange('name')}
                                className='w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-black transition-all'
                                placeholder='Ваш нікнейм'
              />
              {errors.name && (
                <p className='mt-1 text-sm text-red-600'>{errors.name}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Email
              </label>
              <input
                type='email'
                value={formData.email}
                onChange={handleChange('email')}
                className='w-full px-4 py-3 bg-white60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-black transition-all'
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
                                    className='w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-black transition-all pr-12'
                                    placeholder='Мінімум 6 символів'
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
                            className='w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white py-3 rounded-xl font-medium hover:from-blue-500 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
                        </button>
                    </div>

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
    );
};

export default RegisterForm;
