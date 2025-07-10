import { remark } from 'remark'; // core remark
import html from 'remark-html'; // untuk markdown ke html
import gfm from 'remark-gfm'; // github flavored markdown
import rehypeHighlight from 'rehype-highlight'; // code highlighting

// --- Strapi v5 ---

// Mengisolasi struktur format gambar agar lebih rapi dan reusable.
// Di v4, definisi format ini diulang-ulang di dalam StrapiImageAttributes.
interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

// StrapiImageData di v5 langsung mengandung semua atribut gambar utama,
// termasuk 'id' dan 'documentId', yang di v4 masih terpisah di StrapiImageData dan StrapiImageAttributes.
// Ini menyederhanakan struktur data untuk gambar.
interface StrapiImageData {
  id: number; // 'id' sekarang langsung ada di level ini, tidak lagi di wrapper 'data' terpisah.
  documentId: string; // 'documentId' juga naik level.

  url: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  previewUrl: string | null;
  provider: string;
  provider_metadata: Record<string, unknown> | null; // Tipe lebih spesifik untuk metadata provider.
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CategoryAttributes {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostAttributes {
  id: number; // 'id' dan 'documentId' untuk Post juga langsung ada di sini di v5.
  documentId: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  publishedAt: string;
  author: string;
  // Perubahan paling signifikan: 'coverImage' tidak lagi dibungkus oleh '{ data: ... }'.
  // Langsung me-refer ke StrapiImageData atau null.
  coverImage: StrapiImageData | null;
  categories: StrapiResponseDataItem<CategoryAttributes>[];
  createdAt: string;
  updatedAt: string;
}

// Type utility untuk data item di respons Strapi.
// Di v5, jika objek sudah punya 'id' dan 'documentId' (seperti PostAttributes yang baru),
// maka 'StrapiResponseDataItem<T>' cukup berupa 'T' itu sendiri.
// Ini mengimplikasikan bahwa 'id' dan 'documentId' sekarang merupakan bagian dari atribut utama.
type StrapiResponseDataItem<T> = T & {
  id: number;
  documentId: string;
};

// Struktur respons API secara umum relatif sama, hanya saja `data` sekarang
// langsung berisi array dari `StrapiResponseDataItem<T>` yang sudah termasuk `id` dan `documentId`.
interface StrapiResponse<T> {
  data: StrapiResponseDataItem<T>[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiSingleResponse<T> {
  data: StrapiResponseDataItem<T> | null;
  meta: Record<string, unknown>;
}

export interface AboutPageAttributes {
  title: string;
  content: string;
  coverImage: StrapiImageData | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const STRAPI_API_URL =
  process.env.STRAPI_API_URL || 'http://localhost:1337';

export async function markdownToHtml(
  markdownContent: string,
): Promise<string> {
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .use(gfm)
    .use(rehypeHighlight)
    .process(markdownContent);
  return processedContent.toString();
}

export async function getStrapiPosts(): Promise<PostAttributes[]> {
  // Return type berubah, langsung `PostAttributes[]`
  const res = await fetch(
    `${STRAPI_API_URL}/api/posts?populate=coverImage`,
    {
      next: {
        // revalidate: 60, // time based revalidation (ISR)
        tags: ['posts'], // on demand revalidation
      },
    },
  );
  if (!res.ok) {
    console.error(
      'Failed to fetch posts from Strapi:',
      res.status,
      res.statusText,
    );
  }

  const data: StrapiResponse<PostAttributes> = await res.json();
  // Di v5, `data.data` sudah langsung array `PostAttributes` dengan `id` dan `documentId` di dalamnya.
  // Tidak perlu lagi mengambil `attributes` dari setiap item `data`.
  return data.data;
}

export async function getStrapiPostBySlug(
  slug: string,
): Promise<PostAttributes | null> {
  // Return type juga berubah, langsung `PostAttributes`
  const res = await fetch(
    `${STRAPI_API_URL}/api/posts?filters[slug][$eq]=${slug}&populate=coverImage`,
    {
      next: {
        tags: ['posts', `post-${slug}`],
      },
    },
  );
  if (!res.ok) {
    console.error(
      `Failed to fetch post with slug ${slug} from Strapi:`,
      res.status,
      res.statusText,
    );
    return null;
  }

  const data: StrapiResponse<PostAttributes> = await res.json();

  if (data.data && data.data.length > 0) {
    data.data[0].content = await markdownToHtml(data.data[0].content); // proses content jadi html
    return data.data[0]; // Langsung ke item pertama, tidak perlu .attributes lagi.
  }
  return null;
}

// mengambil semua kategori
export async function getStrapiCategories(): Promise<
  StrapiResponseDataItem<CategoryAttributes>[]
> {
  const res = await fetch(`${STRAPI_API_URL}/api/categories`);
  if (!res.ok) {
    console.error(
      'Failed to fetch categories from Strapi:',
      res.status,
      res.statusText,
    );
    throw new Error('Failed to fecth categories');
  }
  const data: StrapiResponse<CategoryAttributes> = await res.json();
  return data.data;
}

// mengambil post berdasarkan slug kategori
export async function getStrapiPostsByCategorySlug(
  categorySlug: string,
): Promise<StrapiResponseDataItem<PostAttributes>[]> {
  const res = await fetch(
    `${STRAPI_API_URL}/api/posts?filters[categories][slug][$eq]=${categorySlug}&populate=coverImage&populate=categories`,
  );
  if (!res.ok) {
    console.error(
      `Failed to fetch posts for category ${categorySlug} from Strapi:`,
      res.status,
      res.statusText,
    );
    throw new Error('Failed to fetch posts by category');
  }
  const data: StrapiResponse<PostAttributes> = await res.json();
  return data.data;
}

export async function getStrapiAboutPage(): Promise<StrapiResponseDataItem<AboutPageAttributes> | null> {
  const res = await fetch(
    `${STRAPI_API_URL}/api/about-page?populate=coverImage`,
  );
  if (!res.ok) {
    console.error(
      'Failed to fetch About Page from Strapi:',
      res.status,
      res.statusText,
    );
    return null;
  }
  const data: StrapiSingleResponse<AboutPageAttributes> = await res.json();
  return data.data;
}
