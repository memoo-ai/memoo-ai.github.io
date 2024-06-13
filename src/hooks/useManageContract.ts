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

export interface DefaultMemooConfig {
  payToken: string;
  idoPrice: bigint;
  airdropPrice: bigint;
  totalSupply: bigint;
  defaultDecimals: number;
  idoUserBuyLimit: bigint;
}

export interface MemooConfig {
  platformFeeCreateMeme: bigint; // "0.00005"""
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
  const [defaultConfig, setDefaultConfig] = useState<DefaultMemooConfig>();
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

  const getDefaultMemooConfig = useCallback(async () => {
    if (!memooConfig) return;
    try {
      const res = (await memooConfig.read.memeDefaultConfig()) as any;
      const data = {
        payToken: res[0],
        idoPrice: res[1],
        airdropPrice: res[2],
        totalSupply: res[3],
        defaultDecimals: res[4],
        idoUserBuyLimit: res[5],
      };
      return data as DefaultMemooConfig;
    } catch (error) {
      console.error(error);
    }
  }, [memooConfig]);

  const fetchMemooConfig = useCallback(async () => {
    if (!memooConfig) return;
    try {
      const res = (await memooConfig.read.getMemooConfig()) as any;
      return res as MemooConfig;
    } catch (error) {
      console.error(error);
    }
  }, [memooConfig]);

  const idoBuy = useCallback(
    async (project: Address, amount: BigNumber) => {
      if (!walletClient || !baseConfig || !config || !defaultConfig) return;
      if (defaultConfig.payToken !== ZERO_ADDRESS) {
        // TODO approve
      }

      const tx = {
        address: baseConfig.MemooManageContract as Hash,
        abi: Abi,
        functionName: 'idoBuy',
        args: [project, amount.multipliedBy(10 ** defaultConfig.defaultDecimals)],
        value: amount.multipliedBy(10 ** defaultConfig.defaultDecimals),
      } as any;
      console.log('idoBuy tx', tx);
      const hash = await walletClient.writeContract(tx);
      console.log('idoBuy hash', hash);
      const receipt = await publicClient?.waitForTransactionReceipt({
        hash,
      });
      console.log('idoBuy receipt', receipt);
      return receipt;
    },
    [walletClient, baseConfig, config, defaultConfig],
  );

  const unlockMeme = useCallback(
    async (project: Address, index: number) => {
      if (!baseConfig || !walletClient) return;
      const tx = {
        address: baseConfig.MemooManageContract as Hash,
        abi: Abi,
        functionName: 'unlockMeme',
        args: [project, index],
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
      if (!config || !baseConfig || !walletClient || !address || !defaultConfig) return;
      if (defaultConfig.payToken !== ZERO_ADDRESS) {
        // TODO approve
      }

      const { data: proofRes } = await getProof(project, address);
      const priceBN = new BigNumber(config.airdropPrice).dividedToIntegerBy(10 ** config.defaultDecimals);
      const tx = {
        address: baseConfig.MemooManageContract as Hash,
        abi: Abi,
        functionName: 'airdropClaim',
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
      if (!walletClient || !baseConfig || !defaultConfig) return;
      if (defaultConfig.payToken !== ZERO_ADDRESS) {
        // TODO approve
      }
      try {
        setCreateMemeLoading(true);
        const tx = {
          address: baseConfig.MemooManageContract as Hash,
          abi: Abi,
          functionName: 'createMeme',
          args: [{ name, symbol, preLaunchSecond }, amount],
          value: defaultConfig.payToken === ZERO_ADDRESS ? amount : 0n,
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
    [walletClient, baseConfig, defaultConfig, publicClient],
  );

  useEffect(() => {
    fetchMemooConfig().then((res) => {
      if (res) {
        console.log('config', res);
        setConfig(res);
      }
    });
    getDefaultMemooConfig().then((res) => {
      if (res) {
        console.log('defaultConfig', res);
        setDefaultConfig(res);
      }
    });
  }, [fetchMemooConfig, getDefaultMemooConfig]);

  const getCanUnlockCount = useCallback(
    async (project: Address, account: Address, stageIndex: 0 | 1) => {
      if (!memooConfig) return;
      try {
        const res = await memooConfig.read.getCanUnlockCount([project, account, stageIndex]);
        return res;
      } catch (error) {
        console.error(error);
      }
    },
    [memooConfig],
  );

  const memeUnlockPeriods = useCallback(
    async (stageIndex: 0 | 1) => {
      if (!memooConfig) return;
      try {
        const res = (await memooConfig.read.memeUnlockPeriods([stageIndex])) as any;
        return {
          index: res[0],
          periodType: res[1],
          value: res[2],
          unlockRate: res[3],
        };
      } catch (error) {
        console.error(error);
      }
    },
    [memooConfig],
  );

  return {
    config,
    defaultConfig,
    fetchMemooConfig,
    getDefaultMemooConfig,
    idoBuy,
    unlockMeme,
    memeUnlockPeriods,
    airdropClaim,
    createMeme,
    createMemeLoading,
    getCanUnlockCount,
  };
};
