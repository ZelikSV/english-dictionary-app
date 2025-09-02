import NextAuth, { type NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const config: NextAuthConfig = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (credentials?.email === 'user@example.com' && credentials?.password === 'password') {
                    return {
                        id: '1',
                        email: 'user@example.com',
                        name: 'User'
                    };
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // @ts-ignore
            session.user.id = token.userId;

            return session;
        }
    }
};

const handler = NextAuth(config);

export { handler as GET, handler as POST };
