import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { EyeIcon } from '@heroicons/react/24/outline';
import { voicesNames } from '@/lib/constants';
import { ICard } from '@/store/cardGameStore';

import styles from './styles.module.scss';

interface GameCardProps {
    card: ICard;
    onFlip: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ card, onFlip }) => {
    const isFirstMount = useRef(true);

    useEffect(() => {
        if (!isFirstMount.current) {
            const message = new SpeechSynthesisUtterance();
            const voices = speechSynthesis
                .getVoices()
                .filter(voice => voice.lang === 'en-US');
            const voice = voices.find(voice => voice.name === voicesNames[1]);

            if (card.frontText && voice) {
                message.text = card.frontText;
                message.voice = voice;

                speechSynthesis.speak(message);
            }
        } else {
            isFirstMount.current = false;
        }
    }, []);

    return (
        <div className={styles.cardContainer}>
            <div
                className={clsx(styles.cardInner, card.isFlipped && styles.flipped)}
                onClick={onFlip}
            >
                <div className={`${styles.cardFace} ${styles.cardFront}`}>
                    <div className={styles.cardContent}>
                        <div className={styles.languageLabel}>🇬🇧 English</div>
                        <h3 className={styles.wordText}>{card.frontText}</h3>
                        <p className={styles.flipHint}>Клікніть для перевороту</p>
                    </div>
                </div>

                <div className={`${styles.cardFace} ${styles.cardBack}`}>
                    <div className={styles.backContent}>
                        <div className={styles.backLabel}>🇺🇦 Переклад</div>
                        <h3 className={styles.backText}>{card.backText}</h3>
                        <div className={styles.eyeIcon}>
                            <EyeIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
