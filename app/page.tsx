'use client';

// import Button from '@/components/Button';
import Link from 'next/link';

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
    </main>
  );
}
