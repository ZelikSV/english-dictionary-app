'use client';
import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { signIn } from 'next-auth/react';
import Spinner from '@/ui/Spinner';
import styles from './LoginForm.module.scss';

interface LoginFormData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<LoginFormData>>({});

    const validateForm = () => {
        const newErrors: Partial<LoginFormData> = {};

        if (!formData.email) {
            newErrors.email = "Email обов'язковий";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Невірний формат email';
        }

        if (!formData.password) {
            newErrors.password = "Пароль обов'язковий";
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
                redirect: false,
            });

            setIsLoading(false);

            if (result?.ok) {
                window.location.href = '/';
            }
        }
    };

    const handleChange =
        (field: keyof LoginFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(prev => ({ ...prev, [field]: e.target.value }));
            if (errors[field]) {
                setErrors(prev => ({ ...prev, [field]: undefined }));
            }
        };

    return (
        <div className={styles.form}>
            <div className={styles.fieldGroup}>
                <label className={styles.label}>Email</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    className={styles.input}
                    placeholder="your@email.com"
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            <div className={styles.fieldGroup}>
                <label className={styles.label}>Пароль</label>
                <div className={styles.passwordWrapper}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange('password')}
                        className={`${styles.input} ${styles.passwordInput}`}
                        placeholder="Введіть пароль"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={styles.toggleButton}
                    >
                        {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    </button>
                </div>
                {errors.password && <p className={styles.error}>{errors.password}</p>}
            </div>

            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={styles.submitButton}
            >
                <div className={styles.buttonContent}>
                    {isLoading && (
                        <span className={styles.spinner}>
                            <Spinner size="sm" color="white" />
                        </span>
                    )}
                    <span className={styles.buttonText}>
                        {isLoading ? 'Вхід...' : 'Увійти'}
                    </span>
                </div>
            </button>
        </div>
    );
};

export default LoginForm;
