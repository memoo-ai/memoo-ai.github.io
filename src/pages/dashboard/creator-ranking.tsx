import { useState } from 'react';
import './creator-ranking.scss';
import { Popover, Progress, Button } from 'antd';
import { IconTip, IconTranspond } from '@/components/icons';
import CreatorRankingModal from './creator-ranking-modal';
import CreatorRankingShareModal from './creator-ranking-share-modal';
import ViewTokenRankingModal from './view-token-ranking-modal';

export default function CreatorRanking() {
  const [process, setProcess] = useState<'in-queue' | 'active'>('in-queue');

  return (
    // <div className="creator_ranking w-full flex flex-col min-h-[400px] max-h-[592px]">
    <div className="creator_ranking w-full flex flex-col min-h-[400px]">
      <div className="creator_ranking_head flex items-center">
        <span>CREATOR RANKING</span> <IconTip color="#FFF" bgColor="#4A5082" className="ml-[4px]" />
      </div>
      <div className="creator_ranking_memo_score w-[100%]">
        <CreatorRankingShareModal>
          <IconTranspond className="bot cursor-pointer" />
        </CreatorRankingShareModal>
        <div className="creator_ranking_process_detail flex flex-col items-center">
          <h3 className="flex items-center gap-x-1 mt-[32px]">YOU’RE A MEME GOD</h3>
          <img src="./dashboard/level5.png" alt="" />
          <div className="creator_ranking_btn flex items-center flex-col mt-[28px]">
            <h5 className="text-[#fff] font-OCR text-center">
              Claim $MOO reward for <br /> unlocking rank tier.
            </h5>
            <CreatorRankingModal>
              <Button className="w-[227px] h-[50px] mt-[18px]">CLAIM</Button>
            </CreatorRankingModal>
          </div>
          <div className="creator_ranking_btn flex items-center flex-col mt-[28px]">
            <h5 className="text-[#7D83B5] font-OCR text-center">View other top dogs at</h5>
            <img className="mt-[6px]" src="./dashboard/memoogecko.png" alt="" />
            <ViewTokenRankingModal>
              <Button className="w-[227px] h-[50px] mt-[18px]">VIEW CREATOR RANKING</Button>
            </ViewTokenRankingModal>
          </div>
          <div className="flex items-start w-[100%] flex-col">
            <div className="flex items-center mt-3">
              <span className="font-OCR text-[#FFF] font-[14px]">Tier Progression</span>
              <IconTip color="#FFF" bgColor="#4A5082" className="ml-[4px]" />
            </div>
            <Progress className="creator_ranking_memo_score_bar" showInfo={false} percent={70} />
          </div>
        </div>
      </div>
    </div>
  );
}
