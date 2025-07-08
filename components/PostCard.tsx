import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PostCardProps {
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  description,
  slug,
  imageUrl,
}) => {
  return (
    <Link
      href={`/blog/${slug}`}
      className='block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden'
    >
      <div className='relative w-full h-48'>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{ objectFit: 'cover' }} // agar gambar ga terdistorsi
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' // optimisasi responsif
          ></Image>
        )}
      </div>
      <div className='p-5'>
        <h2 className='text-xl font-semibold text-gray-800 mb-2'>
          {title}
        </h2>
        <p className='text-gray-600 text-sm'>{description}</p>
      </div>
    </Link>
  );
};

export default PostCard;
