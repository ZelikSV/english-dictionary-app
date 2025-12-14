import React from 'react';
import styles from './ProgressIndicator.module.scss';

interface Card {
  id: string;
  isFlipped: boolean;
}

interface ProgressIndicatorProps {
  cards: Card[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  cards,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.dots}>
        {cards.map(card => {
          const dotClass = card.isFlipped ? styles.flipped : styles.notFlipped;
          return <div key={card.id} className={`${styles.dot} ${dotClass}`} />;
        })}
      </div>
    </div>
  );
};
