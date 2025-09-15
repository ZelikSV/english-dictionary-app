import React from 'react';
import EmptyWordsPage from '@/ui/NoWordsSelected';
import {cookies} from 'next/headers';

const GamesLayout = async ({children}: { children: React.ReactNode;}) => {
    const cookieStore = await cookies();
    const selectedGroup = cookieStore.get('group')?.value;

    if (!selectedGroup) {
        return <EmptyWordsPage />;
    }

    return (
        <>
            {children}
        </>
    );
};

export default GamesLayout;
