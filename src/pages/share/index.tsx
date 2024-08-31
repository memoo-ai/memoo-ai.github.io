import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const SharePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const title = searchParams.get('title') || '';
    const description = searchParams.get('description') || '';
    const image = searchParams.get('image') || '';
    const url = searchParams.get('url') || '/';

    const updateMetaTag = (selector: string, content: string) => {
      let element = document.querySelector(selector);
      if (!(element instanceof HTMLMetaElement)) {
        element = document.createElement('meta');
        document.head.appendChild(element);
      }
      (element as HTMLMetaElement).setAttribute('name', selector.match(/name="([^"]*)"/)![1]);
      (element as HTMLMetaElement).setAttribute('content', content);
    };

    try {
      updateMetaTag('meta[name="twitter:card"]', 'summary_large_image');
      updateMetaTag('meta[name="twitter:title"]', title);
      updateMetaTag('meta[name="twitter:description"]', description);
      updateMetaTag('meta[name="twitter:image"]', image);
      updateMetaTag('meta[property="og:url"]', url);

      const timer = setTimeout(() => {
        navigate(url);
      }, 1000);

      return () => clearTimeout(timer);
    } catch (err) {
      console.error('Error updating meta tags:', err);
      setError('An error occurred while preparing to share. Please try again.');
    }
  }, [searchParams, navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>Preparing to share...</div>;
};

export default SharePage;
