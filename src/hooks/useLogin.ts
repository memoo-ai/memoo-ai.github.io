import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { login } from '@/api/login';
import { useSign } from '@/hooks/useEthers';
import { MEMOO_TOKEN_STORAGE } from '@/constants';
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
      localStorage.setItem(MEMOO_TOKEN_STORAGE, result.data.token);
    }
  }, [address, getSign]);

  return { loginMeme };
};
