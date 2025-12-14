import React from 'react';
import { signOut, useSession } from 'next-auth/react';

import Spinner from '@/ui/Spinner';
import styles from './HeaderActions.module.scss';

export const HeaderActions = () => {
  const { data: session, status } = useSession();

  const handleSignOut = () => signOut({ callbackUrl: '/login' });

  const getUserNameIcon = (name?: string | null) => {
    if (name) {
      return name.split('')[0].toLocaleUpperCase();
    }

    return 'NN';
  };

  if (status === 'loading') {
    return <Spinner size="sm" />;
  }

  if (!session) {
    return null;
  }

  return (
    <button onClick={handleSignOut} className={styles.button}>
      <div className={styles.avatar}>
        <span>{getUserNameIcon(session?.user?.name)}</span>
      </div>
      <p className={styles.text}>Logout</p>
    </button>
  );
};
