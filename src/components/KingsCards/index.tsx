import './index.scss';
import KingsIcon from '@/assets/imgs/kings-icon.png';
import KingsBg from '@/assets/imgs/kings-bg.png';
import DefaultBannerBg from '@/assets/imgs/profile-default-banner-bg.png';
import CardBg from '@/assets/imgs/card-bg.png';
import { IconCollect } from '@/components/icons';
import IProgress from '@/components/IProgress';
import { Button } from 'antd';
import Countdown from '@/pages/airdrop/countdown';

const KingsCards = () => {
  const data = new Array(3).fill(undefined).map((_, i) => ({
    id: i,
    address: 'Rg7GG...kf9Lj7' + i,
    tokenName: 'tokenName',
    ticker: 'Tick',
    banner: '',
    icon: '',
    description: 'description',
  }));
  return (
    <div className="pb-[81px]" style={{ background: `url(${KingsBg}) no-repeat`, backgroundSize: 'cover' }}>
      <div className="flex items-center my-[42px]">
        <span className="font-404px text-green text-[24px] mr-[20px]">KINGS OF THE LAND</span>
        <img className="w-[121px] h-[106px]" src={KingsIcon} alt="" />
      </div>
      <div className="kings-cards flex items-center gap-[22px] justify-between">
        {data.map((item) => {
          return (
            <div
              className="kings-cards-item flex flex-col"
              style={{ background: `url(${CardBg}) no-repeat`, backgroundSize: 'cover' }}
              key={item.ticker}
            >
              <div className="kings-cards-item-banner">
                <img
                  className="w-[100%] rounded-tl-[15px] rounded-tr-[15px] "
                  src={item.banner ? item.banner : DefaultBannerBg}
                  alt=""
                />
              </div>
              <div className="p-[25px]">
                <div className="flex items-center  box-border">
                  <img className="w-[87px] h-[84px] rounded-[50%] mr-[12px]" src={item.icon} alt="" />
                  <div>
                    {/* <IconCollect className="" color="#6D4F71" /> */}
                    <h5 className="font-OCR text-[18px] text-[#fff]">{item.tokenName}</h5>
                    <h5 className="font-OCR text-[12px] text-green">{item.ticker}</h5>
                  </div>
                </div>
                <p className="py-[26px] font-OCR text-[14px] border_b text-[#7D83B5]">{item.description}</p>
                <div className="py-[24px]">
                  <div className="flex justify-between items-center">
                    <div className="font-OCR text-[14px] text-[#7D83B5] line-[13px]">Ends in</div>
                    <div className=" w-[153px] text-right">
                      <Countdown
                        className=" flex gap-x-2 mt-5 font-OCR text-[18px] text-[#fff] line-[13px]"
                        format={([days, hours, minutes, seconds]) => [
                          <div key="hours">
                            <time>{hours}</time>
                            <span>H</span>
                          </div>,
                          <div key="minutes">
                            <time>{minutes}</time>
                            <span>M</span>
                          </div>,
                          <div key="seconds">
                            <time>{seconds}</time>
                            <span>S</span>
                          </div>,
                        ]}
                        instant={1720252240 * 1000}
                        onEnded={(ended) => {
                          // setEnded(ended);
                        }}
                        symbol=""
                      />
                    </div>
                  </div>
                  {/* <div className="flex justify-between items-center">
                    <div className="font-OCR text-[14px] text-[#7D83B5] line-[13px]">Memoo Score</div>
                    <IProgress className="w-[83px]" />
                    <div className="font-OCR text-[18px] text-[#fff] line-[13px] w-[153px] text-right">70/100</div>
                  </div> */}
                  <div className="flex justify-between items-center">
                    <div className="font-OCR text-[14px] text-[#7D83B5] line-[13px]">Total Raised</div>
                    <IProgress className="w-[83px]" />
                    <div className="font-OCR text-[18px] text-[#fff] line-[13px] w-[153px] text-right">
                      1.82/2.3 ETH
                    </div>
                  </div>
                </div>

                <Button className="memoo_button w-[100%] reverse h-[56px] rounded-[7px]">PARTICIPATE</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default KingsCards;
