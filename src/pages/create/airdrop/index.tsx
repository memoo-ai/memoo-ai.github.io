import { createContext, useMemo, useState } from 'react';
import AirdropClaim from '../common/airdrop-claim';
import IMOParticipate from '../common/imo-participate';
import Status from '../common/status';
import './index.scss';
import { TokenCreateStage } from '@/types';
import PublicSale from '../common/public-sale';
import IDODetail from '../common/ido-detail';

interface AirdropContext {
  stage: TokenCreateStage;
}

export const AirdropContext = createContext<AirdropContext>({ stage: 'in-queue' });

export default function Airdrop() {
  const [stage, setStage] = useState<TokenCreateStage>('launch');

  const context: AirdropContext = useMemo(() => ({ stage }), [stage]);

  return (
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
      <div className="airdrop_right flex flex-col">22</div>
    </div>
  );
}
