import { useEffect, useState } from 'react';
import { BaseConfigData, getBaseConfig } from '@/api/base';
// import { useAccount } from 'wagmi';
import { useAccount } from '@/hooks/useWeb3';
export const useBaseConfig = () => {
  const [baseConfig, setBaseConfig] = useState<BaseConfigData>();
  const { address } = useAccount();

  useEffect(() => {
    getBaseConfig().then((res) => {
      setBaseConfig(res.data);
    });
  }, [address]);

  return {
    baseConfig,
  };
};
