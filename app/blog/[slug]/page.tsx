import {
  getStrapiPostBySlug,
  getStrapiPosts,
  PostAttributes,
} from '@/lib/strapi-v5';
import MarkdownContent from '@/components/MarkdownContent';
import ShareLinkButton from '@/components/ShareLinkButton';
import Image from 'next/image';
import Link from 'next/link';

import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// fungsi untuk generate metadata dinamis (dari Strapi)
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getStrapiPostBySlug(slug);
  if (!postData) {
    return {
      title: 'Post Nof Found',
      description: 'The post you are looking for does not exist.',
    };
  }
  return {
    title: postData.title,
    description: postData.description,
    openGraph: {
      title: postData.title,
      description: postData.description,
      // url: `http://nextjs-headless-cms-manual.vercel.app/blog/${params.slog}`,
      url: `http://localhost:3000/blog/${slug}`,
      type: 'article',
      images: postData.coverImage?.url
        ? [
            {
              url: `${process.env.STRAPI_API_URL}${postData.coverImage.url}`,
              width: postData.coverImage.width,
              height: postData.coverImage.height,
              alt: postData.title,
            },
          ]
        : [],
      publishedTime: postData.publishedAt,
      authors: [postData.author],
      // tags: postData.tags, // belum ada plan untuk implementasi tags dinamis
    },
  };
}

// fungsi untuk menghasilkan semua path dinamis yang mungkin (Static Params)
export async function generateStaticParams() {
  // const paths = getAllPostIds();
  // return paths;
  const posts = await getStrapiPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// komponen halaman detail post
export default async function Post({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const postData = await getStrapiPostBySlug(slug); // mengambil data post berdasarkan slug (id)

  if (!postData) {
    // Ini bisa diarahkan ke halaman 404 atau tampilkan pesan error
    return (
      <main className='container mx-auto px-4 py-8 max-w-2xl text-center'>
        <h1 className='text-3xl font-bold text-red-600 mb-4'>
          Post Not Found
        </h1>
        <p className='text-gray-700'>
          Maaf, post yang Anda cari tidak ditemukan.
        </p>
        <Link
          href='/'
          className='text-blue-500 hover:underline mt-4 block'
        >
          Kembali ke Home
        </Link>
      </main>
    );
  }

  // const currentPostLink = `http://nextjs-headless-cms-manual.vercel.app/blog/${slug}`;
  const currentPostLink = `http://localhost:3000/blog/${slug}`;
  const imageUrl = postData.coverImage?.url
    ? `${process.env.STRAPI_API_URL}${postData.coverImage.url}`
    : undefined;

  return (
    <main className='container mx-auto px-4 py-8 max-w-2xl'>
      {imageUrl && (
        <div className='relative w-full h-80 rounded-lg overflow-hidden'>
          <Image
            src={imageUrl}
            alt={postData.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes='(max-width: 768px) 100vw, 700px'
            className='rounded-lg'
          ></Image>
        </div>
      )}

      <h1 className='text-4xl font-bold text-gray-900 mb-4'>
        {postData.title}
      </h1>
      <p className='text-gray-600 text-sm mb-6'>
        Ditulis oleh {postData.author} pada{' '}
        {new Date(postData.publishedAt).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      <div className='mb-6'>
        <ShareLinkButton link={currentPostLink}></ShareLinkButton>
      </div>

      <article className='prose prose-lg max-w-none'>
        <MarkdownContent htmlContent={postData.content}></MarkdownContent>
      </article>
    </main>
  );
}
