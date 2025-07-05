import './globals.css';
import type { Metadata } from 'next';

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
      <body>{children}</body>
    </html>
  );
}
