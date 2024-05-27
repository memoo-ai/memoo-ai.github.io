import { createContext, useMemo, useState } from 'react';
import AirdropClaim from './airdrop-claim';
import IMOParticipate from './imo-participate';
import Status from './status';
import './index.scss';
import { TokenCreateStage } from '@/types';
import PublicSale from './public-sale';
import IDODetail from './ido-detail';
import Banner from './banner';
import Profile from './profile';
import Progress from './progress';
import { Button } from 'antd';

interface AirdropContext {
  stage: TokenCreateStage;
}

export const AirdropContext = createContext<AirdropContext>({ stage: 'in-queue' });

export default function Airdrop() {
  const [stage, setStage] = useState<TokenCreateStage>('in-queue');

  const context: AirdropContext = useMemo(() => ({ stage }), [stage]);

  return (
    <div className="airdrop pb-16">
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
          <Status />
          {stage === 'launch' && <PublicSale />}
          {stage === 'imo' && <IMOParticipate />}
          <AirdropClaim />
          <IDODetail />
        </AirdropContext.Provider>
      </div>
      <div className="airdrop_right flex flex-col">
        <Banner />
        <Profile />
      </div>
    </div>
  );
}
