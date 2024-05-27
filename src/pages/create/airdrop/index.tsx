import { createContext, useMemo, useState } from 'react';
import AirdropClaim from '../common/airdrop-claim';
import IMOParticipate from '../common/imo-participate';
import Status from '../common/status';
import './index.scss';
import { TokenCreateStage } from '@/types';
import PublicSale from '../common/public-sale';
import IDODetail from '../common/ido-detail';
import Banner from '../common/banner';
import Profile from '../common/profile';
import Progress from '../common/progress';

interface AirdropContext {
  stage: TokenCreateStage;
}

export const AirdropContext = createContext<AirdropContext>({ stage: 'in-queue' });

export default function Airdrop() {
  const [stage, setStage] = useState<TokenCreateStage>('in-queue');

  const context: AirdropContext = useMemo(() => ({ stage }), [stage]);

  return (
    <div className="pt-[70px] flex flex-col items-center">
      <AirdropContext.Provider value={context}>
        <Progress />
      </AirdropContext.Provider>
      <div className="airdrop pb-16">
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
    </div>
  );
}
