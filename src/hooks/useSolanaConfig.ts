import { useEffect, useState } from 'react';
import { getSolanaConfig } from '@/api/base';
// import { useAccount } from 'wagmi';
import { useAccount } from '@/hooks/useWeb3';
import { SolanaConfig } from '@/types';
import { useWallet } from '@solana/wallet-adapter-react';
export const useSolanaConfig = () => {
  const [solanaConfig, setSolanaConfig] = useState<SolanaConfig>();
  const { publicKey } = useWallet();

  useEffect(() => {
    getSolanaConfig().then((res) => {
      setSolanaConfig(res.data);
    });
  }, [publicKey]);

  return {
    solanaConfig,
  };
};
