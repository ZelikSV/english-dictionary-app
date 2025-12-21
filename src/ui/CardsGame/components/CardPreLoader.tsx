import React from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import styles from './CardPreLoader.module.scss';

export const CardPreLoader = () => (
    <div>
        <div className={styles.cardContainer}>
            <div className={styles.cardInner}>
                <div className={`${styles.cardFace} ${styles.cardFront}`}>
                    <div className={styles.cardContent}>
                        <div className={styles.languageLabel}>🇬🇧 English</div>
                        <h3 className={styles.wordText}>Loading.....</h3>
                        <p className={styles.flipHint}>Клікніть для перевороту</p>
                    </div>
                </div>
            </div>
        </div>

        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.actions}>
                    <button className={`${styles.button} ${styles.nextRound}`}>
                        <ArrowLeftIcon />
                        Попереднє слово
                    </button>

                    <button className={`${styles.button} ${styles.shuffle}`}>
                        <ArrowRightIcon />
                        Наступне слово
                    </button>
                </div>
            </div>
        </div>
    </div>
);
