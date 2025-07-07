import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Inter } from 'next/font/google';
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Belajar Next.js Headless CMS',
    template: '%s | Next.js Blog',
  },
  description:
    'Membangun website modern dengan Next.js dan Headless CMS, studi kasus blog.',
  keywords: ['Next.js', 'Headless CMS', 'React', 'TypeScript', 'Blog'],
  authors: [{ name: 'Rendra Zuriansyah' }],
  creator: 'Rendra Zuriansyah',
  publisher: 'Rendra.Zuriansyah.dev',
  openGraph: {
    title: 'Next.js Headless CMS Blog',
    description:
      'Membangun website modern dengan Next.js dan Headless CMS, studi kasus blog.',
    // url: 'https://nextjs-headless-cms-manual.vercel.app/',
    url: 'http://localhost:3000',
    siteName: 'Next.js Blog by Rendra',
    images: [
      {
        // url: 'https://nextjs-headless-cms-manual.vercel.app/og-image.jpg',
        url: 'http://localhost:3000/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Next.js Blog Logo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js Headless CMS Blog',
    description:
      'Membangun website modern dengan Next.js dan Headless CMS, studi kasus blog.',
    creator: '@rendrazuriansyah',
    images: [
      // 'https://nextjs-headless-cms-manual.vercel.app/twitter-image.jpg',
      'http://localhost:3000/twitter-image.jpg',
    ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${inter.variable}`}>
      <body>
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
        {children}
      </body>
    </html>
  );
}
