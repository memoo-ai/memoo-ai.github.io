import Abi from '@/contracts/abi/ugly/contracts/memoo/MemeFactory.sol/MemeFactory.json';

import { usePublicClient, useWalletClient, useAccount, useBalance } from 'wagmi';
import { useBaseConfig } from './useBaseConfig';
import { CHAIN_ID, ZERO_ADDRESS } from '@/constants';

import { useCallback, useEffect, useState, useMemo } from 'react';
import { config as wagmiConfig } from '@/constants/networks';
import { Hash } from 'viem';

export const useMemeFactoryContract = () => {
  const publicClient = usePublicClient({ config: wagmiConfig });
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { baseConfig } = useBaseConfig();
  const getMemeAddressWithSymbol = useCallback(
    async (symbol: string) => {
      if (!baseConfig || !publicClient) {
        return;
      }
      const res = await publicClient?.readContract({
        address: baseConfig.MemeFactoryContract as Hash,
        abi: Abi,
        functionName: 'getMemeAddress',
        args: [symbol],
      });
      console.log('res: ', res);
      return res;
    },
    [baseConfig, publicClient],
  );

  return {
    getMemeAddressWithSymbol,
  };
};
