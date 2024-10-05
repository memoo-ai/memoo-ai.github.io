/* eslint-disable no-lone-blocks */
/* eslint-disable no-debugger */
import { FC, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import AirdropClaim from './airdrop-claim';
import IMOParticipate from './imo-participate';
import Status from './status';
import './index.scss';
import {
  Address,
  IDOActiveDetail,
  IDOLaunchedDetail,
  IDOLaunchedDetailTop10,
  IDOQueueDetail,
  TokenCreateStage,
  UnlockPeriod,
  SolanaMemeConfig,
} from '@/types';
import PublicSale from './public-sale';
import IDODetail from './ido-detail';
import Banner from './banner';
import Profile from './profile';
import Progress from './progress';
import { Button, Spin } from 'antd';
import {
  getIDOActiveDetail,
  getIDOLaunchedDetail,
  getIDOLaunchedDetailTop10,
  getIDOQueueDetail,
  getUnlockTimestamp,
} from '@/api/airdrop';
import { useParams } from 'react-router-dom';
// import { useAccount } from 'wagmi';
import { useAccount, MemooConfig, MemeUserIdoData, MemeConfig } from '@/hooks/useWeb3';
import { compareAddrs } from '@/utils';
import { DefaultMemooConfig, useManageContract } from '@/hooks/useManageContract';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'viem';
import EditProjectModal from './edit-project-modal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { REQUEST_FOLLOWING_STORAGE, UPDATE_PROJECT_TWITTER_STORAGE } from '@/constants';
import { IconEdit, IconBack } from '@/components/icons';
import { getMeMemo } from '@/api/common';
import PreMarketAcqusition from '@/pages/airdrop/pre-market-acquisition';
import MeMooScoreBreakdown from './memoo-score-breakdown';
import { BN } from '@coral-xyz/anchor';
import { getMemeConfigId } from '@/api/base';
import { PublicKey, RpcResponseAndContext, SignatureResult } from '@solana/web3.js';

interface AirdropContext {
  stage: TokenCreateStage;
  idoActiveDetail?: IDOActiveDetail;
  idoLaunchedDetail?: IDOLaunchedDetail;
  idoLaunchedDetailTop10: IDOLaunchedDetailTop10[];
  idoQueueDetail?: IDOQueueDetail;
  mine: boolean;
  ticker: string;
  memooConfig?: MemooConfig;
  // defaultConfig?: DefaultMemooConfig;
  // idoBuy?: (project: `0x${string}`, amount: BigNumber) => Promise<TransactionReceipt | undefined>;
  idoBuy?: (memeId: string, amount: BigNumber, paySol: number) => Promise<string | undefined>;
  unlockMeme?: (project: `0x${string}`, index: number) => Promise<TransactionReceipt | undefined>;
  // idoClaim?: (project: `0x${string}`) => Promise<TransactionReceipt | undefined>;
  idoClaim?: (memeId: string, mintAPublicKey: string) => Promise<string | undefined>;
  creatorClaimAll?: (memeId: string, mintAPublicKey: string, userCanClaimCount: number) => any;
  triggerRefresh?: Function;
  airdropClaim?: (
    memeId: string,
    mintAPublicKey: string,
    msg: any,
    signature: any,
    signerPublicKey: PublicKey,
  ) => Promise<RpcResponseAndContext<SignatureResult> | undefined>;
  // _1stStage?: {
  //   unlockCount: BigNumber;
  //   unlockInfo: UnlockPeriod;
  // };
  // _2ndStage?: {
  //   unlockCount: BigNumber;
  //   unlockInfo: UnlockPeriod;
  // };
  totalPurchased?: string;
  // memeConfigId?: string;
  getMemeUserData?: (memeConfigId: string) => Promise<MemeUserIdoData | undefined>;
  memeUserData?: MemeUserIdoData;
  memeConfig?: MemeConfig;
  memeCreatorUserData?: MemeUserIdoData;
  creatorClaim?: (memeId: string, mintAPublicKey: string) => Promise<string | undefined>;
  // mintAPublickey?: PublicKey;
  solanaMemeConfig?: SolanaMemeConfig;
  unlockTimestamp?: number;
  userCanClaimCount?: number;
}

export const AirdropContext = createContext<AirdropContext>({
  stage: 'in-queue',
  mine: false,
  ticker: '',
  idoLaunchedDetailTop10: [],
});

const Airdrop: FC = () => {
  const [stage, setStage] = useState<TokenCreateStage>('in-queue');
  const [idoActiveDetail, setIDOActiveDetail] = useState<IDOActiveDetail>();
  const [idoLaunchedDetail, setIDOLaunchedDetail] = useState<IDOLaunchedDetail>();
  const [idoLaunchedDetailTop10, setIDOLaunchedDetailTop10] = useState<IDOLaunchedDetailTop10[]>([]);
  const [idoQueueDetail, setIDOQueueDetail] = useState<IDOQueueDetail>();
  // const [memeConfigId, setMemeConfigId] = useState();
  // const [mintAPublickey, setMintAPublickey] = useState();
  const [solanaMemeConfig, setSolanaMemeConfig] = useState<SolanaMemeConfig>();
  const [memeUserData, setMemeUserData] = useState<MemeUserIdoData>();
  const [memeConfig, setMemeConfig] = useState<MemeConfig>();
  const [memeCreatorUserData, setMemeCreatorUserData] = useState<MemeUserIdoData>();
  const [unlockTimestamp, setUnlockTimestamp] = useState();
  const { ticker = import.meta.env.VITE_DEMO_TICKER } = useParams<{ ticker: string }>();
  const [refresh, setRefresh] = useState(0);
  const {
    address,
    memooConfig,
    idoBuy,
    getMemeUserData,
    getMemeCreatorData,
    idoClaim,
    creatorClaimAll,
    creatorClaim,
    airdropClaim,
  } = useAccount();
  console.log('my-address:', address);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  // const [_1stStage, set1stStage] = useState<{
  //   unlockCount: BigNumber;
  //   unlockInfo: UnlockPeriod;
  // }>();
  // const [_2ndStage, set2ndStage] = useState<{
  //   unlockCount: BigNumber;
  //   unlockInfo: UnlockPeriod;
  // }>();
  const [totalPurchased, setTotalPurchased] = useState('0');
  const [totalAmount, setTotalAmount] = useState('0');
  const { config, unlockMeme, getCanUnlockCount, memeUnlockPeriods } = useManageContract();
  const navigate = useNavigate();
  const mine = useMemo(
    () => compareAddrs(idoQueueDetail?.creatorAddress as Address, address! as any),
    [idoQueueDetail, address],
  );
  console.log('idoQueueDetail: ', idoQueueDetail, address);
  const triggerRefresh = useCallback(() => {
    setRefresh((v) => v + 1);
  }, []);

  const userCanClaimCount = useMemo(() => {
    if (!memeUserData) return 0;

    const memeUserIdoClaimedCount = new BigNumber(memeUserData?.memeUserIdoClaimedCount.toString()).dividedBy(10 ** 9);
    const memeUserIdoCount = new BigNumber(Number(memeUserData.memeUserIdoCount.toString())).dividedBy(10 ** 9);
    const result = memeUserIdoCount.minus(memeUserIdoClaimedCount);
    console.log('userCanClaimCount: ', result.toString());
    return Number(result);
  }, [memeUserData]);

  const context: AirdropContext = useMemo(
    () => ({
      stage,
      idoActiveDetail,
      idoLaunchedDetail,
      idoLaunchedDetailTop10,
      idoQueueDetail,
      mine,
      ticker,
      memooConfig,
      idoBuy,
      unlockMeme,
      airdropClaim,
      idoClaim,
      creatorClaimAll,
      // _1stStage,
      // _2ndStage,
      // defaultConfig,
      triggerRefresh,
      totalPurchased,
      getMemeUserData,
      memeUserData,
      creatorClaim,
      solanaMemeConfig,
      unlockTimestamp,
      memeConfig,
      memeCreatorUserData,
      userCanClaimCount,
    }),
    [
      stage,
      idoActiveDetail,
      idoLaunchedDetail,
      idoLaunchedDetailTop10,
      idoQueueDetail,
      mine,
      ticker,
      config,
      idoBuy,
      unlockMeme,
      airdropClaim,
      idoClaim,
      creatorClaimAll,
      // _1stStage,
      // _2ndStage,
      // defaultConfig,
      triggerRefresh,
      totalPurchased,
      getMemeUserData,
      memeUserData,
      creatorClaim,
      solanaMemeConfig,
      unlockTimestamp,
      memeConfig,
      memeCreatorUserData,
      userCanClaimCount,
    ],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // For testin: BigEgg or NewCake
        const { data } = await getIDOQueueDetail(ticker, address ?? 'default');
        setIDOQueueDetail(data);
        // const { data: meme } = await getMeMemo(ticker);
        // setTotalPurchased(meme[0]?.balance ?? 0);
        // setTotalAmount(meme[0]?.ethAmout ?? 0);
        const { data: config } = await getMemeConfigId(ticker);
        setSolanaMemeConfig(config ?? '');
        // console.log('config.memeConfigId:', config.memeConfigId);
        // debugger;
        // const memeUser = await getMemeUserData(config.memeConfigId);
        // console.log('memeUser:', memeUser);
        // setMemeUserData(memeUser!);
        const { data: time } = await getUnlockTimestamp(ticker);
        setUnlockTimestamp(time);
        console.log('getUnlockTimestamp: ', time);

        if (data.status === 'IDOEND') {
          setStage('imo');
        } else if (data.status === 'Launched') {
          setStage('launch');
          if (data.stageTwoClaim) {
            setStage('2st-claim');
          } else if (data.stageOneClaim) {
            setStage('1st-claim');
          }
          // debugger;
          const [p1, p2] = await Promise.all([
            getIDOLaunchedDetail(ticker, address ?? 'default'),
            getIDOLaunchedDetailTop10({
              pageNumber: 1,
              pageSize: 10,
              ticker: ticker,
              address: address ?? 'default',
            }),
            getUnlockTimestamp(ticker),
          ]);
          setIDOLaunchedDetail(p1.data);
          setIDOLaunchedDetailTop10(p2.data);
        } else if (data.status === 'IDO') {
          const { data } = await getIDOActiveDetail(ticker, address ?? 'default');
          console.log('data.status:IDO');
          console.log('data.status:IDO');
          setIDOActiveDetail(data);
          setStage('imo');
        } else {
          setStage('in-queue');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [refresh]);
  useEffect(() => {
    (async () => {
      try {
        if (!solanaMemeConfig || !memooConfig) return;

        const memeUser = await getMemeUserData(solanaMemeConfig?.memeConfigId);
        console.log('memeUser-solanaMemeConfig:', solanaMemeConfig);
        console.log('memeUser:', memeUser);
        setMemeUserData(memeUser!);
        const memeCreator = await getMemeCreatorData(solanaMemeConfig?.memeConfigId);
        console.log('memeConfig:', memeCreator);
        setMemeConfig(memeCreator?.memeConfig);
        setMemeCreatorUserData(memeCreator?.memeCreatorData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [ticker, solanaMemeConfig, refresh, memooConfig]);

  // useEffect(() => {
  //   if (!idoQueueDetail || !address) return;

  //   (async () => {
  //     // 1st stage
  //     {
  //       const [unlockCount, unlockInfo] = await Promise.all([
  //         getCanUnlockCount(idoQueueDetail.contractAddress, address, 0) as Promise<BigNumber>,
  //         memeUnlockPeriods(0) as Promise<UnlockPeriod>,
  //       ]);
  //       console.log('1st stage', unlockCount, unlockInfo);
  //       set1stStage({ unlockCount, unlockInfo });
  //     }

  //     // 2nd stafe
  //     {
  //       const [unlockCount, unlockInfo] = await Promise.all([
  //         getCanUnlockCount(idoQueueDetail.contractAddress, address, 1) as Promise<BigNumber>,
  //         memeUnlockPeriods(1) as Promise<UnlockPeriod>,
  //       ]);
  //       console.log('2nd stage', unlockCount, unlockInfo);
  //       set2ndStage({ unlockCount, unlockInfo });
  //     }
  //   })();
  // }, [idoQueueDetail, address, memeUnlockPeriods]);
  const preAmount = useMemo(() => {
    if (!memooConfig || !memeCreatorUserData) return new BigNumber(0);

    const idoPriceBN = new BigNumber(memooConfig?.idoPrice.toString()).dividedBy(new BigNumber(10).pow(10));
    console.log('idoPriceBN: ', idoPriceBN.toString());

    const memeUserIdoCountBN = new BigNumber(memeCreatorUserData?.memeUserIdoCount.toString()).dividedBy(
      new BigNumber(10).pow(9),
    );
    console.log('memeUserIdoCountBN: ', memeUserIdoCountBN.toString());

    const preAmountBN = memeUserIdoCountBN.multipliedBy(idoPriceBN);
    console.log('preAmount: ', preAmountBN.toString());

    return preAmountBN.toNumber();
  }, [memeCreatorUserData, memooConfig]);

  return (
    <div className="airdrop pb-16">
      <Spin spinning={loading} fullscreen />
      <div className="col-span-full	flex flex-col items-center pt-[70px]">
        {mine && (
          <AirdropContext.Provider value={context}>
            <Progress />
          </AirdropContext.Provider>
        )}
      </div>
      {mine && (
        <div className="col-span-full pt-[70px] pb-[22px] pl-[428px] flex items-center justify-between">
          <EditProjectModal ticker={ticker} onSaveSuccess={triggerRefresh}>
            <Button type="link" className="flex items-center h-[40px] gap-x-[11px]" disabled={!mine}>
              {/* <img src="/create/icon-edit.svg" /> */}
              <IconEdit className="" color="#07E993" hoverColor="#B53BFF" bgColor="#B53BFF" hoverBgColor="#07E993" />
              <span className="text-bluish-purple-light font-OCR leading-5 text-sm">Edit Info</span>
            </Button>
          </EditProjectModal>
          <Button
            type="link"
            className="flex items-center h-[40px] gap-x-[11px]"
            onClick={() => navigate('/dashboard')}
          >
            <span className="text-bluish-purple-light font-OCR leading-5 text-sm">Back to Dashboard</span>
            {/* <img src="/create/icon-dashboard.svg" /> */}
            <IconBack className="" />
          </Button>
        </div>
      )}
      <div className="airdrop_left flex flex-col gap-y-3.5">
        <AirdropContext.Provider value={context}>
          <Status />
          {idoQueueDetail?.status === 'Launched' && <PublicSale />}
          {/* <PublicSale /> */}
          {stage === 'imo' && <IMOParticipate />}
          {/* <IMOParticipate /> */}
          <AirdropClaim />
          {/* {(stage === 'in-queue' || stage === 'imo') && mine && <PreMarketAcqusition amount={preAmount} />}  */}
          {stage !== '2st-claim' && mine && <PreMarketAcqusition amount={Number(preAmount ?? 0)} />}
          <IDODetail />
        </AirdropContext.Provider>
      </div>
      <div className="airdrop_right flex flex-col">
        <AirdropContext.Provider value={context}>
          <Banner />
          <Profile />
          <MeMooScoreBreakdown />
        </AirdropContext.Provider>
      </div>
    </div>
  );
};

Airdrop.displayName = Airdrop.name;

export default Airdrop;
