import { useState } from 'react';
import './meme-records.scss';
import { Button } from 'antd';
const MemeRecords = () => {
  return (
    <div className="meme-records">
      <div className="meme-records-title text-[30px] leading-[16px] text-[#F7EEB5] font-404px">Meme Records</div>
      <p className="absolute top-[196px] left-[196px] text-[20px] leading-[16px] text-[#F7EEB5] font-404px">
        PROOF OF CREATION
      </p>
      <p className="absolute top-[196px] right-[196px] text-[20px] leading-[16px] text-[#F7EEB5] font-404px">
        PROOF OF PURCHASE
      </p>
      {/* <div className="meme-records-content">
        <div className="meme-records-content-item">
          <div className="meme-records-content-item-title">Total Memes</div>
          <div className="meme-records-content-item-value">0</div>
        </div>
      </div> */}

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
