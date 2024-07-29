import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { login } from '@/api/login';
import { useSign } from '@/hooks/useEthers';
import { useSolana } from '@/hooks/useSolana';
import { MEMOO_TOKEN_STORAGE } from '@/constants';
import { useWallet } from '@solana/wallet-adapter-react';
export const useLogin = () => {
  const { getSign } = useSolana();
  const { publicKey } = useWallet();
  const loginMeme = useCallback(async () => {
    console.log('loginMeme');
    const data = await getSign();
    console.log('getSign:', data);
    if (publicKey && data) {
      const result = await login({
        address: publicKey,
        message: data.msg,
        signature: data.rawSignature.signature.toString('base64'),
        chain: 'Solana',
      });
      console.log(result);
      localStorage.setItem(MEMOO_TOKEN_STORAGE, result.data.token);
    }
  }, [publicKey, getSign]);

  return { loginMeme };
};
