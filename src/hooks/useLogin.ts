import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { login } from '@/api/login';
import { useSign } from '@/hooks/useEthers';

export const useLogin = () => {
  const { getSign } = useSign();
  const { address } = useAccount();
  const loginMeme = useCallback(async () => {
    const data = await getSign();
    console.log('getSign:', data);
    if (address && data) {
      const result = await login({
        address: address,
        message: data.msg,
        signature: data.rawSignature,
      });
      console.log(result);
      localStorage.setItem('meme-token', result.data.token);
    }
  }, [address]);

  return { loginMeme };
};
