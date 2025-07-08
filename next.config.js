/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'nextjs-headless-cms-manual.vercel.app',
    ],
  },
};
module.exports = nextConfig;

// === CONFIG BUILD STATIC EXPORT ===
// next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   images: {
//     unoptimized: true, // WAJIB kalau static export, karena optimasi Image komponen butuh server.
//   },
//   // ... jika ada config lain seperti domains di images
// };
// module.exports = nextConfig;
