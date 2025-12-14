import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { Lang } from '@/lib/constants';
import styles from './GameHeader.module.scss';

interface GameHeaderProps {
  currentRound: number;
  gameLanguage: Lang;
  totalFlipped: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  currentRound,
  gameLanguage,
  totalFlipped,
}) => {
  const router = useRouter();
  const languageClass =
    gameLanguage === Lang.EN ? styles.english : styles.ukrainian;

  return (
    <div className={styles.header}>
      <button onClick={() => router.push('/')} className={styles.backButton}>
        <ArrowLeftIcon />
        На головну
      </button>

      <div className={styles.headerCenter}>
        <h1>Навчальні картки</h1>
        <p className={styles.roundNumber}>Раунд #{currentRound}</p>
        <p className={`${styles.languageMode} ${languageClass}`}>
          {gameLanguage === Lang.EN
            ? '🇬🇧 English → Українська'
            : '🇺🇦 Українська → English'}
        </p>
      </div>

      <div className={styles.headerRight}>
        <p>Всього перевернуто: {totalFlipped}</p>
      </div>
    </div>
  );
};
