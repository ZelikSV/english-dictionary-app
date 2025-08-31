import NewWordsGroupForm from '@/ui/NewWordsGroupForm';
import Breadcrumbs from '@/ui/Breadcrumbs';

const GroupsCreate = () => {
    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
            <Breadcrumbs breadcrumbs={[
                {
                    label: 'Create New Group',
                    href: '/groups/new',
                    active: true
                }
            ]} showBackButton={false} />
            <NewWordsGroupForm />
        </div>
    );
};

export default GroupsCreate;
