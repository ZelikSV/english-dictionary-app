import React from 'react';
import NoEmptyWordsPage from '@/ui/NoWordsSelected';
import {cookies} from 'next/headers';

const GamesLayout = async ({children}: { children: React.ReactNode;}) => {
    const cookieStore = await cookies();
    const selectedGroup = cookieStore.get('group')?.value;

    if (!selectedGroup) {
        return <NoEmptyWordsPage />;
    }

    return (
        <>
            {children}
        </>
    );
};

export default GamesLayout;
