'use client';
import {useRouter} from 'next/navigation';
import {Activity} from '@/types';
import {activities} from '@/lib/constants';

const ActivityCards = () => {
    const router = useRouter();

    const handleActivityClick = (activity: Activity) => () => {
        router.push(activity.link);
    };

    return (
        <div className='bg-white rounded-lg shadow-lg p-6'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
                Оберіть гру
            </h2>
            <div className='grid md:grid-cols-3 gap-6'>
                {activities.map((activity, index) => (
                    <div
                        key={index}
                        className='group cursor-pointer bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-gray-300'
                        onClick={handleActivityClick(activity)}
                    >
                        <div className={`w-12 h-12 ${activity.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <activity.icon className='w-6 h-6 text-white' />
                        </div>
                        <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                            {activity.title}
                        </h3>
                        <p className='text-gray-600 text-sm'>
                            {activity.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityCards;
