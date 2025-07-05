import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Informasi tentang website Next.js Headless CMS',
};

export default function AboutPage() {
  return (
    <main>
      <h1>Tentang Kami</h1>
      <p>Website ini dibuat untuk belajar Next.js dan Headless CMS</p>
      <p>Ini adalah halama</p>
    </main>
  );
}
