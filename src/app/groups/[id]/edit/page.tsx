import EditWordsGroupForm from '@/ui/EditWordsGroupForm';
import {wordGroups} from '@/lib/constants';
import Breadcrumbs from '@/ui/Breadcrumbs';

const GroupsEdit = async (props: { params: Promise<{ id: string }> })=> {
    const {id} = await props.params;

    const group = wordGroups.find(el => el.id === id);

    if (!group) {
        return null;
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
            <Breadcrumbs breadcrumbs={[
                {
                    label: 'Edit Group',
                    href: `/groups/${id}/edit`,
                    active: true
                }
            ]} showBackButton={false} />
            <EditWordsGroupForm group={group} />
        </div>
    );
};

export default GroupsEdit;
