'use client';

import Link from 'next/link';

import { HeaderActions } from '@/ui/HeaderActions';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span>L</span>
            </div>
            <Link href="/" className={styles.title}>
              Learning Hub
            </Link>
          </div>
          <HeaderActions />
        </div>
      </div>
    </div>
  );
};
