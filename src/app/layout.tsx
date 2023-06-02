'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider, useSession } from 'next-auth/react';
import '../styles/globals.css';
import Providers from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
