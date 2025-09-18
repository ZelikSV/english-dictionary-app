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

        return 'NN';
    };

    if (status === 'loading') {
        return <Spinner size='sm' />;
    }

    if (!session) {
        return null;
    }

    return (
                <button onClick={handleSignOut} className='flex items-center space-x-2 bg-white/60 rounded-xl px-3 py-2 backdrop-blur-sm hover:cursor-pointer'>
                    <div className='w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center'>
                        <span className='text-white font-medium text-sm'>{getUserNameIcon(session?.user?.name)}</span>
                    </div>
                    <p className='text-gray-600 hover:text-red-500 text-sm font-medium transition-colors cursor-pointer duration-200'>
                        Logout
                    </p>
                </button>
    );
};
