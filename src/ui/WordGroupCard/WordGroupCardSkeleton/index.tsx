import styles from './WordGroupCardSkeleton.module.scss';

const cardList = Array.from({ length: Math.floor(Math.random() * 4) + 3 });
const cardWidth = Math.floor(Math.random() * 60) + 40;

const WordGroupCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.dot} />
          <div className={styles.titleSkeleton} />
        </div>
        <div className={styles.actions}>
          <div className={styles.actionButton} />
          <div className={styles.actionButton} />
        </div>
      </div>

      <div className={styles.statsBox}>
        <div className={styles.statsContent}>
          <div className={styles.statsNumber} />
          <div className={styles.statsLabel} />
        </div>
      </div>

      <div className={styles.wordsSection}>
        <div className={styles.wordsGrid}>
          {cardList.map((_, index) => (
            <div
              key={index}
              className={styles.wordChip}
              style={{ width: `${cardWidth}px` }}
            />
          ))}
          <div className={styles.moreChip} />
        </div>
      </div>

      <div className={styles.button} />
    </div>
  );
};

const WordGroupCardsGridSkeleton = ({ count = 3 }) => {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, index) => (
        <WordGroupCardSkeleton key={index} />
      ))}
    </div>
  );
};

export { WordGroupCardSkeleton, WordGroupCardsGridSkeleton };
