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
    if (meme.scoreField === 'Top Up') {
      return meme.scoreValue === 4 ? 'Loaded' : 'Just Enough';
    }
    if (meme.scoreField === 'Total Raised') {
      const scoreValue = getFullNum(meme.scoreValue ?? 0);
      const totalScore = getFullNum(meme.totalScore ?? 0);
      const result = (Number(scoreValue) / Number(totalScore)).toFixed(0);
      // return `${(Number(scoreValue) / Number(totalScore)) * 100}%`;
      return result && Number(result) > 0 ? `${result ?? 0 * 100}%` : 'NA';
    }
    if (messages[meme.scoreValue]) {
      return messages[meme.scoreValue];
    }
    return 'NA';
  };

  return (
    <div className="memoo-score-breakdown px-[22px] pt-[33px] pb-[37px] mt-[11px]">
      <div className="font-404px text-[18px]   text-green">MeMoo Score Breakdown</div>
      <div>
        <ul className="basic_list mt-14 flex flex-col gap-y-3">
          {idoQueueDetail?.memooScore &&
            Array.isArray(idoQueueDetail.memooScore) &&
            idoQueueDetail?.memooScore.map((meme) => (
              <li key={meme.scoreField} className="grid grid-cols-12">
                <label className="col-span-3 font-OCR text-[14px] text-[#7D83B5] w-[125px]">{meme.scoreField}</label>
                <div className="flex items-center col-span-6">
                  <IProgress className="w-[214px]" percent={(meme.scoreValue / meme.totalScore) * 100} />
                  <div className="font-OCR text-[14px] text-[#fff] ml-[11px]">{getMessage(meme ?? 0)}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
    // <div className="memoo-score-breakdown px-[22px] pt-[33px] pb-[37px] mt-[11px]">
    //   <div className="font-404px text-[18px] text-green">MeMoo Score Breakdown</div>
    //   <div className="memoo-score-breakdown__content flex flex-col items-start mt-[11px]">
    //     {idoQueueDetail?.memooScore &&
    //       Array.isArray(idoQueueDetail.memooScore) &&
    //       idoQueueDetail?.memooScore.map((meme) => {
    //         return (
    //           <div className="flex items-center mt-[14px] leading-[16px]" key={meme.scoreField}>
    //             <div className="font-OCR text-[14px] text-[#7D83B5] w-[125px]">{meme.scoreField}</div>

    //           </div>
    //         );
    //       })}
    //   </div>
    // </div>
  );
};
export default MeMooScoreBreakdown;
