import './memoo-score-breakdown.scss';
import { FC, useContext } from 'react';
import IProgress from '@/components/IProgress';
import { AirdropContext } from '.';
import { memooScore } from '@/types';
import { getFullNum } from '@/utils';
const MeMooScoreBreakdown: FC = () => {
  const { idoQueueDetail } = useContext(AirdropContext);
  // const { memooScore } = useContext(AirdropContext);
  const getMessage = (meme: memooScore): string => {
    const messages: { [key: number]: string } = {
      1: 'Mild',
      2: 'OK',
      3: 'Fairly Good',
      4: 'Good',
      5: 'Very good',
      6: 'Exceptional',
    };
    if (meme.scoreField === 'Top Up' || meme.totalScore === 4) {
      return meme.scoreValue === 4 ? 'Just Enough' : 'Loaded';
    }
    if (meme.scoreField === 'Total Raised') {
      const scoreValue = getFullNum(meme.scoreValue ?? 0);
      const totalScore = getFullNum(meme.totalScore ?? 0);
      const result = (Number(scoreValue) / Number(totalScore)).toFixed(0);
      // return `${(Number(scoreValue) / Number(totalScore)) * 100}%`;
      return `${result ?? 0 * 100}%`;
    }
    if (messages[meme.scoreValue]) {
      return messages[meme.scoreValue];
    }
    return 'NA';
  };

  return (
    <div className="memoo-score-breakdown px-[22px] pt-[33px] pb-[37px] mt-[11px]">
      <div className="font-404px text-[18px] text-green">MeMoo Score Breakdown</div>
      <div className="memoo-score-breakdown__content flex flex-col items-start mt-[11px]">
        {idoQueueDetail?.memooScore &&
          Array.isArray(idoQueueDetail.memooScore) &&
          idoQueueDetail?.memooScore.map((meme) => {
            return (
              <div className="flex items-center mt-[14px] leading-[16px]" key={meme.scoreField}>
                <div className="font-OCR text-[14px] text-[#7D83B5] w-[125px]">{meme.scoreField}</div>
                <IProgress className="w-[214px]" percent={(meme.scoreValue / meme.totalScore) * 100} />
                <div className="font-OCR text-[14px] text-[#fff] ml-[11px]">{getMessage(meme ?? 0)}</div>
              </div>
            );
          })}
        {/* <div className="flex items-center mt-[14px] leading-[16px]">
          <div className="font-OCR text-[14px] text-[#7D83B5] w-[125px]">Community Size</div>
          <IProgress className="w-[214px]" />
          <div className="font-OCR text-[14px] text-[#fff] ml-[11px]">{getMessage('4')}</div>
        </div>
        <div className="flex items-center mt-[14px] leading-[16px]">
          <div className="font-OCR text-[14px] text-[#7D83B5] w-[125px]">
            {' '}
            Community
            <br />
            Activity
          </div>
          <IProgress className="w-[214px]" />
          <div className="font-OCR text-[14px] text-[#fff] ml-[11px]">{getMessage('3')}</div>
        </div>
        <div className="flex items-center mt-[14px] leading-[16px]">
          <div className="font-OCR text-[14px] text-[#7D83B5] w-[125px]">Top Up</div>
          <IProgress className="w-[214px]" percent={100} />
          <div className="font-OCR text-[14px] text-[#fff] ml-[11px]">{getMessage('6')}</div>
        </div>
        <div className="flex items-center mt-[14px] leading-[16px]">
          <div className="font-OCR text-[14px] text-[#7D83B5] w-[125px]">Creator Activity</div>
          <IProgress className="w-[214px]" />
          <div className="font-OCR text-[14px] text-[#fff] ml-[11px]">Good</div>
        </div>
        <div className="flex items-center mt-[14px] leading-[16px]">
          <div className="font-OCR text-[14px] text-[#7D83B5] w-[125px]">Total Raised</div>
          <IProgress className="w-[214px]" />
          <div className="font-OCR text-[14px] text-[#fff] ml-[11px]">Good</div>
        </div>
        <div className="flex items-center mt-[14px] leading-[16px]">
          <div className="font-OCR text-[14px] text-[#7D83B5] w-[125px]">Market Cap</div>
          <IProgress className="w-[214px]" />
          <div className="font-OCR text-[14px] text-[#fff] ml-[11px]">Good</div>
        </div>
        <div className="flex items-center mt-[14px] leading-[16px]">
          <div className="font-OCR text-[14px] text-[#7D83B5] w-[125px]">Liquidity</div>
          <IProgress className="w-[214px]" />
          <div className="font-OCR text-[14px] text-[#fff] ml-[11px]">Good</div>
        </div>
        <div className="flex items-center mt-[14px] leading-[16px]">
          <div className="font-OCR text-[14px] text-[#7D83B5] w-[125px]">Holders</div>
          <IProgress className="w-[214px]" percent={0} />
          <div className="font-OCR text-[14px] text-[#fff] ml-[11px]">{getMessage('0')}</div>
        </div> */}
      </div>
    </div>
  );
};
export default MeMooScoreBreakdown;
