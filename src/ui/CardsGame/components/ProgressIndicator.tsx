import React from 'react';
import clsx from 'clsx';

import styles from './ProgressIndicator.module.scss';

interface Card {
    id: string;
    isFlipped: boolean;
}

interface ProgressIndicatorProps {
    cards: Card[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ cards }) => {
    return (
        <div className={styles.container}>
            <div className={styles.dots}>
                {cards.map(card => (
                    <div
                        key={card.id}
                        className={clsx(styles.dot, {
                            [styles.flipped]: card.isFlipped,
                            [styles.notFlipped]: !card.isFlipped,
                        })}
                    />
                ))}
            </div>
        </div>
    );
};
