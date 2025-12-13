import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { ReactNode } from 'react';

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || 'Invoicing for Freelancers',
  description: 'Compare invoicing software for freelancers. Honest reviews and recommendations.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ padding: '24px 0' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
