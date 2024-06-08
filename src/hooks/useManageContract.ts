/* eslint-disable max-params */
/* eslint-disable no-debugger */
import Abi from '@/contracts/abi/ugly/contracts/memoo/MemooManage.sol/MemooManage.json';
import { usePublicClient, useWalletClient, useAccount, useBalance } from 'wagmi';

import { useCallback, useEffect, useState, useMemo } from 'react';
import { config as wagmiConfig } from '@/constants/networks';
import { Contracts } from '@/contracts';
import { useBaseConfig } from './useBaseConfig';
import { Hash, getContract } from 'viem';
import { Address } from '@/types';
import BigNumber from 'bignumber.js';
import { CHAIN_ID, ZERO_ADDRESS } from '@/constants';
import { ethers } from 'ethers';
import { getProof } from '@/api/merkel-tree';

export interface MemooConfig {
  platformFeeCreateMeme: string; // "0.00005"""
  platformFeeCreateMemePayToken: string; // '0x0000000000000000000000000000000000000000';
  idoPrice: string; //  '0.00000001';
  totalSupply: string; // '0';
  idoCreatorBuyLimit: bigint;
  defaultDecimals: number;
  airdropPrice: number;
  idoUserBuyLimit: number;
  payToken: string;
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
  // const [operating, setOperating] = useState(false);
  const { baseConfig } = useBaseConfig();
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [createMemeLoading, setCreateMemeLoading] = useState(false);

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
  }, [publicClient, baseConfig, walletClient]);

  const fetchMemooConfig = useCallback(async () => {
    if (!memooConfig) return;
    try {
      const res = await memooConfig.read.memeDefaultConfig();

      return res as MemooConfig;
    } catch (error) {
      console.error(error);
    }
  }, [memooConfig]);

  const idoBuy = useCallback(
    async (project: Address, amount: BigNumber) => {
      if (!walletClient || !baseConfig || !config) return;
      if (config.payToken !== ZERO_ADDRESS) {
        // TODO approve
      }

      const tx = {
        address: baseConfig.MemooManageContract as Hash,
        abi: Abi,
        functionName: 'claim',
        args: [project, amount],
        value: amount,
      } as any;
      const hash = await walletClient.writeContract(tx);
      const res = await publicClient?.waitForTransactionReceipt({
        hash,
      });
      return res;
    },
    [walletClient, baseConfig, config],
  );

  const unlockMeme = useCallback(
    async (project: Address) => {
      if (!baseConfig || !walletClient) return;
      const tx = {
        address: baseConfig.MemooManageContract as Hash,
        abi: Abi,
        functionName: 'claim',
        args: [project],
      } as any;
      const hash = await walletClient.writeContract(tx);
      const res = await publicClient?.waitForTransactionReceipt({
        hash,
      });
      return res;
    },
    [baseConfig, walletClient],
  );

  const airdropClaim = useCallback(
    async (project: Address, claimCount: BigNumber, totalCount: BigNumber) => {
      if (!config || !baseConfig || !walletClient || !address) return;
      if (config.payToken !== ZERO_ADDRESS) {
        // TODO approve
      }

      const { data: proofRes } = await getProof(project, address);
      const priceBN = new BigNumber(config.airdropPrice).dividedToIntegerBy(10 ** config.defaultDecimals);
      const tx = {
        address: baseConfig.MemooManageContract as Hash,
        abi: Abi,
        functionName: 'claim',
        args: [project, claimCount, totalCount, claimCount.multipliedBy(priceBN), proofRes.proof],
        value: claimCount.multipliedBy(priceBN),
      } as any;
      const hash = await walletClient.writeContract(tx);
      const res = await publicClient?.waitForTransactionReceipt({
        hash,
      });
      return res;
    },
    [config, baseConfig, walletClient, address],
  );

  const createMeme = useCallback(
    // eslint-disable-next-line max-params
    async (name: string, symbol: string, preLaunchSecond: number, amount: number | string | bigint) => {
      if (!walletClient || !baseConfig || !config) return;
      if (config.memePayToken !== ZERO_ADDRESS) {
        // TODO approve
      }
      try {
        setCreateMemeLoading(true);
        const tx = {
          address: baseConfig.MemooManageContract as Hash,
          abi: Abi,
          functionName: 'createMeme',
          args: [{ name, symbol, preLaunchSecond }, amount],
          value: config.memePayToken === ZERO_ADDRESS ? amount : 0n,
        } as any;
        const hash = await walletClient.writeContract(tx);
        const res = await publicClient?.waitForTransactionReceipt({
          hash,
        });
        return res;
      } catch (e) {
      } finally {
        setCreateMemeLoading(false);
      }
    },
    [walletClient, baseConfig, config, publicClient],
  );

  useEffect(() => {
    fetchMemooConfig().then((res) => {
      console.log(res);
      setConfig(res);
    });
  }, [memooConfig, publicClient]);

  return {
    config,
    fetchMemooConfig,
    idoBuy,
    unlockMeme,
    airdropClaim,
    createMeme,
    createMemeLoading,
  };
};
