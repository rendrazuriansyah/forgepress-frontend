import { getPostData, getAllPostIds } from '@/lib/posts';
import MarkdownContent from '@/components/MarkdownContent';
import ShareLinkButton from '@/components/ShareLinkButton';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// fungsi untuk generate metadata dinamis
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug);
  return {
    title: postData.title,
    description: postData.description,
    openGraph: {
      title: postData.title,
      description: postData.description,
      // url: `http://nextjs-headless-cms-manual.vercel.app/blog/${params.slog}`,
      url: `http://localhost:3000/blog/${slug}`,
      type: 'article',
      publishedTime: postData.date,
      authors: [postData.author],
      // tags: postData.tags, // belum ada plan untuk implementasi tags dinamis
    },
  };
}

// fungsi untuk menghasilkan semua path dinamis yang mungkin (Static Params)
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

// komponen halaman detail post
export default async function Post({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const postData = await getPostData(slug); // mengambil data post berdasarkan slug (id)
  // const currentPostLink = `http://nextjs-headless-cms-manual.vercel.app/blog/${slug}`;
  const currentPostLink = `http://localhost:3000/blog/${slug}`;

  return (
    <main className='container mx-auto px-4 py-8 max-w-2xl'>
      <h1 className='text-4xl font-bold text-gray-900 mb-4'>
        {postData.title}
      </h1>
      <p className='text-gray-600 text-sm mb-6'>
        Ditulis oleh {postData.author} pada {postData.date}
      </p>

      <div className='mb-6'>
        <ShareLinkButton link={currentPostLink}></ShareLinkButton>
      </div>

      <article className='prose prose-lg max-w-none'>
        <MarkdownContent
          htmlContent={postData.contentHtml}
        ></MarkdownContent>
      </article>
    </main>
  );
}
