'use client';

// import Button from '@/components/Button';
import Link from 'next/link';
import PostCard from '@/components/PostCard';

export default function HomePage() {
  // const handleClick = () => {
  //   alert('Tombol diklik!');
  // };

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <h1 className='text-4xl font-bold text-blue-700 mb-4'>
        Halo Rendra, Next.js + Tailwind Berhasil!
      </h1>
      <p className='text-lg text-gray-700 mb-8 text-center max-w-lg'>
        Sekarang project lu udah pakai Tailwind CSS. Siap lanjut ke materi
        berikutnya dengan gaya yang lebih modern!
      </p>
      <div className='flex space-x-4'>
        <Link
          href='/about'
          className='px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300'
        >
          Ke Halaman About
        </Link>
        <Link
          href='/contact'
          className='px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300'
        >
          Ke Halaman Kontak
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-4xl'>
        <PostCard
          title='Judul Post Pertama'
          description='Ini adalah deskripsi singkat dari post pertama yang menarik.'
          slug='post-pertama'
          imageUrl='/images/dummy-post-image.jpg'
        ></PostCard>
        <PostCard
          title='Judul Post Kedua'
          description='Deskripsi lebih panjang tentang post kedua yang membahas topik penting.'
          slug='post-kedua'
          imageUrl='/images/dummy-post-image.jpg'
        ></PostCard>
        <PostCard
          title='Post Ketiga Tanpa Gambar'
          description='Post ini tidak memiliki gambar, tapi isinya tetap insightful!'
          slug='post-ketiga'
        ></PostCard>
      </div>
    </main>
  );
}
