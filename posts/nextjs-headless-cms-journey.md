---
title: Membangun Headless CMS Blog dengan Next.js dan Markdown
date: '2025-07-08'
author: Rendra
description: Mengulas perjalanan dan fitur utama dalam membangun blog berbasis Headless CMS dengan Next.js, Markdown, dan optimasi SEO.
tags:
  - Next.js
  - Headless CMS
  - Markdown
  - SEO
  - Fullstack
  - Frontend
  - Project Showcase
---

# Membangun Headless CMS Blog Pake Next.js: Dari Nol Sampai Siap Publikasi

Halo semua! Kali ini gua mau share progress dari proyek terbaru gua, sebuah blog yang dibangun pake **Next.js** dan konsep **Headless CMS** sederhana menggunakan file Markdown. Kenapa Next.js? Karena framework ini powerful banget buat bikin aplikasi React yang SEO-friendly dan performanya top.

---

## Latar Belakang & Tujuan Proyek

Proyek ini gua bikin sebagai bagian dari persiapan magang, sekaligus eksplorasi cara kerja **Headless CMS** tanpa database yang ribet. Ide utamanya adalah punya platform blog yang gampang di-manage, tinggal tulis postingan dalam format Markdown, push ke GitHub, dan otomatis ke-deploy. Simple, efisien, dan cocok banget buat share pengalaman atau artikel teknis.

---

## Fitur Keren yang Udah Ada (Timeline Commit)

Dari commit history di GitHub, lo bisa liat gimana proyek ini berkembang. Ini highlight fitur-fitur pentingnya:

- **Inisialisasi Next.js & App Router (`Jul 5, 2025`)**:

  - Proyek dimulai dengan setup dasar Next.js pakai **App Router** terbaru. Ini fondasi yang solid banget.
  - Konfigurasi **TypeScript** juga udah siap dari awal buat coding yang lebih aman dan terstruktur.

- **Styling Modern dengan Tailwind CSS (`Jul 6, 2025`)**:

  - Integrasi **Tailwind CSS** bikin proses styling jadi super cepat dan konsisten. Goodbye, ngoprek CSS manual!
  - Homepage dan komponen kayak `Button` langsung dibikin biar pake Tailwind classes.

- **Basic Pages & Navigation (`Jul 6, 2025`)**:

  - Udah ada halaman dasar kayak `About` dan `Contact`.
  - **Navigation bar** global juga udah dibikin, jadi user bisa gampang navigasi keliling situs.

- **Markdown-Powered Blog System (`Jul 6 & 8, 2025`)**:

  - Ini inti dari Headless CMS-nya! Gua implementasi **parsing Markdown** jadi HTML.
  - Pake library kayak `gray-matter`, `remark`, `rehype-highlight`, `remark-gfm` biar Markdown bisa di-render mulus, bahkan **code block** pun cantik dengan syntax highlighting!
  - **PostCard Component**: Komponen reusable buat nampilin preview postingan di homepage.
  - **Dynamic Post Detail Page**: Setiap postingan Markdown punya halamannya sendiri ([slug].tsx), lengkap dengan **metadata dinamis** (judul, deskripsi) yang diambil dari front matter Markdown. Ini penting buat SEO!
  - Homepage juga udah di-refactor buat nampilin semua postingan yang udah di-sort.

- **SEO & Sharing Maksimal (`Jul 8, 2025`)**:

  - Implementasi **Open Graph Metadata** (OGP) buat setiap blog post. Jadi pas di-share ke medsos, preview-nya bagus!
  - Metadata global juga di-enhance buat **Twitter Cards** dan **Favicons**.
  - Ada komponen **`ShareLinkButton`** biar pembaca bisa langsung share postingan. Praktis!
  - File penting buat indexing kayak `robots.txt` dan `sitemap.xml` juga udah disiapin.

- **Image Optimization dengan `next/image` (`Jul 8, 2025`)**:
  - Tag `<img>` biasa diganti ke komponen **`next/image`**. Ini fitur killer dari Next.js!
  - **Image optimization otomatis, lazy loading, dan responsive sizing** langsung aktif. Situs jadi lebih cepat dan hemat bandwidth, apalagi buat user dengan koneksi pas-pasan.

---

## Tech Stack & Pilihan Teknologi

- **Frontend**: Next.js (React.js), TypeScript/JavaScript
- **Styling**: Tailwind CSS
- **Markdown Processing**: `gray-matter`, `remark`, `rehype-highlight`, `remark-gfm`
- **Deployment**: Vercel (karena integrasinya seamless dengan Next.js)

Gua sengaja fokus ke Next.js karena sesuai dengan preferensi stack frontend gua (Vite + React.js + TS/JS), plus benefit performa dan SEO yang Next.js kasih itu nggak ada duanya buat project kayak gini.

---

## Tantangan & Pembelajaran

Salah satu tantangan utama adalah memahami **Next.js App Router** dan bagaimana cara terbaik untuk **data fetching** serta **rendering Markdown secara statis** di sisi server. Memastikan **SEO metadata dinamis** bekerja dengan baik untuk setiap post juga butuh trial and error.

Dari proyek ini, gua belajar banyak tentang:

- Struktur proyek Next.js dengan App Router.
- Pentingnya optimasi gambar dan SEO untuk web performa tinggi.
- Fleksibilitas Headless CMS, bahkan dengan solusi yang sederhana seperti Markdown file.

---

## Next Step & Harapan

Proyek ini akan terus gua kembangin. Mungkin nanti bakal ada fitur komen, atau integrasi dengan backend API beneran (Node.js + MongoDB/SQLite) kalau kebutuhan datanya makin kompleks.

Jangan lupa cek kode lengkapnya di GitHub gua:
[rendrazuriansyah/nextjs-headless-cms-manual](https://github.com/rendrazuriansyah/nextjs-headless-cms-manual)

Semoga postingan ini bisa kasih gambaran gimana powerful-nya Next.js buat bikin blog yang performanya oke dan gampang di-maintain! Kalau ada pertanyaan atau ide, yuk diskusi di kolom komentar (kalau nanti udah ada fitur komennya ya, hehe).

---
