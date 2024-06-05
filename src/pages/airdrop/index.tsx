import { FC, createContext, useEffect, useMemo, useState } from 'react';
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
import { MemooConfig, useManageContract } from '@/hooks/useManageContract';

interface AirdropContext {
  stage: TokenCreateStage;
  idoActiveDetail?: IDOActiveDetail;
  idoLaunchedDetail?: IDOLaunchedDetail;
  idoLaunchedDetailTop10: IDOLaunchedDetailTop10[];
  idoQueueDetail?: IDOQueueDetail;
  mine: boolean;
  ticker: string;
  memooConfig?: MemooConfig;
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
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const { config } = useManageContract();

  const mine = useMemo(
    () => compareAddrs(idoQueueDetail?.creatorAddress as Address, address!),
    [idoQueueDetail, address],
  );

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
    }),
    [stage, idoActiveDetail, idoLaunchedDetail, idoLaunchedDetailTop10, idoQueueDetail, mine, ticker, config],
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // For testin: BigEgg or NewCake
        const { data } = await getIDOQueueDetail(ticker);
        setIDOQueueDetail(data);

        if (data.stageTwoClaim) {
          setStage('2st-claim');
        } else if (data.stageOneClaim) {
          setStage('1st-claim');
        } else if (data.status === 'Launched') {
          const [p1, p2] = await Promise.all([
            getIDOLaunchedDetail(ticker),
            getIDOLaunchedDetailTop10({ pageNumber: 1, pageSize: 10, ticker: ticker }),
          ]);
          setIDOLaunchedDetail(p1.data);
          setIDOLaunchedDetailTop10(p2.data);
          setStage('launch');
        } else if (data.status === 'IDO') {
          const { data } = await getIDOActiveDetail(ticker);
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
  }, []);

  return (
    <div className="airdrop pb-16">
      <Spin spinning={loading} fullscreen />
      <div className="col-span-full	flex flex-col items-center pt-[70px]">
        <AirdropContext.Provider value={context}>
          <Progress />
        </AirdropContext.Provider>
      </div>
      <div className="col-span-full pt-[70px] pb-[22px] pl-[428px] flex items-center justify-between">
        <Button type="link" className="flex items-center h-[40px] gap-x-[11px]">
          <img src="/create/icon-edit.svg" />
          <span className="text-bluish-purple-light font-OCR leading-5 text-sm">Edit Info</span>
        </Button>
        <Button type="link" className="flex items-center h-[40px] gap-x-[11px]">
          <span className="text-bluish-purple-light font-OCR leading-5 text-sm">Back to Dashboard</span>
          <img src="/create/icon-dashboard.svg" />
        </Button>
      </div>
      <div className="airdrop_left flex flex-col gap-y-3.5">
        <AirdropContext.Provider value={context}>
          {/* <Status /> */}
          {stage === 'launch' && <PublicSale />}
          {stage === 'imo' && <IMOParticipate />}
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
