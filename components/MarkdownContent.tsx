import React from 'react';

interface MarkdownContentProps {
  htmlContent: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({
  htmlContent,
}) => {
  // dangerouslySetInnerHTML ini perlu hati-hati kalau sumbernya dari user input
  // PASTIKAN kontennya sudah disanitasi atau dari sumber terpercaya (CMS)
  return (
    <div
      className='prose prose-lg max-w-none' // tailwind typhography classes
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    ></div>
  );
};

export default MarkdownContent;
