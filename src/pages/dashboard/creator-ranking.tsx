import { useContext, useMemo, useRef } from 'react';
import './creator-ranking.scss';
import { Popover, Progress, Button } from 'antd';
import { IconTip, IconTranspond } from '@/components/icons';
import ITooltip from '@/components/ITooltip';
import CreatorRankingModal from './creator-ranking-modal';
import CreatorRankingShareModal from './creator-ranking-share-modal';
import ViewTokenRankingModal from './view-token-ranking-modal';
import { ProfileContext } from './profile';
export default function CreatorRanking() {
  const { mine } = useContext(ProfileContext);
  const iconRefs = useRef<any>({});
  const creatorRanks = useMemo(() => {
    return [
      {
        key: 'Total Tokens Created',
        value: 17,
      },
      {
        key: 'Total Tokens with\n70+ Memoo Score',
        value: 2,
      },
    ];
  }, []);

  return (
    // <div className="creator_ranking w-full flex flex-col min-h-[400px] max-h-[592px]">
    <div className="creator_ranking w-full flex flex-col min-h-[400px] mb-[15px]">
      <div className="creator_ranking_head flex items-center gap-x-[4px]">
        <span className="font-404px text-[18px] leading-[18px] text-green">CREATOR RANKING</span>{' '}
        <ITooltip
          placement="right"
          title={`During the pre launch stages of the meme token, Memoo Score tracks Social Info- Community Size Community Activity, Top Up & Creaton Activity- After the launch of the meme token- Memoo Score additionally tracks Total Raised- Market CapLiquidity- Holders, Twitter Score L 24H Trading Volume- It is then aggregated to a score out of 100.
`}
          color="#fff"
          bgColor="#4A5082"
        />
      </div>
      <div className="creator_ranking_memo_score w-[100%]">
        <CreatorRankingShareModal>
          <div
            className="bot w-[40px] h-[40px] rounded-[7px] bg-[#1F3B4F] flex items-center justify-center hover:bg-[#07E993] cursor-pointer"
            onMouseOver={() => iconRefs.current[`IconTranspond`].setHovered(true)}
            onMouseLeave={() => iconRefs.current[`IconTranspond`].setHovered(false)}
          >
            <IconTranspond
              className=" "
              color="#07E993"
              hoverColor="#1F3B4F"
              ref={(ref) => (iconRefs.current[`IconTranspond`] = ref)}
            />
          </div>
        </CreatorRankingShareModal>
        <div className="creator_ranking_process_detail flex flex-col items-center">
          <h3 className="flex items-center gap-x-1 mt-[32px]">MEME SUPERSTAR</h3>
          <img src="/level/level5.png" alt="" />

          {/* <div className="creator_ranking_btn flex items-center flex-col mt-[28px]">
            <h5 className="text-[#fff] font-OCR text-center">
              Claim $MOO reward for <br /> unlocking rank tier.
            </h5>
            <CreatorRankingModal>
              <Button className="w-[227px] h-[50px] mt-[18px]">CLAIM</Button>
            </CreatorRankingModal>
          </div> */}
          {/* <div className="creator_ranking_btn flex items-center flex-col mt-[28px]">
            <h5 className="text-[#7D83B5] font-OCR text-center">View other top dogs at</h5>
            <img className="mt-[6px]" src="./dashboard/memoogecko.png" alt="" />
            <ViewTokenRankingModal>
              <Button className="w-[227px] h-[50px] mt-[18px]">VIEW CREATOR RANKING</Button>
            </ViewTokenRankingModal>
          </div> */}
          <div className="w-full">
            {mine ? (
              <div className="flex flex-col items-start">
                <h5 className="font-404px text-[18px] leading-[18px] text-green mt-[13px]">TIER PROGRESSION</h5>
                <p className="whitespace-pre-wrap text-[#7D83B5]  text-[12px] leading-[14px] font-OCR">{`To level up, you must max out\nyour progress in both categories.`}</p>
                <div className="flex items-start w-[100%] flex-col">
                  <div className="flex flex-col gap-y-[16px] mt-[17px] w-full">
                    {creatorRanks.map((item) => {
                      return (
                        <div key={item.key}>
                          <h5 className="text-[14px] leading-[18px] font-OCR text-white">{item.key}</h5>
                          <Progress className="creator_ranking_memo_score_bar" showInfo={false} percent={item.value} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-y-[11px] mt-[50px] mb-[56px]">
                {creatorRanks.map((item) => {
                  return (
                    <div key={item.key} className="flex items-center justify-between w-full">
                      <span className="text-[#fff] font-OCR text-[14px] whitespace-pre-wrap">{item.key}</span>
                      <span className="text-[#fff] font-OCR text-[14px] w-[125px] h-[35px] bg-[#2C1843] border-purple rounded-[7px] flex items-center justify-center">
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
