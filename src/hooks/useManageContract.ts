/* eslint-disable max-params */
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
import { CHAIN_ID, ZERO_ADDRESS } from '@/constants';
import { ethers } from 'ethers';
import { getProof } from '@/api/merkel-tree';

export interface MemooConfig {
  platformFeeCreateMeme: string; // "0.00005"""
  platformFeeCreateMemePayToken: string; // '0x0000000000000000000000000000000000000000';
  memeIdoPrice: string; //  '0.00000001';
  memeTotalSupply: string; // '0';
  idoCreatorBuyLimit: bigint;
  memeDefaultDecimals: number;
  memeAirdropPrice: number;
  memePayToken: string;
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
  const [operating, setOperating] = useState(false);
  const { baseConfig } = useBaseConfig();
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  console.log('publicClient: ', publicClient, walletClient);
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
      const res = await memooConfig.read.getMemooConfig();

      return res as MemooConfig;
    } catch (error) {
      console.error(error);
    }
  }, [memooConfig]);

  const idoBuy = useCallback(
    async (project: Address, amount: BigNumber) => {
      if (!walletClient || !baseConfig || !config) return;
      try {
        setOperating(true);
        if (config.memePayToken !== ZERO_ADDRESS) {
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
      } catch (error) {
        console.error(error);
      } finally {
        setOperating(false);
      }
    },
    [walletClient, baseConfig, config],
  );

  const unlockMeme = useCallback(
    async (project: Address) => {
      if (!baseConfig || !walletClient) return;
      try {
        setOperating(true);
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
      } catch (error) {
        console.error(error);
      } finally {
        setOperating(false);
      }
    },
    [baseConfig, walletClient],
  );

  const airdropClaim = useCallback(
    async (project: Address, claimCount: BigNumber, totalCount: BigNumber) => {
      if (!config || !baseConfig || !walletClient || !address) return;
      try {
        setOperating(true);
        if (config.memePayToken !== ZERO_ADDRESS) {
          // TODO approve
        }

        const { data: proofRes } = await getProof(project, address);
        const priceBN = new BigNumber(config.memeAirdropPrice).dividedToIntegerBy(10 ** config.memeDefaultDecimals);
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
      } catch (error) {
        console.error(error);
      } finally {
        setOperating(false);
      }
    },
    [config, baseConfig, walletClient, address],
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
    operating,
  };
};
