import NewWordsGroupForm from '@/ui/NewWordsGroupForm';
import Breadcrumbs from '@/ui/Breadcrumbs';
import styles from './page.module.scss';

const GroupsCreate = () => {
  return (
    <div className={styles.page}>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Create New Group',
            href: '/groups/new',
            active: true,
          },
        ]}
        showBackButton={false}
      />
      <NewWordsGroupForm />
    </div>
  );
};

export default GroupsCreate;
