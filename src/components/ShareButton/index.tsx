import React, { ReactNode } from 'react';

interface TwitterShareButtonProps {
  text: string;
  imageUrl: string;
  url: string;
  title: string;
  description: string;
  children: ReactNode;
}

const TwitterShareButton: React.FC<TwitterShareButtonProps> = ({
  text,
  imageUrl,
  url,
  title,
  description,
  children,
}) => {
  const shareUrl = new URL('https://twitter.com/intent/tweet');

  const sharePageUrl = new URL('/share', window.location.origin);
  sharePageUrl.searchParams.append('image', imageUrl);
  sharePageUrl.searchParams.append('title', title);
  sharePageUrl.searchParams.append('description', description);
  sharePageUrl.searchParams.append('url', url);

  shareUrl.searchParams.append('text', text);
  shareUrl.searchParams.append('url', sharePageUrl.toString());

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(shareUrl.toString(), '_blank', 'width=550,height=420');
  };

  return <button onClick={handleShare}>{children}</button>;
};

export default TwitterShareButton;
