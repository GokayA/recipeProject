'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import { Roboto } from 'next/font/google';
import '../styles/globals.css';
import Providers from './providers';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <SessionProvider>
          <Providers>
            <Navbar />
            {children}
            <Analytics />
            <Footer />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
