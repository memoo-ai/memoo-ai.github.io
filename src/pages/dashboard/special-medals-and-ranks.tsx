import { useMemo } from 'react';
import './special-medals-and-ranks.scss';

const SpecialMedalsAndRanks = () => {
  const special = useMemo(() => {
    return [
      {
        category: 'Total Tokens Created',
        rank: '1',
        medal: 0,
      },
      {
        category: `Total Tokens with\n70+ Memoo Score`,
        rank: '1',
        medal: 1,
      },
      {
        category: 'ATH Market Cap',
        rank: '1',
        medal: 2,
      },
      {
        category: 'MeMoo Score ATH',
        rank: '1',
        medal: 3,
      },
      {
        category: 'ATH Holders',
        rank: '1',
        medal: 4,
      },
      {
        category: 'Cumulative MCAP',
        rank: '1',
        medal: 5,
      },
      {
        category: 'Cumulative ATH MCAP',
        rank: '1',
        medal: 1,
      },
      {
        category: 'Cumulative Holders',
        rank: '1',
        medal: 1,
      },
      {
        category: 'Holder Growth\n7 Days',
        rank: '1',
        medal: 1,
      },
      {
        category: 'Market Cap Growth\n7 Days',
        rank: '1',
        medal: 1,
      },
    ];
  }, []);
  return (
    <div className="special-medals-and-ranks flex-auto px-[22px] py-[33px]">
      <h3 className="font-404px text-[18px] leading-[16px] special-medals-and-ranks-title text-green pb-[22px]">
        Special Medals and Ranks
      </h3>
      <h2 className="font-Kitty text-[#EBCDFE] text-[32px] leading-[32px] text-center mt-[54px] mb-[45px]">
        Level UP!
      </h2>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="!w-full">
          <div className="flex items-center justify-between mb-[10px] px-[10px]">
            <th className="font-OCR text-[#07E993] text-[12px] leading-[16px] text-left w-[180px]">Category</th>
            <th className="font-OCR text-[#07E993] text-[12px] leading-[16px] text-left  pl-[48px]">Address</th>
            <th className="font-OCR text-[#07E993] text-[12px] leading-[16px] text-right  pl-[38px]">Rank</th>
          </div>
          <div className="w-full flex flex-col gap-y-[7px]">
            {special.map((item, index) => (
              <th
                key={index}
                className="flex items-center justify-between px-[10px] bg-[#2C1843] rounded-[7px] h-[40px]"
              >
                <tr className="font-OCR text-white text-[14px] leading-[16px] whitespace-pre-wrap w-[180px] text-left">
                  {item.category}
                </tr>
                <tr className="flex items-center w-[36px] h-[36px]">
                  <img src={`/level/medal${item.medal}.png`} />
                </tr>
                <tr>
                  <div className="flex items-center justify-start gap-x-[7px] bg-[#2C1844] rounded-[50px] join-border">
                    <span className="text-white text-[18px] leading-[18px] font-OCR">#1</span>
                  </div>
                </tr>
              </th>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialMedalsAndRanks;
