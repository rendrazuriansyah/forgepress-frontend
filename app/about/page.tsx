import { getStrapiAboutPage } from '@/lib/strapi-v5';
import MarkdownContent from '@/components/MarkdownContent';
import Image from 'next/image';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const aboutPageData = await getStrapiAboutPage();
  return {
    title: aboutPageData?.title || 'Tentang Saya',
    description:
      aboutPageData?.content.substring(0, 150) ||
      'Informasi tentang blog saya.',
  };
}

export default async function AboutPage() {
  const aboutPageData = await getStrapiAboutPage();

  if (!aboutPageData) {
    return (
      <main className='container mx-auto px-4 py-8 max-w-2xl text-center'>
        <h1 className='text-3xl font-bold text-red-600 mb-4'>
          Konten About Tidak Ditemukan
        </h1>
        <p className='text-gray-700'>
          Pastikan Anda sudah membuat dan mempublikasikan "About Page" di
          Strapi.
        </p>
      </main>
    );
  }

  const imageUrl = aboutPageData.coverImage?.url
    ? `${process.env.STRAPI_API_URL}${aboutPageData.coverImage.url}`
    : undefined;

  return (
    <main className='container mx-auto px-4 py-8 max-w-2xl'>
      {imageUrl && (
        <div className='relative w-full h-64 mb-6 rounded-lg overflow-hidded'>
          <Image
            src={imageUrl}
            alt={aboutPageData.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes='(max-width: 768px) 100vw, 700px'
            className='rounded-lg'
          ></Image>
        </div>
      )}
      <h1 className='text-4xl font-bold text-gray-900 mb-4'>
        {aboutPageData.title}
      </h1>
      <article className='prose prose-lg max-w-none'>
        <MarkdownContent
          htmlContent={aboutPageData.content}
        ></MarkdownContent>
      </article>
    </main>
  );
}

// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'About',
//   description: 'Informasi tentang website Next.js Headless CMS',
// };

// export default function AboutPage() {
//   return (
//     <main>
//       <h1>Tentang Kami</h1>
//       <p>Website ini dibuat untuk belajar Next.js dan Headless CMS</p>
//       <p>Ini adalah halama</p>
//     </main>
//   );
// }
