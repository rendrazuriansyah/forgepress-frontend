import React from 'react';
import Link from 'next/link';

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
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className='w-full h-48 object-cover'
        />
      )}
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
