import PostCard from '@/components/PostCard';
import { getStrapiPosts, PostAttributes } from '@/lib/strapi-v5';

export default async function HomePage() {
  const strapiPosts = await getStrapiPosts();

  // map data Strapi ke format yang bisa diterima PostCard
  const posts = strapiPosts.map((item) => ({
    id: item.id.toString(), // ID Strapi
    title: item.title,
    description: item.description,
    slug: item.slug,
    // URL gambar dari Strapi perlu digabung dengan base URL Strapi
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

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <h1 className='text-4xl font-bold text-blue-700 mb-4'>
        Selamat Datang di Blog Next.js (dari Strapi)!
      </h1>
      <p className='text=lg text-gray-700 mb-8 text-center max-w-lg'>
        Artikel terbaru kami, disajikan langsung dari Headless CMS Strapi!.
      </p>

      <section className='w-full max-w-4xl mt-8'>
        <h2 className='text-3xl font-semibold text-gray-800 mb-6'>
          Artikel Terbaru
        </h2>
        {posts.length === 0 ? (
          <p className='text-center text-gray-600'>
            Belum ada post dari Strapi. Pastikan Strapi jalan & post sudah
            di-publish
          </p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                description={`${post.description} - ${post.date}`}
                slug={post.slug}
                imageUrl={post.imageUrl}
              ></PostCard>
            ))}
          </div>
        )}
      </section>
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
