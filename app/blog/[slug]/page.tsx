import { getPostData, getAllPostIds } from '@/lib/posts';
import MarkdownContent from '@/components/MarkdownContent';
import type { Metadata } from 'next';

// fungsi untuk generate metadata dinamis
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const postData = getPostData(params.slug);
  return {
    title: postData.title,
    description: postData.description,
  };
}

// fungsi untuk menghasilkan semua path dinamis yang mungkin (Static Params)
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

// komponen halaman detail post
export default function Post({ params }: { params: { slug: string } }) {
  const postData = getPostData(params.slug); // mengambil data post berdasarkan slug (id)

  return (
    <main className='container mx-auto px-4 py-8 max-w-2xl'>
      <h1 className='text-4xl font-bold text-gray-900 mb-4'>
        {postData.title}
      </h1>
      <p className='text-gray-600 mb-6'>
        Ditulis oleh {postData.author} pada {postData.date}
      </p>
      <article className='prose prose-lg max-w-none'>
        <MarkdownContent
          htmlContent={postData.contentHtml}
        ></MarkdownContent>
      </article>
    </main>
  );
}
