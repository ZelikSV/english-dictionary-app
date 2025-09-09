import {NextResponse} from 'next/server';
import {createWordsGroup} from '@/lib/actions';
import {IWordGroup} from '@/types';
import {getCurrentUser} from '@/lib/session';

export const POST = async (request: Request) =>  {
    try {
        const body = (await request.json()) as IWordGroup;
        const user = await getCurrentUser();

        if (!body?.id || !body?.name || !Array.isArray(body?.words)) {
            return NextResponse.json({error: 'Invalid payload'}, {status: 400});
        }

        if (!user?.id) {
            return NextResponse.json({error: 'User not found'}, {status: 400});
        }

        await createWordsGroup({...body, userId: user.id});

        return NextResponse.json({ok: true}, {status: 201});
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
};


