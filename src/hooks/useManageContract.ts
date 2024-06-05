/* eslint-disable no-debugger */
import Abi from '@/contracts/ugly/contracts/memoo/MemooManage.sol/MemooManage.json';
import { MemooManage, MemooManageStructs } from '@/contracts/typechain-types/contracts/memoo/MemooManage';
import { usePublicClient, useWalletClient, useAccount, useBalance } from 'wagmi';

import { useCallback, useEffect, useState, useMemo } from 'react';
import { config as wagmiConfig } from '@/constants/networks';
import { Contracts } from '@/contracts';
import { useBaseConfig } from './useBaseConfig';
import { Hash, getContract } from 'viem';
import { Address } from '@/types';
import BigNumber from 'bignumber.js';

export interface MemooConfig {
  platformFeeCreateMeme: string; // "0.00005"""
  platformFeeCreateMemePayToken: string; // '0x0000000000000000000000000000000000000000';
  memeIdoPrice: string; //  '0.00000001';
  memeTotalSupply: string; // '0';
  idoCreatorBuyLimit: bigint;
  memeDefaultDecimals: number;
  allocation: {
    airdrop: bigint;
    creator: bigint;
    ido: bigint;
    lp: bigint;
    platform: bigint;
  };
}

export const useManageContract = () => {
  const [config, setConfig] = useState<MemooConfig>();
  const publicClient = usePublicClient({ config: wagmiConfig });
  const { baseConfig } = useBaseConfig();
  const { data: walletClient } = useWalletClient();

  const memooConfig = useMemo(() => {
    if (!publicClient || !baseConfig) {
      return;
    }
    return getContract({
      address: baseConfig.MemooManageContract as Hash,
      abi: Abi,
      client: {
        public: publicClient,
        wallet: walletClient,
      },
    });
  }, [publicClient, baseConfig]);

  const fetchMemooConfig = useCallback(async () => {
    if (!memooConfig) return;
    try {
      const res = await memooConfig.read.getMemooConfig();

      return res as MemooConfig;
    } catch (error) {
      console.error(error);
    }
  }, [memooConfig]);

  const idoBuy = useCallback(
    async (address: Address, amount: BigNumber) => {
      if (!memooConfig) return;
      try {
        const res = await memooConfig.read.idoBuy([address, amount]);

        return res;
      } catch (error) {
        console.error(error);
      }
    },
    [memooConfig],
  );

  useEffect(() => {
    fetchMemooConfig().then((res) => {
      console.log(res);
      setConfig(res);
    });
  }, [memooConfig]);

  return {
    config,
    fetchMemooConfig,
    idoBuy,
  };
};
