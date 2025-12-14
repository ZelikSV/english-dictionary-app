import React from 'react';
import Link from 'next/link';

import RegisterForm from '@/ui/RegisterForm';
import styles from './page.module.scss';

const RegisterPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.icon}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h1 className={styles.title}>Реєстрація</h1>
            <p className={styles.subtitle}>Створіть новий обліковий запис</p>
          </div>
          <RegisterForm />
          <div className={styles.footer}>
            <p>
              Вже є обліковий запис? <Link href="/login">Увійти</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
