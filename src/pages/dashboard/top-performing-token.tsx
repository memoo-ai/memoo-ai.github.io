/* eslint-disable react/no-unstable-nested-components */
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
      // {
      //   key: 'Token Info',
      //   value: '',
      //   formatValue: (value: string) => (
      //     <div
      //       className="col-span-6 bg-[#252841] rounded-[7px] relative mt-[33px] cursor-pointer"
      //       onClick={() => navigate(`/airdrop/${memeTop?.ticker}`)}
      //     >
      //       <div className="flex items-center  ">
      //         <img className="w-[67px] h-[67px] rounded-[50%] mr-[7px]" src={memeTop?.icon} alt="" />
      //         <div>
      //           <h5 className="font-OCR text-[#fff] font-[18px]">{memeTop?.tokenName} </h5>
      //           <span className="font-OCR text-[#07E993] font-[14px]">{memeTop?.ticker}</span>
      //         </div>
      //       </div>
      //       <span className="absolute bottom-2 right-5 text-[#7D83B5] text-[10px] font-OCR">View Token Profile</span>
      //     </div>
      //   ),
      // },
      {
        key: 'Market Cap',
        value: memeTop?.marketCap ?? '',
      },
      { key: 'ATH Market Cap', value: `$${memeTop?.athMarketCap ?? 0}` },
      { key: 'Holders', value: memeTop?.holders ?? 0 },
      { key: 'Holders Growth', value: `${memeTop?.holdersGrowth ?? 0}` },
    ];
  }, [memeTop]);

  return (
    <div className="top-performing-token flex-auto px-5 pt-9 pb-5 mt-[22px]">
      <div className="top-performing-token_head flex items-center font-404px text-[#07E993] font-[18px]">
        <span>TOP PERFORMING TOKEN</span>
      </div>
      <ul className="flex flex-col gap-y-6">
        <li className="grid grid-cols-12">
          <label className="col-span-3 text-bluish-purple-light text-sm font-OCR leading-4 pt-[33px]">Token Info</label>
          <div
            className="col-span-6 bg-[#252841] rounded-[7px] relative mt-[33px] cursor-pointer hover:bg-[#1f3b4f] token_info"
            onClick={() => {
              if (memeTop?.ticker) {
                navigate(`/airdrop/${memeTop?.ticker}`);
              }
            }}
          >
            <div className="flex items-center py-[18px] pl-[12px]">
              <img className="w-[67px] h-[67px] rounded-[50%] mr-[7px]" src={memeTop?.icon} alt="" />
              <div>
                <h5 className="font-OCR text-[#fff] font-[18px]">{memeTop?.tokenName} </h5>
                <span className="font-OCR text-[#07E993] font-[14px]">{memeTop?.ticker}</span>
              </div>
            </div>
            <span className="view-token-button py-[5.5px] px-[15px] absolute bottom-[7px] right-[7px] text-[#AEB1D1] text-[10px] leading-[10px] font-OCR">
              View Token Profile
            </span>
          </div>
        </li>
      </ul>
      <ul className="w-full mt-6 flex flex-col gap-y-6">
        {params.map((item) => (
          <li key={item.key} className="grid grid-cols-12">
            <label className="col-span-3 text-bluish-purple-light text-sm font-OCR leading-4 flex items-center gap-x-1.5">
              {item.key}
            </label>
            <var className="col-span-6 text-white text-lg font-OCR leading-5">{item.value}</var>
            {/* {item.formatValue ? (
              item.formatValue(item.value ?? '')
            ) : (
              <var className="col-span-6 text-white text-lg font-OCR leading-5">{item.value}</var>
            )} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

TopPerformingToken.displayName = TopPerformingToken.name;

export default TopPerformingToken;
