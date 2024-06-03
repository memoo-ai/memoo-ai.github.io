import { useEffect, useState } from 'react';
import { BaseConfigData, getBaseConfig } from '@/api/base';

export const useBaseConfig = () => {
  const [baseConfig, setBaseConfig] = useState<BaseConfigData>();

  useEffect(() => {
    getBaseConfig().then((res) => {
      setBaseConfig(res.data);
    });
  }, []);

  return {
    baseConfig,
  };
};
