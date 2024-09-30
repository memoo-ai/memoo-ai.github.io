import { useState } from 'react';
import { IconSearch } from '@/components/icons';
import './index.scss';
import { Input } from 'antd';
import { useCallback } from 'react';
const Join = () => {
  const [keyword, setKeyword] = useState('');

  const search = useCallback(async () => {
    // TODO
    console.log('keyword:', keyword);
  }, [keyword]);

  return (
    <div className="page join flex flex-col items-center">
      <div className="join-bg" />
      <div className="join-content flex flex-col items-center">
        <h3 className="mt-[37px] font-404px text-[16px] leading-[10px] text-white">Incentivized early access</h3>
        <h3 className="font-404px text-[38px] text-green">MEMOO REWARDS SCOREBOARD</h3>
        <h3 className="font-404px text-[16px] leading-[10px] text-green">SEASON 1</h3>
        <h5 className="mt-[25px] font-OCR text-[14px] leading-[14px] text-white">Check your points</h5>
        <div className="join-search flex items-center mt-[8px] bg-[#1F3B4F] rounded-[7px] ">
          <Input placeholder="Search by address" onChange={(e) => setKeyword(e.currentTarget.value)} />
          <div className="w-[54px] flex items-center justify-center icon h-full cursor-pointer" onClick={search}>
            <IconSearch />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Join;
