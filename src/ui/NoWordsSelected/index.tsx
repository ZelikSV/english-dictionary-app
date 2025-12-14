import React from 'react';
import Link from 'next/link';
import styles from './NoWordsSelected.module.scss';

const EmptyWordsPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.card}>
                    <div className={styles.iconWrapper}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>

                    <h2 className={styles.title}>Група слів не обрана</h2>

                    <p className={styles.message}>
                        Для початку гри потрібно спочатку обрати групу слів на головній
                        сторінці
                    </p>

                    <Link href="/" className={styles.button}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        <span>Повернутись до груп</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EmptyWordsPage;
