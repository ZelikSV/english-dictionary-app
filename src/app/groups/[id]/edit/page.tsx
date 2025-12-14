import EditWordsGroupForm from '@/ui/EditWordsGroupForm';
import Breadcrumbs from '@/ui/Breadcrumbs';
import { getWordsGroupById } from '@/lib/actions';
import styles from './page.module.scss';

const GroupsEdit = async (props: { params: Promise<{ id: string }> }) => {
    const { id } = await props.params;

    const group = await getWordsGroupById(id);

    if (!group) {
        return null;
    }

    return (
        <div className={styles.container}>
            <Breadcrumbs
                breadcrumbs={[
                    {
                        label: 'Edit Group',
                        href: `/groups/${id}/edit`,
                        active: true,
                    },
                ]}
                showBackButton={false}
            />
            <EditWordsGroupForm group={group} />
        </div>
    );
};

export default GroupsEdit;
