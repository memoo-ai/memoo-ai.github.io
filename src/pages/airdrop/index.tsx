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
} from '@/types';
import PublicSale from './public-sale';
import IDODetail from './ido-detail';
import Banner from './banner';
import Profile from './profile';
import Progress from './progress';
import { Button, Spin } from 'antd';
import { getIDOActiveDetail, getIDOLaunchedDetail, getIDOLaunchedDetailTop10, getIDOQueueDetail } from '@/api/airdrop';
import { useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { compareAddrs } from '@/utils';
import { DefaultMemooConfig, MemooConfig, useManageContract } from '@/hooks/useManageContract';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'viem';
import EditProjectModal from './edit-project-modal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { REQUEST_FOLLOWING_STORAGE, UPDATE_PROJECT_TWITTER_STORAGE } from '@/constants';
import { IconEdit, IconBack } from '@/components/icons';
import { getMeMemo } from '@/api/common';
import PreMarketAcqusition from '@/pages/airdrop/pre-market-acquisition';

interface AirdropContext {
  stage: TokenCreateStage;
  idoActiveDetail?: IDOActiveDetail;
  idoLaunchedDetail?: IDOLaunchedDetail;
  idoLaunchedDetailTop10: IDOLaunchedDetailTop10[];
  idoQueueDetail?: IDOQueueDetail;
  mine: boolean;
  ticker: string;
  memooConfig?: MemooConfig;
  defaultConfig?: DefaultMemooConfig;
  idoBuy?: (project: `0x${string}`, amount: BigNumber) => Promise<TransactionReceipt | undefined>;
  unlockMeme?: (project: `0x${string}`, index: number) => Promise<TransactionReceipt | undefined>;
  triggerRefresh?: Function;
  airdropClaim?: (
    project: `0x${string}`,
    claimCount: BigNumber,
    proof: string,
    signature: string,
  ) => Promise<TransactionReceipt | undefined>;
  _1stStage?: {
    unlockCount: BigNumber;
    unlockInfo: UnlockPeriod;
  };
  _2ndStage?: {
    unlockCount: BigNumber;
    unlockInfo: UnlockPeriod;
  };
  totalPurchased?: string;
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
  const { ticker = import.meta.env.VITE_DEMO_TICKER } = useParams<{ ticker: string }>();
  const [refresh, setRefresh] = useState(0);
  const { address } = useAccount();
  console.log('my-address:', address);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const [_1stStage, set1stStage] = useState<{
    unlockCount: BigNumber;
    unlockInfo: UnlockPeriod;
  }>();
  const [_2ndStage, set2ndStage] = useState<{
    unlockCount: BigNumber;
    unlockInfo: UnlockPeriod;
  }>();
  const [totalPurchased, setTotalPurchased] = useState('0');
  const [totalAmount, setTotalAmount] = useState('0');
  const { config, idoBuy, unlockMeme, defaultConfig, airdropClaim, getCanUnlockCount, memeUnlockPeriods } =
    useManageContract();
  const navigate = useNavigate();
  const mine = useMemo(
    () => compareAddrs(idoQueueDetail?.creatorAddress as Address, address!),
    [idoQueueDetail, address],
  );
  console.log('idoQueueDetail: ', idoQueueDetail, address);
  const triggerRefresh = useCallback(() => {
    setRefresh((v) => v + 1);
  }, []);

  const context: AirdropContext = useMemo(
    () => ({
      stage,
      idoActiveDetail,
      idoLaunchedDetail,
      idoLaunchedDetailTop10,
      idoQueueDetail,
      mine,
      ticker,
      memooConfig: config,
      idoBuy,
      unlockMeme,
      airdropClaim,
      _1stStage,
      _2ndStage,
      defaultConfig,
      triggerRefresh,
      totalPurchased,
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
      _1stStage,
      _2ndStage,
      defaultConfig,
      triggerRefresh,
      totalPurchased,
    ],
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // For testin: BigEgg or NewCake
        const { data } = await getIDOQueueDetail(ticker, address ? address : 'default');
        setIDOQueueDetail(data);

        const { data: meme } = await getMeMemo(ticker);
        setTotalPurchased(meme[0]?.balance ?? 0);
        setTotalAmount(meme[0]?.ethAmout ?? 0);
        if (data.stageTwoClaim) {
          setStage('2st-claim');
        } else if (data.stageOneClaim) {
          setStage('1st-claim');
        } else if (data.status === 'Launched') {
          const [p1, p2] = await Promise.all([
            getIDOLaunchedDetail(ticker, address ? address : 'default'),
            getIDOLaunchedDetailTop10({
              pageNumber: 1,
              pageSize: 10,
              ticker: ticker,
              address: address ? address : 'default',
            }),
          ]);
          setIDOLaunchedDetail(p1.data);
          setIDOLaunchedDetailTop10(p2.data);
          setStage('launch');
        } else if (data.status === 'IDO') {
          const { data } = await getIDOActiveDetail(ticker, address ? address : 'default');
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
    if (!idoQueueDetail || !address) return;

    (async () => {
      // 1st stage
      {
        const [unlockCount, unlockInfo] = await Promise.all([
          getCanUnlockCount(idoQueueDetail.contractAddress, address, 0) as Promise<BigNumber>,
          memeUnlockPeriods(0) as Promise<UnlockPeriod>,
        ]);
        console.log('1st stage', unlockCount, unlockInfo);
        set1stStage({ unlockCount, unlockInfo });
      }

      // 2nd stafe
      {
        const [unlockCount, unlockInfo] = await Promise.all([
          getCanUnlockCount(idoQueueDetail.contractAddress, address, 1) as Promise<BigNumber>,
          memeUnlockPeriods(1) as Promise<UnlockPeriod>,
        ]);
        console.log('2nd stage', unlockCount, unlockInfo);
        set2ndStage({ unlockCount, unlockInfo });
      }
    })();
  }, [idoQueueDetail, address, memeUnlockPeriods]);

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
          {/* <Status /> */}
          {/* {idoQueueDetail?.status === 'Launched' && <PublicSale />} */}
          <PublicSale />
          {stage === 'imo' && <IMOParticipate />}
          {stage === 'in-queue' && mine && <PreMarketAcqusition amount={totalAmount ?? 0} />}
          <AirdropClaim />
          <IDODetail />
        </AirdropContext.Provider>
      </div>
      <div className="airdrop_right flex flex-col">
        <AirdropContext.Provider value={context}>
          <Banner />
          <Profile />
        </AirdropContext.Provider>
      </div>
    </div>
  );
};

Airdrop.displayName = Airdrop.name;

export default Airdrop;
