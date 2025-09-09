import {NextRequest, NextResponse} from 'next/server';
import {deleteWordsGroup} from '@/lib/actions';
import {getCurrentUser} from '@/lib/session';
import {log} from '@/lib/logger';

export const DELETE = async (_: NextRequest, {params}: { params: { id: string } }) =>  {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                {error: 'Unauthorized'},
                {status: 401}
            );
        }

        await deleteWordsGroup(params.id);

        return NextResponse.json({ok: true}, {status: 200});
    } catch (error) {
        log.error('Delete group error:', error);

        return NextResponse.json(
            {error: 'Failed to delete group'},
            {status: 500}
        );
    }
};
