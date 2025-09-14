import {NextRequest, NextResponse} from 'next/server';
import {deleteWordsGroup, getWordsGroupById} from '@/lib/actions';
import {getCurrentUser} from '@/lib/session';
import {log} from '@/lib/logger';

export const DELETE = async (
    _: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                {error: 'Unauthorized'},
                {status: 401}
            );
        }

        const params = await context.params;
        const groupId = params.id;

        await deleteWordsGroup(groupId);

        return NextResponse.json({ok: true}, {status: 200});
    } catch (error) {
        log.error('Delete group error:', error);

        return NextResponse.json(
            {error: 'Failed to delete group'},
            {status: 500}
        );
    }
};

export const GET = async (
    _: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                {error: 'Unauthorized'},
                {status: 401}
            );
        }

        const params = await context.params;
        const groupId = params.id;

        const group = await getWordsGroupById(groupId);

        if (!group) {
            return NextResponse.json(
                {error: 'Group not found'},
                {status: 404}
            );
        }

        return NextResponse.json({group}, {status: 200});
    } catch (error) {
        log.error('Get group error:', error);

        return NextResponse.json(
            {error: 'Failed to get group'},
            {status: 500}
        );
    }
};
