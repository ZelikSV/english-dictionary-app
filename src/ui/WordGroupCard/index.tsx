import Link from 'next/link';
import {IWordGroup} from '@/types';

export const WordGroupCard = ({group}: { group: IWordGroup }) => {
    return (
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50'>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center space-x-3'>
                    <div className='w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full'></div>
                    <h3 className='font-semibold text-gray-800 text-lg'>{group.name}</h3>
                </div>
                <div className='flex items-center space-x-2'>
                    <Link
                        href={`/groups/${group.id}/edit`}
                        className='w-8 h-8 bg-gray-100 hover:bg-blue-50 rounded-lg flex items-center justify-center transition-colors group'
                    >
                        <svg className='w-4 h-4 text-gray-600 group-hover:text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                        </svg>
                    </Link>
                    <div
                        className='w-8 h-8 bg-gray-100 hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors group'
                    >
                        <svg className='w-4 h-4 text-gray-600 group-hover:text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                        </svg>
                    </div>
                </div>
            </div>

            <div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 mb-4'>
                <span className='text-2xl font-bold text-gray-800'>{group.words.length}</span>
                <span className='text-gray-600 ml-2'>слів</span>
            </div>

            <div className='flex flex-wrap gap-2 mb-4'>
                {group.words.slice(0, 6).map((word, index) => (
                    <span key={index} className='bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-medium'>
            {word.en}
          </span>
                ))}
                {group.words.length > 6 && (
                    <span className='bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium'>
            +{group.words.length - 6} ще
          </span>
                )}
            </div>

            <div
                className='w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 rounded-xl font-medium hover:from-green-500 hover:to-green-600 transition-all duration-200 flex items-center justify-center space-x-2'
            >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
                <span>Вибрати групу</span>
            </div>
        </div>
    );
};
