import { FC, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
const TwitterCallback: FC = () => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    if (state === 'twitter' && code) {
      const params = {
        code,
        grantType: 'authorization_code',
        codeVerifier: 'challenge',
        refreshToken: '',
      };
    }
  }, [searchParams]);

  return <div>TwitterCallback</div>;
};
export default TwitterCallback;
