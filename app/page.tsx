'use client';

import Button from '@/components/Button';

export default function HomePage() {
  const handleClick = () => {
    alert('Tombol diklik!');
  };

  return (
    <main>
      <h1>Halo Rendra, Project Next.js & TypeScript Berhasil</h1>
      <p>Siap lanjut ke materi berikutnya.</p>
      <div
        style={{
          marginTop: '20px',
        }}
      >
        <Button text='Klik Saya!' onClick={handleClick}></Button>
        <span style={{ marginLeft: '10px' }}></span>
        <Button
          text='Nonaktif'
          onClick={() => {}}
          disabled={true}
        ></Button>
      </div>
    </main>
  );
}
