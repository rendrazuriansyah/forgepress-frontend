import PostCard from '@/components/PostCard';
import {
  getStrapiPostsByCategorySlug,
  getStrapiCategories,
} from '@/lib/strapi-v5';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const categorySlug = params.slug;
  const categories = await getStrapiCategories();
  const currentCategory = categories.find(
    (cat) => cat.slug === categorySlug,
  );

  if (!currentCategory) {
    return {
      title: 'Kategori Tidak Ditemukan',
      description: `Kategori ${categorySlug} tidak ditemukan.`,
    };
  }

  return {
    title: `Artikel Kategori: ${currentCategory.name}`,
    description: `Lihat semua artikel dalam kategori ${currentCategory.name}`,
  };
}

export async function generateStaticParams() {
  const categories = await getStrapiCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const categorySlug = params.slug;
  const posts = await getStrapiPostsByCategorySlug(categorySlug);
  const categories = await getStrapiCategories();
  const currentCategory = categories.find(
    (cat) => cat.slug == categorySlug,
  );

  if (!currentCategory) {
    notFound();
  }

  const categoryName = currentCategory?.name || categorySlug;

  return (
    <main className='container mx-auto px-4 py-8 max-w-4xl'>
      <h1 className='text-4xl font-bold text-gray-900 mb-6'>
        Artikel dalam Kategori:{' '}
        <span className='text-blue-600'>{categoryName}</span>
      </h1>

      {posts.length === 0 ? (
        <p className='text-center text-gray-600 text-lg'>
          Belum ada artikel dalam kategori "{categoryName}".
        </p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              description={post.description}
              slug={post.slug}
              imageUrl={
                post.coverImage?.url
                  ? `${process.env.STRAPI_API_URL}${post.coverImage.url}`
                  : undefined
              }
            ></PostCard>
          ))}
        </div>
      )}

      <div className='mt-12 text-center'>
        <Link
          href='/'
          className='px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300'
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
