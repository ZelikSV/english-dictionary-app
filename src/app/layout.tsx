import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';

import {Header} from '@/ui/Header';
import AuthSessionProvider from '@/ui/SessionProvider';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Learning Hub',
  description: 'Learning Hub'
};

const RootLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) =>  {
  return (
    <html lang='en'>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthSessionProvider>
            <Header />
            <main className='min-h-screen'>
                {children}
            </main>
        </AuthSessionProvider>
    </body>
    </html>
  );
};

export default RootLayout;
