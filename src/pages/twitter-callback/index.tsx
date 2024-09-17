import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const TwitterCallback: FC = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (state === 'twitter' && code) {
      const params = {
        code,
        state,
      };
      if (window.opener) {
        window.opener.postMessage(params, '*');
      }
      window.close();
    }
  }, [searchParams]);

  return <div>TwitterCallback</div>;
};

export default TwitterCallback;
