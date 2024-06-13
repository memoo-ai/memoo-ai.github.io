import { useCallback } from 'react';
import { useAccount } from 'wagmi';
export const useLogin = () => {
  const login = useCallback(async () => {
    const { address } = useAccount();
    const msg = String(Date.now());
  }, []);

  return { login };
};
