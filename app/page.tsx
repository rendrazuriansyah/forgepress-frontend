import PostCard from '@/components/PostCard';
import { getStrapiPosts, PostAttributes } from '@/lib/strapi-v5';
import Link from 'next/link';

export default async function HomePage() {
  const strapiPosts = await getStrapiPosts();

  // sort posts by publishedAt in descending order (newest first)
  const sortedPosts = strapiPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime(),
  );

  // ambil 3 post terbaru untuk Featured Posts
  const featuredPosts = sortedPosts.slice(0, 3).map((item) => ({
    id: item.id.toString(),
    title: item.title,
    description: item.description,
    slug: item.slug,
    imageUrl: item.coverImage?.url
      ? `${process.env.STRAPI_API_URL}${item.coverImage.url}`
      : undefined,
    date: new Date(item.publishedAt).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    author: item.author,
  }));

  // semua post untuk bagian 'Artikel Terbaru' (bisa juga semua post kecuali featured)
  const allPosts = sortedPosts.map((item) => ({
    id: item.id.toString(),
    title: item.title,
    description: item.description,
    slug: item.slug,
    imageUrl: item.coverImage?.url ? `${item.coverImage.url}` : undefined,
    date: new Date(item.publishedAt).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    author: item.author,
  }));

  // map data Strapi ke format yang bisa diterima PostCard
  // const posts = strapiPosts.map((item) => ({
  //   id: item.id.toString(), // ID Strapi
  //   title: item.title,
  //   description: item.description,
  //   slug: item.slug,
  //   // URL gambar dari Strapi perlu digabung dengan base URL Strapi
  //   imageUrl: item.coverImage?.url
  //     ? `${process.env.STRAPI_API_URL}${item.coverImage.url}`
  //     : undefined,
  //   date: new Date(item.publishedAt).toLocaleDateString('id-ID', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   }),
  //   author: item.author,
  // }));

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      {/* Hero Section */}
      <section className='w-full max-w-5xl text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-xl mb-12'>
        <h1 className='text-5xl font-extrabold mb-4 animate-fade-in-down'>
          Jelajahi Dunia Teknologi Bersama Rendra
        </h1>
        <p className='text-xl mb-8 opacity-90 animate-fade-in-up'>
          Insight terbaru tentang Next.js, Headless CMS, dan pengembangan
          web modern.
        </p>
        <Link
          href='/blog'
          className='px-8 py-4 bg-white text-blue-700 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 animate-bounce-in'
        >
          Baca Artikel Terbaru
        </Link>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className='w-full max-w-4xl mt-8'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2'>
            Artikel Pilihan
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {featuredPosts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                description={post.description}
                slug={post.slug}
                imageUrl={post.imageUrl}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section className='w-full max-w-4xl mt-12'>
        <h2 className='text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-purple-500 pb-2'>
          Semua Artikel
        </h2>
        {allPosts.length === 0 ? (
          <p className='text-center text-gray-600'>
            Belum ada post dari Strapi. Pastikan Strapi jalan & post sudah
            di-publish.
          </p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {allPosts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                description={post.description}
                slug={post.slug}
                imageUrl={post.imageUrl}
              />
            ))}
          </div>
        )}
      </section>

      {/* Simple Footer */}
      <footer className='w-full max-w-4xl mt-16 py-8 border-t border-gray-300 text-center text-gray-600 text-sm'>
        <p>
          &copy; {new Date().getFullYear()} Rendra Tech Blog. All rights
          reserved.
        </p>
        <p>Powered by Next.js & Strapi.</p>
      </footer>
    </main>
  );
}

/** 
// 'use client';

// import Button from '@/components/Button';
// import Link from 'next/link';
// import MarkdownContent from '@/components/MarkdownContent';
import PostCard from '@/components/PostCard';
import { getPostData, getSortedPostsData } from '@/lib/posts';

export default function HomePage() {
  // const handleClick = () => {
  //   alert('Tombol diklik!');
  // };
  const allPosts = getSortedPostsData();
  const firstPost = getPostData('my-first-post');

  // return (
  //   <main className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
  //     <h1 className='text-4xl font-bold text-blue-700 mb-4'>
  //       Halo Rendra, Next.js + Tailwind Berhasil!
  //     </h1>
  //     <p className='text-lg text-gray-700 mb-8 text-center max-w-lg'>
  //       Sekarang project lu udah pakai Tailwind CSS. Siap lanjut ke materi
  //       berikutnya dengan gaya yang lebih modern!
  //     </p>
  //     <div className='flex space-x-4'>
  //       <Link
  //         href='/about'
  //         className='px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300'
  //       >
  //         Ke Halaman About
  //       </Link>
  //       <Link
  //         href='/contact'
  //         className='px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300'
  //       >
  //         Ke Halaman Kontak
  //       </Link>
  //     </div>

  //     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-4xl'>
  //       <PostCard
  //         title='Judul Post Pertama'
  //         description='Ini adalah deskripsi singkat dari post pertama yang menarik.'
  //         slug='post-pertama'
  //         imageUrl='/images/dummy-post-image.jpg'
  //       ></PostCard>
  //       <PostCard
  //         title='Judul Post Kedua'
  //         description='Deskripsi lebih panjang tentang post kedua yang membahas topik penting.'
  //         slug='post-kedua'
  //         imageUrl='/images/dummy-post-image.jpg'
  //       ></PostCard>
  //       <PostCard
  //         title='Post Ketiga Tanpa Gambar'
  //         description='Post ini tidak memiliki gambar, tapi isinya tetap insightful!'
  //         slug='post-ketiga'
  //       ></PostCard>
  //     </div>

  //     <div className='w-full max-w-4xl bg-white rounded-lg shadow-md p-8 mt-8'>
  //       <h2 className='text-3xl font-bold text-gray-800 mb-4'>
  //         Preview Markdown Content:
  //       </h2>
  //       <MarkdownContent
  //         htmlContent={firstPost.contentHtml}
  //       ></MarkdownContent>
  //     </div>

  //     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-4xl'>
  //       {allPosts.map(({ id, title, description, date }) => (
  //         <PostCard
  //           key={id}
  //           title={title}
  //           description={`${description} - ${date}`}
  //           slug={id}
  //         ></PostCard>
  //       ))}
  //     </div>
  //   </main>
  // );

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <h1 className='text-4xl font-bold text-blue-700 mb-4'>
        Selamat Datang di Blog Next.js Headless CMS!
      </h1>
      <p className='text-lg text-gray-700 mb-8 text-center max-w-lg'>
        Temukan artikel-artikel terbaru kami di bawah ini.
      </p>

      <section className='w-full max-w-4xl mt-8'>
        <h2 className='text-3xl font-semibold text-gray-800 mb-6'>
          Artikel Terbaru
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {allPosts.map(({ id, title, description, date }) => (
            <PostCard
              key={id}
              title={title}
              description={`${description} - ${date}`}
              slug={id}
              imageUrl='/images/dummy-post-image.jpg'
            ></PostCard>
          ))}
        </div>
      </section>
    </main>
  );
}
*/
