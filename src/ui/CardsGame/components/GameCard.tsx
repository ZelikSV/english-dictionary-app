import React from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Lang } from '@/lib/constants';
import { Card } from '../hooks/useCardsGame';
import styles from './GameCard.module.scss';

interface GameCardProps {
  card: Card;
  onFlip: (cardId: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ card, onFlip }) => {
  const labelMap = {
    front: {
      [Lang.EN]: '🇬🇧 English',
      [Lang.UA]: '🇺🇦 Українська',
    },
    back: {
      [Lang.EN]: '🇺🇦 Переклад',
      [Lang.UA]: '🇬🇧 Translation',
    },
  };

  const cardInnerClass = card.isFlipped
    ? `${styles.cardInner} ${styles.flipped}`
    : styles.cardInner;

  return (
    <div className={styles.cardContainer}>
      <div className={cardInnerClass} onClick={() => onFlip(card.id)}>
        {/* Front side */}
        <div className={`${styles.cardFace} ${styles.cardFront}`}>
          <div className={styles.cardContent}>
            <div className={styles.languageLabel}>
              {labelMap.front[card.frontLanguage]}
            </div>
            <h3 className={styles.wordText}>{card.frontText}</h3>
            <p className={styles.flipHint}>Клікніть для перевороту</p>
          </div>
        </div>

        {/* Back side */}
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          <div className={styles.backContent}>
            <div className={styles.backLabel}>
              {labelMap.back[card.frontLanguage]}
            </div>
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
