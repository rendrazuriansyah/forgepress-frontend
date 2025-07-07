'use client';

import React, { useState } from 'react';

interface ShareLinkButtonProps {
  link: string;
}

const ShareLinkButton: React.FC<ShareLinkButtonProps> = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Gagal menyalin link: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 flex items-center space-x-2'
    >
      {/* ini bisa diganti icon share atau copy */}
      {copied ? (
        <>
          <span>Tersalin!</span>
          {/* <CheckIcon className="h-5 w-5"></CheckIcon> contoh icon */}
        </>
      ) : (
        <>
          <span>Salin Link</span>
          {/* <LinkIcon className="h-5 w-5"></LinkIcon> contoh icon */}
        </>
      )}
    </button>
  );
};

export default ShareLinkButton;
