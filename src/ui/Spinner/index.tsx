import React from 'react';
import styles from './Spinner.module.scss';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'gray' | 'white' | 'green' | 'red';
  className?: string;
  text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'blue',
  className = '',
  text,
}) => {
  const spinnerClasses = `${styles.spinner} ${styles[size]} ${styles[color]} ${className}`;

  if (text) {
    return (
      <div className={styles.wrapper}>
        <div className={spinnerClasses}></div>
        <span className={styles.spinnerText}>{text}</span>
      </div>
    );
  }

  return <div className={spinnerClasses}></div>;
};

export default Spinner;
