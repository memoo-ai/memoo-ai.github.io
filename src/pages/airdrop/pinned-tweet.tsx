import './pinned-tweet.scss';
import { FC, useContext } from 'react';
import IProgress from '@/components/IProgress';
import { AirdropContext } from '.';
import { memooScore } from '@/types';
import { getFullNum } from '@/utils';
import Masonry from 'react-masonry-css';

const PinnedTweet: FC = () => {
  const { idoQueueDetail } = useContext(AirdropContext);
  const list = [
    {
      name: 'Top Up',
      twitter: '0',
      content:
        'It’s the first time in 3 years I’m actuas the first time in 3 years I’m actuas the first time in 3 years I’m actuas the first time in 3 years I’m actuas the first time in 3 years I’m actuas the first time in 3 years I’m actuas the first time in 3 years I’m actuas the first time in 3 years I’m actually impressed and using what an altcoin project is building. However I’m really not of a onchain degen/active lad, only doing some fun stuff',
      time: '6:57 pm · 18 Jun 2023',
      star: 55,
    },
    {
      name: 'Top Up',
      twitter: '0',
      content:
        'It’s the first time in 3 years I’m actually impressed and using what an altcoin project is building. However I’m really not of a onchain degen/active lad, only doing some fun stuff',
      time: '6:57 pm · 18 Jun 2023',
      star: 55,
    },
    {
      name: 'Top Up',
      twitter: '0',
      content:
        'It’s the first time in 3 years I’m actually impressed and using what an altcoin project is building. However I’m really not of a onchain degen/active lad, only doing some fun stuff',
      time: '6:57 pm · 18 Jun 2023',
      star: 55,
    },
    {
      name: 'Top Up',
      twitter: '0',
      content:
        'It’s the first time in 3 years I’m actually impressed and using what an altcoin project is building. However I’m really not of a onchain degen/active lad, only doing some fun stuff',
      time: '6:57 pm · 18 Jun 2023',
      star: 55,
    },
  ];
  return (
    <div className="pinned-tweet px-[22px] pt-[33px] pb-[37px] mt-[11px]">
      <img className="mb-[23px]" src="/create/pinned-tweet-logo.png" alt="" />
      <Masonry breakpointCols={2} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {/* array of JSX items */}
        {list.map((item, index) => {
          return (
            <div key={index} className="my-masonry-grid-item">
              <div className="flex items-center">
                <img src="/create/icon-bot.png" alt="" />
                <div>
                  <h3>Price</h3>
                  <p>@Price</p>
                </div>
              </div>
              <p className="font-OpenSans text-[11px] text-[#FFFFFF] leading-4 mt-[13px]">{item.content}</p>
              <div className="flex justify-between items-center mt-[26px]">
                <span className="text-[#B53BFF] text-[12px] leading-[14px] font-Montserrat font-medium">
                  {item.time}
                </span>
                <span className="text-[#B53BFF] text-[12px] leading-[14px] font-Montserrat font-medium flex items-center gap-[6px]">
                  <img src="/create/pinned-tweet-like.png" alt="" />
                  {item.star}
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
