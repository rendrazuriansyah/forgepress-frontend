import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Next.js Headless CMS',
  description: 'Belajar Next.js dengan Headless CMS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <nav
        style={{
          padding: '10px 20px',
          backgroundColor: '#eee',
          marginBottom: '20px',
        }}
      >
        <Link href='/' style={{ marginRight: '15px' }}>
          Home
        </Link>
        <Link href='/about' style={{ marginRight: '15px' }}>
          About
        </Link>
        <Link href='/contact'>Contact</Link>
      </nav>
      <body>{children}</body>
    </html>
  );
}
