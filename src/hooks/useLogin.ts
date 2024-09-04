import { useCallback } from 'react';
// import { useAccount } from 'wagmi';
import { useAccount } from '@/hooks/useWeb3';
import { login } from '@/api/login';
import { useSign } from '@/hooks/useEthers';
import { useSolana } from '@/hooks/useSolana';
import { MEMOO_TOKEN_STORAGE } from '@/constants';
import { useWallet } from '@solana/wallet-adapter-react';
export const useLogin = () => {
  const { getSign } = useSolana();
  const { address } = useAccount();

  const loginMeme = useCallback(async () => {
    console.log('loginMeme');
    const data = await getSign();
    console.log('getSign:', data);
    if (address && data) {
      const result = await login({
        address: address,
        message: data.msg,
        // signature: data.rawSignature.signature.toString('base64'),
        signature: data.rawSignature,
        // signature: data.rawSignature.toString(),
        chain: 'Solana',
      });
      console.log(result);
      localStorage.setItem(MEMOO_TOKEN_STORAGE, result.data.token);
    }
  }, [address, getSign]);

  return { loginMeme };
};
