/* eslint-disable react/no-unstable-nested-components */
import { useState, useMemo } from 'react';
import './meme-records.scss';
import { Button } from 'antd';
import ITooltip from '@/components/ITooltip';
import classNames from 'classnames';
const MemeRecords = () => {
  const memeRecords = useMemo(() => {
    return [
      {
        key: 'QUALIFIED PROJECTS',
        value: '2',
        max: false,
      },
      {
        key: 'RANKING MULTIPLIER',
        value: '100 X',
        max: false,
      },
      {
        key: 'TOTAL MOO EARNED',
        value: '1300442859',
        formatKey: (key: string) => {
          return (
            <div className="flex items-center gap-x-[5px]">
              <span className="text-green text-[20px] leading-[32.04px]">{key}</span>
              <ITooltip placement="bottom" title={` collected as IMO platform fee.`} color="#fff" bgColor="#2B526E" />
            </div>
          );
        },
        formatValue: (value: string) => {
          return <div className="text-[30px] text-white leading-[48.06px]">{Number(value).toLocaleString()}</div>;
        },
        max: true,
      },
      {
        key: 'PARTICIPATED PROJECTS',
        value: '37',
        max: false,
      },
      {
        key: 'TOTAL IMO CONTRIBUTION',
        value: '10.88 SOL',
        max: false,
      },
    ];
  }, []);

  return (
    <div className="meme-records">
      <div className="meme-records-title text-[30px] leading-[16px] text-[#F7EEB5] font-404px">Meme Records</div>
      <p className="absolute top-[196px] left-[196px] text-[20px] leading-[16px] text-[#F7EEB5] font-404px">
        PROOF OF CREATION
      </p>
      <p className="absolute top-[196px] right-[196px] text-[20px] leading-[16px] text-[#F7EEB5] font-404px">
        PROOF OF PURCHASE
      </p>
      <div className="flex items-center justify-center w-full h-[136px] gap-x-[13px] absolute top-[246px]">
        {memeRecords.map((item) => {
          return (
            <ul
              key={item.key}
              className={classNames(
                item.max ? 'w-[335px]' : 'w-[173px]',
                'flex flex-col items-center justify-center h-full',
              )}
            >
              <li className="font-404px text-[24px] leading-[38.45px] text-white">
                {item.formatValue ? item.formatValue(item.value) : item.value}
              </li>
              <li className="font-404px text-[12px] leading-[19.22px] text-[#BC60F4]">
                {item.formatKey ? item.formatKey(item.key) : item.key}
              </li>
            </ul>
          );
        })}
      </div>

      <div className="absolute top-[401px]">
        <div className="flex items-center gap-x-[9px] mt-[12px] pl-[142px]">
          <img src="/join/join-warning.png" alt="" />
          <p className="font-OCR text-[12px] leading-[12px] text-white whitespace-pre-wrap">
            {`Meme projects must have at least\n50 Memoo Score to be qualified.`}
          </p>
        </div>
      </div>
      <div className="absolute top-[401px] flex items-center justify-center w-full">
        <Button className="memoo_button reverse rounded-[7px] w-[301px] h-[50px] text-[16px]">CLAIM MOO REWARDS</Button>
      </div>
      <div className="absolute top-[515px] flex items-center justify-center w-full">
        <p className="whitespace-pre-wrap text-center py-[18px] px-[30px] text-[16px] leading-[16px] text-green font-OCR bg-[#1F3B4F] rounded-[7px] green-border">
          {`The more you participate in IMOs & meme projects\nyou create, the more MOO rewards you earn.`}
        </p>
      </div>
    </div>
  );
};

export default MemeRecords;
