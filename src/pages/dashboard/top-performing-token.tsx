import { useState, FC, useMemo, useContext } from 'react';
import './top-performing-token.scss';
import { Popover, Progress, Button } from 'antd';
import { IconTip, IconTranspond } from '@/components/icons';
import { clipAddress, formatTs, formatDecimals } from '@/utils';
import { ProfileContext } from './profile';
import { useNavigate } from 'react-router-dom';

const TopPerformingToken: FC = () => {
  const { memeTop } = useContext(ProfileContext);
  const navigate = useNavigate();

  const params = useMemo(() => {
    return [
      {
        key: 'Market Cap',
        value: memeTop?.marketCap ? memeTop?.marketCap : '',
      },
      { key: 'ATH Market Cap', value: `$${memeTop?.athMarketCap ?? 0}` },
      { key: 'Holders', value: memeTop?.holders ?? 0 },
      { key: 'Holders Growth', value: `${memeTop?.holdersGrowth ?? 0}` },
    ];
  }, [memeTop]);

  return (
    <div className="top-performing-token flex-auto px-5 pt-9 pb-5">
      <div className="top-performing-token_head flex items-center font-404px text-[#07E993] font-[18px]">
        <span>CREATOR RANKING</span>
      </div>
      <div
        className="top-performing-token_view bg-[#252841] rounded-[7px] relative mt-[33px] cursor-pointer"
        onClick={() => navigate(`/airdrop/${memeTop?.ticker}`)}
      >
        <div className="flex items-center  ">
          <img className="w-[67px] h-[67px] rounded-[50%] mr-[7px]" src={memeTop?.icon} alt="" />
          <div>
            <h5 className="font-OCR text-[#fff] font-[18px]">{memeTop?.tokenName} </h5>
            <span className="font-OCR text-[#07E993] font-[14px]">{memeTop?.ticker}</span>
          </div>
        </div>
        <span className="absolute bottom-2 right-5 text-[#7D83B5] text-[10px] font-OCR">View Token Profile</span>
      </div>
      <ul className="data_list flex flex-col gap-y-6 w-full mt-[33px]">
        {params.map((item) => (
          <li key={item.key} className="flex justify-between">
            <label className="text-bluish-purple-light text-sm font-OCR leading-4 flex items-center gap-x-1.5">
              {item.key}
            </label>
            <var className="text-white text-lg font-OCR leading-5">{item.value}</var>
          </li>
        ))}
      </ul>
      {/* <div className="divider h-px w-full bg-bluish-purple my-8" /> */}
    </div>
  );
};

TopPerformingToken.displayName = TopPerformingToken.name;

export default TopPerformingToken;
