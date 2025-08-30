'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {clsx} from 'clsx';

const routes = [
    {
        link: '/spelling',
        title: 'Spelling'
    },
    {
        link: '/quiz',
        title: 'Quiz'
    },
    {
        link: '/cards',
        title: 'Cards'
    }
];

export const Header = () => {
    const pathname = usePathname();

    return (
        <div className='bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm border-b border-gray-200/30'>
            <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
                <div className='flex justify-between items-center h-18 py-3'>
                    <div className='flex items-center'>
                        <div className='w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center mr-3'>
                            <span className='text-white font-bold text-sm'>L</span>
                        </div>
                        <Link
                            href='/'
                            className={clsx('text-gray-800 font-semibold text-lg')}
                        >
                            Learning Hub
                        </Link>
                    </div>

                    <nav className='flex items-center space-x-2'>
                        {routes.map(el => (
                            <Link
                                key={el.link}
                                href={el.link}
                                className={clsx(
                                    'px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 backdrop-blur-sm text-gray-600 hover:text-gray-800 hover:bg-white/60',
                                    pathname === el.link ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md' : ''
                                )}
                            >
                                {el.title}
                            </Link>
                        ))}
                    </nav>

                    <div className='flex items-center space-x-3'>
                        <div className='relative'>
                            <div className='w-9 h-9 bg-white/80 hover:bg-white rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 shadow-sm'>
                                <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 17h5l-3.5-3.5a3.5 3.5 0 01-1.5-2.83V8a6 6 0 10-12 0v2.67c0 1.1-.6 2.1-1.5 2.83L5 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9' />
                                </svg>
                            </div>
                            <div className='absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center'>
                                <span className='text-white text-xs font-medium'>2</span>
                            </div>
                        </div>

                        <div className='flex items-center space-x-2 bg-white/60 rounded-xl px-3 py-2 backdrop-blur-sm hover:cursor-pointer'>
                            <div className='w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center'>
                                <span className='text-white font-medium text-sm'>U</span>
                            </div>
                            <button className='text-gray-600 hover:text-red-500 text-sm font-medium transition-colors cursor-pointer duration-200'>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
