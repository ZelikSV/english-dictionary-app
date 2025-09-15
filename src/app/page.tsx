import Link from 'next/link';

import {WordGroupCard} from '@/ui/WordGroupCard';
import {SearchGroups} from '@/ui/SearchGroups';
import ActivityCards from '@/ui/ActivityCards';
import {getWordsGroupByUserId} from '@/lib/actions';

const Home = async ({searchParams}: { searchParams: { search?: string } }) => {
    const {search} = await searchParams;
    const wordGroups = await getWordsGroupByUserId(search);

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between mb-8'>
                    <SearchGroups />
                    <Link
                        href='/groups/create'
                        className='flex items-center space-x-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-3 rounded-xl font-medium hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl'
                    >
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                        </svg>
                        <span>Створити групу</span>
                    </Link>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-20'>
                    {wordGroups.map(group => (
                        <WordGroupCard key={group.id} group={group} />
                    ))}
                </div>
                <ActivityCards />
            </div>
        </div>
    );
};

export default Home;
