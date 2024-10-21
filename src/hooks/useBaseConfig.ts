import { useEffect, useState } from 'react';
import { BaseConfigData, getBaseConfig, getSolanaConfig } from '@/api/base';
// import { useAccount } from 'wagmi';
// import { useAccount } from '@/hooks/useWeb3';
import { SolanaConfig } from '@/types';
import { useWallet } from '@solana/wallet-adapter-react';
export const useBaseConfig = () => {
  const [baseConfig, setBaseConfig] = useState<BaseConfigData>();
  const [solanaConfig, setSolanaConfig] = useState<SolanaConfig>();
  // const { address } = useAccount();
  const { publicKey } = useWallet();
  useEffect(() => {
    // getBaseConfig().then((res) => {
    //   setBaseConfig(res.data);
    // });
    // getSolanaConfig().then((res) => {
    //   setSolanaConfig(res.data);
    // });
  }, [publicKey]);

  return {
    baseConfig,
    solanaConfig,
  };
};
