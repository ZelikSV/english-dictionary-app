'use client';

import Link from 'next/link';
import {clsx} from 'clsx';

import {HeaderActions} from '@/ui/HeaderActions';

export const Header = () => {
    return (
        <div className='fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm border-b border-gray-200/30'>
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
                    <HeaderActions />
                </div>
            </div>
        </div>
    );
};
