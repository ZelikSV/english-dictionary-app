import {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import {sql} from '@/lib/db';
import {log} from '@/lib/logger';

const MAX_AGE_TOKEN = 5 * 24 * 60 * 60; // 5 days for JWT token
const UPDATE_AGE_TOKEN = 24 * 60 * 60; // update every 24 hours

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'Email', type: 'email'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const users = await sql`SELECT * FROM users WHERE email = ${credentials.email}`;

                    if (users.length === 0) {
                        return null;
                    }

                    const user = users[0];

                    const isValid = await bcrypt.compare(credentials.password, user.password);

                    if (!isValid) {
                        return null;
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.username
                    };
                } catch (error) {
                    log.error('Auth error:', error);

                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = Number(user.id);
                token.email = user.email;
                token.name = user.name;
            }

            return token;
        },
        async session({session, token}) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
            }

            return session;
        },
        async redirect({url, baseUrl}) {
            if (url.startsWith('/')) {
                return `${baseUrl}${url}`;
            }

            if (new URL(url).origin === baseUrl) {
                return url;
            }

            return baseUrl;
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: MAX_AGE_TOKEN,
        updateAge: UPDATE_AGE_TOKEN
    },
    jwt: {
        maxAge: MAX_AGE_TOKEN
    },
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET
};
