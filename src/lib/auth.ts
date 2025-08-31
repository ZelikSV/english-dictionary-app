import {auth} from '@/app/api/auth/[...nextauth]/route';

export const getCurrentUser = async () => {
    const session = await auth();

    return session;
};

export const requireAuth = async ()=> {
    const session = await auth();
    if (!session) {
        throw new Error('Authentication required');
    }

    return session;
};
