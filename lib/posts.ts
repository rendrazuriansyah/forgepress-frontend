import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // buat baca front-matter
import { remark } from 'remark'; // core remark
import html from 'remark-html'; // untuk markdown ke html
import gfm from 'remark-gfm'; // github flavored markdown
import rehypeHighlight from 'rehype-highlight'; // code highlighting

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // menggunakan gray-matter untuk parse the post metada section
  const matterResult = matter(fileContents);

  // mengubah markdown menjadi string html
  const processedContent = remark()
    .use(html, { sanitize: false })
    .use(gfm)
    .use(rehypeHighlight)
    .processSync(matterResult.content);

  const contentHtml = processedContent.toString();

  // menggabungkan data dengan id dan contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as {
      title: string;
      date: string;
      author: string;
      description: string;
    }),
  };
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      ...(matterResult.data as {
        title: string;
        date: string;
        author: string;
        description: string;
      }),
    };
  });
  // sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
