import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { login } from '@/api/login';
import { useSign } from '@/hooks/useEthers';
import { usePhantom } from '@/hooks/useSolana';
import { MEMOO_TOKEN_STORAGE } from '@/constants';
import { useWallet } from '@solana/wallet-adapter-react';
export const useLogin = () => {
  const { getSign, pubKey: address } = usePhantom();
  const loginMeme = useCallback(async () => {
    console.log('loginMeme');
    const data = await getSign();
    console.log('getSign:', data);
    if (address && data) {
      const result = await login({
        address: address,
        message: data.msg,
        signature: data.rawSignature.signature.toString('base64'),
        chain: 'Solana',
      });
      console.log(result);
      localStorage.setItem(MEMOO_TOKEN_STORAGE, result.data.token);
    }
  }, [address, getSign]);

  return { loginMeme };
};
