import { useState, useMemo } from 'react';
import './status.scss';
import { Popover, Progress } from 'antd';
import { IconTranspond } from '@/components/icons';
import ScoreShareModal from './score-share-modal';
import ITooltip from '@/components/ITooltip';
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
  const [process, setProcess] = useState<'in-queue' | 'active'>('in-queue');
  const p = 70;
  const meMessage = useMemo(() => MESSAGE_THRESHOLDS.find(([threshold]) => p <= threshold)?.[1] || 'GTFO!', [p]);

  return (
    <div className="status w-full flex flex-col">
      <div className="status_head flex items-center justify-between">
        <span>Status</span>
        <div className="status_process flex items-center">
          <span>{process?.split('-').join(' ').toUpperCase()}</span>
          <img src="/create/icon-upcoming.png" />
        </div>
      </div>
      <div className="status_memo_score">
        <img className="bot" src="/create/icon-bot.png" />
        <div className="status_process_detail flex flex-col items-start">
          <h3 className="flex items-center gap-x-1">
            memo score{' '}
            <ITooltip
              className="h-[12px] "
              placement="bottom"
              title="Lorem ipsum dolor sit amet consectetur adipiscing elit.
                Morbi fringilla ipsum turpisı sit amet tempus est malesuadased.
                Integer fringilla magnavel orci ultricies fermentum.
                Suspendisse sem est."
              color="#fff"
              bgColor="#4A5082"
            />
          </h3>
          <div className="flex items-end mt-3 mb-4">
            <span className="numerator">70</span>
            <span className="denominator">/100</span>
          </div>
          <Progress className="status_memo_score_bar" showInfo={false} percent={70} />
        </div>
      </div>
      {/* <p className="mt-3 consider">Might consider{'\n'}adding it to my wishlist.</p> */}
      <p className="mt-3 consider">{meMessage}</p>
      <div className="mt-4 intend flex justify-between">
        <p>MeMoo Score is an indicative metric.{'\n'}Users are advised to DYOR.</p>
        <ScoreShareModal>
          <IconTranspond className="outlink cursor-pointer" />
        </ScoreShareModal>
      </div>
    </div>
  );
}
