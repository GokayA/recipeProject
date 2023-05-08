'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { SessionProvider, useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
