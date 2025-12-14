'use client';
import { useRouter } from 'next/navigation';
import { Activity } from '@/types';
import { activities } from '@/lib/constants';

import styles from './ActivityCards.module.scss';

const ActivityCards = () => {
    const router = useRouter();

    const handleActivityClick = (activity: Activity) => () => {
        router.push(activity.link);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Оберіть гру</h2>
            <div className={styles.grid}>
                {activities.map((activity, index) => (
                    <div
                        key={index}
                        className={styles.card}
                        onClick={handleActivityClick(activity)}
                    >
                        <div
                            className={`${styles.iconWrapper} ${styles[activity.color]}`}
                        >
                            <activity.icon />
                        </div>
                        <h3 className={styles.cardTitle}>{activity.title}</h3>
                        <p className={styles.cardDescription}>{activity.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityCards;
