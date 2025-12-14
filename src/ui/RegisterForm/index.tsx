'use client';
import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import styles from './RegisterForm.module.scss';

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}

const RegisterForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

    const validateForm = () => {
        const newErrors: Partial<RegisterFormData> = {};

        if (!formData.name) {
            newErrors.name = "Ім'я обов'язкове";
        } else if (formData.name.length < 2) {
            newErrors.name = "Ім'я має бути мінімум 2 символи";
        }

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

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, username: formData.name }),
            });

            await response.json();

            setIsLoading(false);
            router.push('/login');
        }
    };

    const handleChange =
        (field: keyof RegisterFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(prev => ({ ...prev, [field]: e.target.value }));
            if (errors[field]) {
                setErrors(prev => ({ ...prev, [field]: undefined }));
            }
        };

    return (
        <div className={styles.form}>
            <div className={styles.fieldGroup}>
                <label>Імя</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={handleChange('name')}
                    placeholder="Ваш нікнейм"
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>

            <div className={styles.fieldGroup}>
                <label>Email</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    placeholder="your@email.com"
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            <div className={styles.fieldGroup}>
                <label>Пароль</label>
                <div className={styles.passwordWrapper}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange('password')}
                        placeholder="Мінімум 6 символів"
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
                className={styles.submitButton}
                disabled={isLoading}
            >
                {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
            </button>
        </div>
    );
};

export default RegisterForm;
