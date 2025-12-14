import styles from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.message}>Завантаження слів...</p>
      </div>
    </div>
  );
};
