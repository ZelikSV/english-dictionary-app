import React from 'react';
import styles from './GameProgress.module.scss';

interface Card {
    id: string;
    isFlipped: boolean;
}

interface GameProgressProps {
    cards: Card[];
    cardsPerRound: number;
    allCardsFlipped: boolean;
}

export const GameProgress: React.FC<GameProgressProps> = ({
    cards,
    cardsPerRound,
    allCardsFlipped,
}) => {
    const flippedCount = cards.filter(card => card.isFlipped).length;

    return (
        <div className={styles.container}>
            <p className={styles.instruction}>
                Подумайте над перекладом, потім клікніть на картку для перевірки
            </p>
            <div className={styles.stats}>
                <span>
                    Перевернуто: {flippedCount}/{cardsPerRound}
                </span>
                {allCardsFlipped && (
                    <span className={styles.allComplete}>✅ Всі картки відкриті!</span>
                )}
            </div>
        </div>
    );
};
