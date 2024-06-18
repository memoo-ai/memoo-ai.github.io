import { useState } from 'react';
import './creator-ranking.scss';
import { Popover, Progress } from 'antd';
import { IconTip } from '@/components/icons';

export default function CreatorRanking() {
  const [process, setProcess] = useState<'in-queue' | 'active'>('in-queue');

  return (
    <div className="creator_ranking w-full flex flex-col min-h-[400px] max-h-[592px]">
      <div className="creator_ranking_head flex items-center">
        <span>CREATOR RANKING</span> <IconTip color="#FFF" bgColor="#4A5082" className="ml-[4px]" />
      </div>
      <div className="creator_ranking_memo_score">
        <img className="bot" src="/create/icon-bot.png" />
        <div className="creator_ranking_process_detail flex flex-col items-start">
          <h3 className="flex items-center gap-x-1">
            memo score{' '}
            <Popover>
              <img className="mb-1" src="/create/tip.png" />
            </Popover>
          </h3>
          <div className="flex items-end mt-3 mb-4">
            <span className="numerator">70</span>
            <span className="denominator">/100</span>
          </div>
          <Progress className="creator_ranking_memo_score_bar" showInfo={false} percent={70} />
        </div>
      </div>
    </div>
  );
}
