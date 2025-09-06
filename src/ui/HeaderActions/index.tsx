import React from 'react';
import {signOut, useSession} from 'next-auth/react';

import Spinner from '@/ui/Spinner';

export const HeaderActions= () => {
    const {data: session, status} = useSession();

    const handleSignOut = () => signOut({callbackUrl: '/login'});

    const getUserNameIcon = (name?: string | null) => {
        if (name) {
            return name.split('')[0].toLocaleUpperCase();
        }

        return 'N';
    };

    if (status === 'loading') {
        return <Spinner size='sm' />;
    }

    if (!session) {
        return null;
    }

    return (
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
                        <span className='text-white font-medium text-sm'>{getUserNameIcon(session?.user?.name)}</span>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className='text-gray-600 hover:text-red-500 text-sm font-medium transition-colors cursor-pointer duration-200'
                    >
                        Logout
                    </button>
                </div>
            </div>
    );
};
