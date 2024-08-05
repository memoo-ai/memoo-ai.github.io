/* eslint-disable no-debugger */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from '@/hooks/useWeb3';
import BigNumber from 'bignumber.js';
import { formatDecimals } from '@/utils';
export const useProportion = () => {
  const { memooConfig } = useAccount();
  const firstProportion = useMemo(() => {
    if (!memooConfig) return 0;
    return Number(memooConfig?.tokenAllocationCreator) / 10000;
  }, [memooConfig]);
  const maxProportion = useMemo(() => {
    if (!memooConfig) return 0;
    return Number(memooConfig?.idoCreatorBuyLimit) / 10000;
  }, [memooConfig]);

  const createMaxProportion = useMemo(() => {
    if (!memooConfig) return 0;
    return (Number(memooConfig?.idoCreatorBuyLimit) + Number(memooConfig?.tokenAllocationCreator)) / 10000;
  }, [memooConfig]);

  const totalCap = useMemo(() => {
    if (!memooConfig?.platformFeeCreateMemeSol) {
      return 0;
    }
    const platformFeeCreateMeme = new BigNumber(memooConfig.platformFeeCreateMemeSol.toString());
    const result = platformFeeCreateMeme.dividedBy(new BigNumber(10).pow(9));
    return result.toNumber();
  }, [memooConfig]);

  const totalCapInitial = useMemo(() => {
    const rate = Number(memooConfig?.idoCreatorBuyLimit) / 10000;
    const total =
      Number(new BigNumber(memooConfig?.idoPrice).dividedBy(10 ** 9)) *
      Number(new BigNumber(memooConfig?.totalSupply).dividedBy(10 ** 9)) *
      rate;
    return Number(new BigNumber(total));
    // return Number(new BigNumber(total).dividedBy(new BigNumber(10).pow(9)));
    // return 0.03;
  }, [memooConfig]);

  const firstIncrease = useMemo(() => {
    if (!memooConfig) return 0;

    const totalSupplyBN = new BigNumber(Number(memooConfig?.totalSupply)).dividedBy(10 ** 9);
    const idoPriceBN = new BigNumber(Number(memooConfig?.idoPrice)).dividedBy(10 ** 9);
    const result = totalSupplyBN.multipliedBy(idoPriceBN).multipliedBy(firstProportion);
    return parseFloat(formatDecimals(result));
  }, [memooConfig, firstProportion]);

  const maxIncrease = useMemo(
    () => parseFloat(formatDecimals(firstIncrease * (createMaxProportion / firstProportion))),
    [firstProportion, maxProportion, firstIncrease],
  );

  return {
    firstProportion,
    maxProportion,
    totalCapInitial,
    totalCap,
    maxIncrease,
    firstIncrease,
    memooConfig,
    createMaxProportion,
  };
};
