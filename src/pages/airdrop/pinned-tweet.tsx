import './pinned-tweet.scss';
import { FC, useContext } from 'react';
import IProgress from '@/components/IProgress';
import { AirdropContext } from '.';
import { memooScore } from '@/types';
import { getFullNum } from '@/utils';
import Masonry from 'react-masonry-css';
import { IconTwitterAuth } from '@/components/icons';

const PinnedTweet: FC = () => {
  const { idoQueueDetail } = useContext(AirdropContext);

  return (
    <div className="pinned-tweet px-[22px] pt-[33px] pb-[37px] mt-[11px]">
      <img className="mb-[23px]" src="/create/pinned-tweet-logo.png" alt="" />
      <Masonry breakpointCols={2} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {/* array of JSX items */}
        {idoQueueDetail?.pinnedTwitterData &&
          idoQueueDetail?.pinnedTwitterData.map((item, index) => {
            return (
              <div key={index} className="my-masonry-grid-item">
                <div className="flex items-center">
                  <img className="w-[40px] h-[40px] rounded-[50%] mr-[10px]" src={item.profileImageUrl} alt="" />
                  <div>
                    <h3 className="flex items-center gap-x-[10px] text-[16px] font-OpenSans font-bold text-white">
                      {item.name} <IconTwitterAuth className="w-[16px] h-[16px]" />
                    </h3>
                    <p className="text-[14px] text-white">@{item.username}</p>
                  </div>
                </div>
                <p className="font-OpenSans text-[11px] text-[#FFFFFF] leading-4 mt-[13px]">{item.text}</p>
                <div className="flex justify-between items-center mt-[26px]">
                  <span className="text-[#B53BFF] text-[12px] leading-[14px] font-Montserrat font-medium">
                    {item.twitterMsgCreatedAt}
                  </span>
                  <span className="text-[#B53BFF] text-[12px] leading-[14px] font-Montserrat font-medium flex items-center gap-[6px]">
                    <img src="/create/pinned-tweet-like.png" alt="" />
                    {item.likeCount}
                  </span>
                </div>
              </div>
            );
          })}
      </Masonry>
    </div>
  );
};
export default PinnedTweet;
