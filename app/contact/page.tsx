import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontak Kami',
  description: 'Hubungi kami di website Next.js Headless CMS',
};

export default function ContactPage() {
  return (
    <main>
      <h1>Kontak Kami</h1>
      <p>Silahkan hubungi kami melalui email atau telepon.</p>
      <p>Email: rendra.zuriansyah.dev@gmail.com</p>
    </main>
  );
}
