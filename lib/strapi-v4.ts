// --- Strapi v4 ---

interface StrapiImageAttributes {
  url: string;
  name: string;

  // optional properties
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: {
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
    };
    small?: {
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
    };
    medium?: {
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
    };
    large?: {
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
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId: string;
}

interface StrapiImageData {
  id: number;
  attributes: StrapiImageAttributes;
}

export interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  content: string;
  publishedAt: string;
  author: string;
  coverImage: {
    data: StrapiImageData | null;
  };
  createdAt: string;
  updatedAt: string;
}

interface StrapiResponseDataItem<T> {
  id: number;
  attributes: T;
}

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

const STRAPI_API_URL =
  process.env.STRAPI_API_URL || 'http://localhost:1337';

export async function getStrapiPosts(): Promise<
  StrapiResponseDataItem<PostAttributes>[]
> {
  // populate coverImage biar dapat URL gambar
  const res = await fetch(
    `${STRAPI_API_URL}/api/posts?populate=coverImage`,
  );
  if (!res.ok) {
    console.error(
      'Failed to fetch posts from Strapi:',
      res.status,
      res.statusText,
    );
  }
  const data: StrapiResponse<PostAttributes> = await res.json();
  return data.data;
}

export async function getStrapiPostBySlug(
  slug: string,
): Promise<StrapiResponseDataItem<PostAttributes> | null> {
  // filter berdasarkan slug dan populate coverImage
  const res = await fetch(
    `${STRAPI_API_URL}/api/posts?filters[slug][$eq]=${slug}&populate=coverImage`,
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
  return data.data[0] || null; // ambil item pertama atau null jika tidak ditemukan
}
