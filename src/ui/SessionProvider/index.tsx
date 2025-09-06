'use client';

import {SessionProvider} from 'next-auth/react';
import {ReactNode} from 'react';
import {Session} from 'next-auth';

interface Props {
    children: ReactNode;
    session?: Session | null;
}

const AuthSessionProvider = ({children, session}: Props) => <SessionProvider session={session}>{children}</SessionProvider>;

export default AuthSessionProvider;
