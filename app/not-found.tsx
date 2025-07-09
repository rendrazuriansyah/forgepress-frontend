import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <h1 className='text-6xl font-bold text-red-600 mb-4'>404</h1>
      <h2 className='text-3xl font-semibold text-gray-800 mb-6'>
        Halaman Tidak Ditemukan
      </h2>
      <p className='text-lg text-gray-700 mb-8'>
        Maaf, kami tidak bisa menemukan halaman yang Anda cari.
      </p>
      <Link
        href='/'
        className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
