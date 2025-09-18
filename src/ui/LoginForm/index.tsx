'use client';
import React, {useState} from 'react';
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline';
import {signIn} from 'next-auth/react';
import Spinner from '@/ui/Spinner';

interface LoginFormData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true);

            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false
            });

            setIsLoading(false);

            if (result?.ok) {
                window.location.href = '/';
            }
        }
    };

    const handleChange = (field: keyof LoginFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, [field]: e.target.value}));
        if (errors[field]) {
            setErrors(prev => ({...prev, [field]: undefined}));
        }
    };

    return (
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
                            {isLoading && (
                                     <span className='inline-block mr-[10px]'>
                                        <Spinner size='sm' color='white' />
                                     </span>)}
                            <span className='text-white'>
                                 {isLoading ? 'Вхід...' : 'Увійти'}
                            </span>
                        </button>
                    </div>
    );
};

export default LoginForm;
