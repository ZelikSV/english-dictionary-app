import React from 'react';
import Link from 'next/link';

import LoginForm from '@/ui/LoginForm';
import styles from './page.module.scss';

const LoginPage = async () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.iconWrapper}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className={styles.title}>Вхід</h1>
            <p className={styles.subtitle}>
              Увійдіть до свого облікового запису
            </p>
          </div>
          <LoginForm />
          <div className={styles.footer}>
            <p>
              Немає облікового запису?{' '}
              <Link href="/register" className={styles.link}>
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
