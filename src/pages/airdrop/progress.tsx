/* eslint-disable no-debugger */
/* eslint-disable react/no-unstable-nested-components */
import { FC, ReactNode, useContext, useMemo } from 'react';
import { AirdropContext } from '../airdrop';
import { IDOStatus, TokenCreateStage } from '@/types';
import { Button } from 'antd';
import classNames from 'classnames';
import './progress.scss';
import IncreaseAcquisitionModal from './increase-acquisition-modal';
import ClaimTokensModal from './claim-tokens-modal';
// import { useAccount } from 'wagmi';
import { useAccount } from '@/hooks/useWeb3';
import { compareAddrs, formatDecimals, formatNumberDecimal, formatRestTime } from '@/utils';
import BigNumber from 'bignumber.js';
import { useProportion } from '@/hooks/useProportion';
import { BN } from '@coral-xyz/anchor';
const Progress: FC = () => {
  const { stage, idoQueueDetail, memooConfig, mine, totalPurchased, memeUserData, unlockTimestamp } =
    useContext(AirdropContext);
  const { address } = useAccount();
  const { firstProportion, platformCreateMeme, firstIncrease, maxIncrease, createMaxProportion } = useProportion();

  const purchased = useMemo(() => {
    if (!memooConfig || !memeUserData || !platformCreateMeme) return 0;

    const creatorLockCountBN = new BigNumber(Number(memeUserData?.creatorLockCount)).dividedBy(10 ** 9);
    console.log('creatorLockCountBN:', Number(creatorLockCountBN));
    const memeUserIdoCountBN = new BigNumber(Number(memeUserData?.memeUserIdoCount)).dividedBy(10 ** 9);
    console.log('memeUserIdoCountBN:', Number(memeUserIdoCountBN));
    const idoPriceBN = new BigNumber(Number(memooConfig?.idoPrice)).dividedBy(10 ** 9);
    console.log('idoPriceBN:', Number(idoPriceBN));
    const totalCountBN = creatorLockCountBN.plus(memeUserIdoCountBN);
    console.log('totalCountBN:', Number(totalCountBN));
    const totalPurchasedBN = totalCountBN.multipliedBy(idoPriceBN);
    console.log('totalPurchasedBN:', Number(totalPurchasedBN));
    const formattedResult = parseFloat(formatDecimals(totalPurchasedBN));
    console.log('purchased:', formattedResult);
    console.log('purchased-platformCreateMeme:', platformCreateMeme);
    const result = platformCreateMeme + formattedResult;
    return result;
  }, [memooConfig, memeUserData, platformCreateMeme]);
  // console.log('firstProportion:', firstProportion);
  // console.log('maxProportion:', maxProportion);
  // console.log('firstIncrease:', firstIncrease);
  // console.log('maxIncrease:', maxIncrease);

  const tokens = useMemo(() => {
    if (!memeUserData) return 0;

    const creatorLockCountPermission = new BigNumber(memeUserData?.creatorLockCountPermission.toString()).dividedBy(
      10 ** 9,
    );

    const creatorLockCount = new BigNumber(memeUserData?.creatorLockCount.toString()).dividedBy(10 ** 9);

    console.log('creatorLockCountPermission:', creatorLockCountPermission.toString());
    console.log('creatorLockCount:', creatorLockCount.toString());

    const result = creatorLockCountPermission.minus(creatorLockCount);
    console.log('tokens', result.toString());

    return parseFloat(formatDecimals(result.toString()));
  }, [memeUserData]);

  console.log('tokens:', tokens);
  // const firstIncrease = useMemo(() => {
  //   if (!memooConfig || !defaultConfig) return 0;

  //   const totalSupplyBN = new BigNumber(Number(defaultConfig?.totalSupply)).dividedBy(
  //     10 ** defaultConfig?.defaultDecimals,
  //   );
  //   const idoPriceBN = new BigNumber(Number(defaultConfig?.idoPrice)).dividedBy(10 ** defaultConfig?.defaultDecimals);
  //   const result = totalSupplyBN.multipliedBy(idoPriceBN).multipliedBy(firstProportion);
  //   return parseFloat(formatDecimals(result));
  // }, [memooConfig, firstProportion, defaultConfig]);

  // const maxIncrease = useMemo(
  //   () => parseFloat(formatDecimals(firstIncrease * (maxProportion / firstProportion))),
  //   [firstProportion, maxProportion, firstIncrease],
  // );

  const items: {
    key: TokenCreateStage;
    icon: string | ReactNode;
    title: string;
    desc: string;
    onClick?: () => void;
    wrapper?: (node: ReactNode) => ReactNode;
    btnText?: string;
    btnIcon?: string;
    enabled?: boolean;
  }[] = [
    {
      key: 'in-queue',
      icon: `/create/process-in-queue${stage === 'in-queue' ? '-active' : ''}.svg`,
      title: 'in queue',
      desc: 'Complete tasks to be\neligible for airdrop',
      onClick: () => {},
      btnText: 'increase',
      btnIcon: `/create/icon-increase${stage === 'in-queue' ? '-active' : ''}.svg`,
      wrapper: (node: ReactNode) => (
        <IncreaseAcquisitionModal
          maxIncrease={maxIncrease}
          firstProportion={firstProportion}
          maxProportion={createMaxProportion}
          firstIncrease={firstIncrease}
          purchased={purchased}
        >
          {node}
        </IncreaseAcquisitionModal>
      ),
      enabled: mine && (['QUEUE', 'IDO'] as IDOStatus[]).includes(idoQueueDetail?.status ?? 'Draft'),
      // enabled: true,
    },
    {
      key: 'imo',
      icon: `/create/process-imo${stage === 'imo' ? '-active' : ''}.svg`,
      title: 'imo',
      desc: 'Get first access\nbefore public sale',
    },
    {
      key: 'launch',
      icon: `/create/process-launch${stage === 'launch' ? '-active' : ''}.svg`,
      title: 'launch',
      desc: 'Token available\nfor public sale',
    },
    {
      key: '1st-claim',
      icon: (
        <div className="relative z-10">
          <img src="/create/bg-1st-claim.png" />
          <img
            className="absolute left-[53px] top-[37px]"
            src={`/create/process-claim${stage === '1st-claim' ? '-active' : ''}.svg`}
          />
        </div>
      ),
      title: '1st claim',
      // desc: `1st ${new BigNumber(Number(_1stStage?.unlockInfo?.unlockRate))
      //   .dividedBy(1e4)
      //   .multipliedBy(1e2)
      //   .toNumber()}% unlock when\ntoken price hits 0.0005c`,
      desc: `1st ${50}% unlock when\ntoken price hits 0.0005c`,
      onClick: () => {},
      btnText: 'claim',
      btnIcon: `/create/icon-claim${stage === '1st-claim' ? '-active' : ''}.svg`,
      wrapper: (node: ReactNode) => (
        <ClaimTokensModal
          tokens={tokens}
          // tokens={parseFloat(
          //   formatDecimals(
          //     // new BigNumber(_1stStage?.unlockCount ?? 0).dividedBy(10 ** (defaultConfig?.defaultDecimals ?? 0)),
          //     new BigNumber(_1stStage?.unlockCount ?? 0).dividedBy(10 ** 9),
          //   ),
          // )}
          lockinPeriod={formatRestTime(Number(unlockTimestamp) / 1000)}
          rate={50}
          stage="1st"
        >
          {node}
        </ClaimTokensModal>
      ),
      enabled:
        idoQueueDetail?.stageOneClaim &&
        tokens > 0 &&
        idoQueueDetail?.status === 'Launched' &&
        (address
          ? [(idoQueueDetail.contractAddress, idoQueueDetail.creatorAddress)].some((addr) =>
              compareAddrs(addr, address.toBase58()),
            )
          : false),
      //   Number(_1stStage?.unlockCount) > 0  &&
      // enabled: true,
    },
    {
      key: '2st-claim',
      icon: (
        <div className="relative z-10">
          <img src="/create/bg-2st-claim.png" />
          <img
            className="absolute left-[53px] top-[37px]"
            src={`/create/process-claim${stage === '2st-claim' ? '-active' : ''}.svg`}
          />
        </div>
      ),
      title: '2st claim',
      // desc: `Next ${new BigNumber(Number(_2ndStage?.unlockInfo?.unlockRate))
      //   .dividedBy(1e4)
      //   .multipliedBy(1e2)
      //   .toNumber()}% unlocked\ntokens in ${formatRestTime(Number(_2ndStage?.unlockInfo?.value) * 1000)}`,
      desc: `Next ${50}% unlocked\ntokens in ${formatRestTime(Number(unlockTimestamp) * 1000)}`,
      onClick: () => {},
      btnText: 'claim',
      btnIcon: `/create/icon-claim${stage === '2st-claim' ? '-active' : ''}.svg`,
      wrapper: (node: ReactNode) => (
        <ClaimTokensModal
          // tokens={parseFloat(
          //   formatDecimals(
          //     // new BigNumber(_2ndStage?.unlockCount ?? 0).dividedBy(10 ** (defaultConfig?.defaultDecimals ?? 0)),
          //     new BigNumber(_2ndStage?.unlockCount ?? 0).dividedBy(10 ** 9),
          //   ),
          // )}
          tokens={tokens}
          // unlockTokens={parseFloat(formatDecimals(Number(_1stStage?.unlockInfo?.value ?? 0)))}
          stage="2nd"
        >
          {node}
        </ClaimTokensModal>
      ),
      enabled:
        idoQueueDetail?.stageTwoClaim &&
        tokens > 0 &&
        idoQueueDetail?.status === 'Launched' &&
        (address
          ? [(idoQueueDetail.contractAddress, idoQueueDetail.creatorAddress)].some((addr) =>
              compareAddrs(addr, address.toBase58()),
            )
          : false),
      //   Number(_2ndStage?.unlockCount) > 0 &&
      // enabled: true,
    },
  ];

  return (
    <ul className="progress flex">
      {items.map((item) => {
        const active = item.key === stage;
        return (
          <li
            key={item.key}
            className={classNames('flex max-w-[220px] flex-col items-center justify-end progress_list_item px-[18px]', {
              active,
            })}
          >
            <div className={classNames({ active }, 'icon')}>
              {typeof item.icon === 'string' ? <img src={item.icon} /> : item.icon}
            </div>
            <h3
              className={classNames(
                { 'text-green': active },
                'text-lg font-404px leading-5 text-bluish-purple-light mt-[18px]',
              )}
            >
              {item.title}
            </h3>
            <p className="mt-1.5 font-OCR text-white leading-4 text-sm text-center break-keep whitespace-pre">
              {item.desc}
            </p>
            {item.wrapper ? (
              item.wrapper(
                <Button
                  style={{ visibility: item.btnText ? 'visible' : 'hidden' }}
                  className="memoo_button reverse mt-[19px] px-[19px] h-[38px]"
                  onClick={() => item.onClick?.()}
                  disabled={!item.enabled}
                >
                  <div className="flex items-center gap-x-1">
                    {/* {item.btnIcon && <img src={item.btnIcon} />} */}
                    <span className={classNames('text-[10px] leading-5')}>{item.btnText}</span>
                  </div>
                </Button>,
              )
            ) : (
              <Button
                style={{ visibility: item.btnText ? 'visible' : 'hidden' }}
                className="memoo_button reverse mt-[19px] px-[19px] h-[38px]"
                onClick={() => item.onClick?.()}
                disabled={!item.enabled}
              >
                <div className="flex items-center gap-x-1">
                  {/* {item.btnIcon && <img src={item.btnIcon} />} */}
                  <span className={classNames('text-[10px] leading-5')}>{item.btnText}</span>
                </div>
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

Progress.displayName = Progress.name;

export default Progress;
