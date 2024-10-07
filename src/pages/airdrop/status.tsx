import { useState, useMemo, useContext } from 'react';
import './status.scss';
import { Popover, Progress } from 'antd';
import { IconTranspond } from '@/components/icons';
import ScoreShareModal from './score-share-modal';
import { AirdropContext } from '.';
import ITooltip from '@/components/ITooltip';
import { IconQueue, IconLaunched, IconIMO } from '@/components/icons';
import { formatRatioToPercentage } from '@/utils';
const MESSAGE_THRESHOLDS: [number, string][] = [
  [30, 'GTFO!'],
  [45, 'Take some luck to\nmake this work!'],
  [60, 'There is room\nfor Improvement'],
  [75, 'Might Consider\nAdding it to my Wishlist'],
  [85, 'Has Potential to\nbe a Meme Star'],
  [95, 'Near Purfect! LFG!'],
  [100, 'Mother of all Memes!'],
];
export default function Status() {
  // const [process, setProcess] = useState<'in-queue' | 'active'>('in-queue');
  const { idoQueueDetail } = useContext(AirdropContext);
  const memooScore = useMemo(
    () => formatRatioToPercentage(idoQueueDetail?.memooScoreTotal ?? 0, idoQueueDetail?.totalScore ?? 0),
    [idoQueueDetail],
  );
  const meMessage = useMemo(
    () => MESSAGE_THRESHOLDS.find(([threshold]) => Number(memooScore ?? 0) <= threshold)?.[1] || 'GTFO!',
    [memooScore],
  );

  const renderIcon = useMemo(() => {
    switch (idoQueueDetail?.status) {
      case 'QUEUE':
        return (
          <div className="flex items-center gap-x-1">
            <span className="font-404px text-[#07E993] text-[18px]">IN QUEUE</span>
            <IconQueue className="w-[20px] h-[20px]" color="#07E993" />
          </div>
        );
      case 'Waiting_for_pay':
        return (
          <div className="flex items-center gap-x-1">
            <span className="font-404px text-[#07E993] text-[18px]">IN QUEUE</span>
            <IconQueue color="#07E993" />
          </div>
        );
      case 'IDO':
        return (
          <div className="flex items-center gap-x-1">
            <span className="font-404px text-[#07E993] text-[18px]">Active</span>
            <IconIMO color="#07E993" />
          </div>
        );
      case 'Launched':
        return (
          <div className="flex items-center gap-x-1">
            <span className="font-404px text-[#07E993] text-[18px] font-extrabold">Launched</span>
            <IconLaunched color="#07E993" />
          </div>
        );
      case 'IDOEND':
        return (
          <div className="flex items-center gap-x-1">
            <span className="font-404px text-[#07E993] text-[18px] font-extrabold">Launched</span>
            <IconLaunched color="#07E993" />
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-x-1">
            <span className="font-404px text-[#07E993] text-[18px] ">IN QUEUE</span>
            <IconQueue color="#07E993" />
          </div>
        );
    }
  }, [idoQueueDetail]);

  return (
    <div className="status w-full flex flex-col">
      <div className="status_head flex items-center justify-between">
        <span>Status</span>
        <div className="status_process">
          {/* <span>{process?.split('-').join(' ').toUpperCase()}</span> */}
          {/* <img src="/create/icon-upcoming.png" /> */}
          {renderIcon}
        </div>
      </div>
      <div className="status_memo_score">
        <img className="bot" src="/create/icon-bot.png" />
        <div className="status_process_detail flex flex-col items-start">
          <h3 className="flex items-center gap-x-1">
            MEMOO SCORE{' '}
            <ITooltip
              className="h-[12px]"
              placement="bottom"
              // title={`During the pre-launch stages, Memoo Score tracks :\nSocial Info\nCommunity Size\nCommunity Activity\nTop Up\nCreator Activity\nAfter the launch, Memoo Score additionally tracks :\nTotal Raised\nMarket Cap\nLiquidity\nHolders\nTwitter Score\nTrading Volume (24H)`}
              title="During the pre launch stages of the meme token, Memoo Score tracks Social Info, Community Size, Community Activity, Top Up & Creator Activity. After the launch of the meme token, Memoo Score additionally tracks Total Raised, Market Cap, Liquidity, Holders, Twitter Score & 24H Trading Volume. It is then aggregated to a score out of 100."
              color="#fff"
              bgColor="#4A5082"
            />
          </h3>
          <div className="flex items-end mt-3 mb-4">
            <span className="numerator">{memooScore}</span>
            <span className="denominator">/100</span>
          </div>
          <Progress className="status_memo_score_bar" showInfo={false} percent={Number(memooScore)} />
        </div>
      </div>
      {/* <p className="mt-3 consider">Might consider{'\n'}adding it to my wishlist.</p> */}
      <p className="mt-3 consider">{meMessage}</p>
      <div className="mt-4 intend flex justify-between">
        <p>MeMoo Score is an indicative metric.{'\n'}Users are advised to DYOR.</p>
        <ScoreShareModal meMessage={meMessage} memooScore={memooScore}>
          <IconTranspond className="outlink cursor-pointer" />
        </ScoreShareModal>
      </div>
    </div>
  );
}
