'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  HomeIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import styles from './Breadcrumbs.module.scss';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
  showBackButton?: boolean;
}

const Breadcrumbs = ({
  breadcrumbs,
  showBackButton = true,
}: BreadcrumbsProps) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.wrapper}>
      <nav aria-label="Breadcrumb" className={styles.nav}>
        {showBackButton && (
          <button
            onClick={handleBack}
            className={styles.iconButton}
            title="Повернутись назад"
          >
            <ArrowLeftIcon />
          </button>
        )}

        <Link
          href="/"
          className={`${styles.iconButton} ${styles.home}`}
          title="На головну"
        >
          <HomeIcon />
        </Link>

        <ol className={styles.breadcrumbList}>
          {breadcrumbs.map(breadcrumb => (
            <li key={breadcrumb.href} className={styles.breadcrumbItem}>
              {breadcrumbs.length > 1 && (
                <ChevronRightIcon className={styles.chevron} />
              )}
              <Link
                href={breadcrumb.href}
                className={`${styles.breadcrumbLink} ${breadcrumb.active ? styles.active : styles.inactive}`}
              >
                {breadcrumb.label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
