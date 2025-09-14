import EditWordsGroupForm from '@/ui/EditWordsGroupForm';
import Breadcrumbs from '@/ui/Breadcrumbs';
import {getWordsGroupById} from '@/lib/actions';

const GroupsEdit = async (props: { params: Promise<{ id: string }> })=> {
    const {id} = await props.params;

    const group = await getWordsGroupById(id);

    if (!group.length) {
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
            <EditWordsGroupForm group={group[0]} />
        </div>
    );
};

export default GroupsEdit;
