import './index.scss';
import KingsIcon from '@/assets/imgs/kings-icon.png';
import KingsBg from '@/assets/imgs/kings-bg.png';
import DefaultBannerBg from '@/assets/imgs/profile-default-banner-bg.png';
import CardBg from '@/assets/imgs/card-bg.png';
import { IconCollect } from '@/components/icons';
import IProgress from '@/components/IProgress';
import { Button } from 'antd';
import Countdown from '@/pages/airdrop/countdown';
import { useNavigate } from 'react-router-dom';
import Empty from '@/components/Empty';

interface KingsCardsProps {
  btnText?: string;
  btnType?: string;
  path?: string;
  data: any[];
}
const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
const KingsCards = ({ btnText = 'Airdrop', btnType = '', path = 'airdrop', data }: KingsCardsProps) => {
  const navigate = useNavigate();
  // const data = new Array(3).fill(undefined).map((_, i) => ({
  //   id: i,
  //   address: 'Rg7GG...kf9Lj7' + i,
  //   tokenName: 'tokenName',
  //   ticker: 'Tick',
  //   banner: '',
  //   icon: '',
  //   description: 'description',
  // }));
  return (
    <div className="w-[100%] pb-[81px]" style={{ background: `url(${KingsBg}) no-repeat`, backgroundSize: 'cover' }}>
      <div className="flex items-center my-[42px]">
        <span className="font-404px text-green text-[24px] mr-[20px]">KINGS OF THE LAND</span>
        <img className="w-[121px] h-[106px]" src={KingsIcon} alt="" />
      </div>
      <div className="kings-cards flex items-center gap-[22px]">
        {data && data.length > 0 ? (
          data.slice(0, 3).map((item) => {
            return (
              <div
                className="kings-cards-item flex flex-col"
                style={{ background: `url(${CardBg}) no-repeat`, backgroundSize: 'cover' }}
                key={item.ticker}
              >
                <div className="kings-cards-item-banner">
                  <img
                    className="w-[100%] h-[158px] rounded-tl-[15px] rounded-tr-[15px] "
                    src={item?.banners[0] ? item.banners[0] : DefaultBannerBg}
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
                  <p className="my-[26px] font-OCR text-[14px] border_b text-[#7D83B5] h-[48px]">{item.description}</p>
                  <div className="py-[24px]">
                    <div className="flex justify-between items-center">
                      <div className="font-OCR text-[14px] text-[#7D83B5] line-[13px]">Ends in</div>
                      <div className="text-right">
                        <Countdown
                          className=" flex gap-x-2 mt-5 font-OCR text-[18px] text-[#fff] line-[13px]"
                          timefragments="timefragments-kings"
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
                          instant={(item.endsIn || item.airdropEndsIn * 1000) ?? 0}
                          // instant={1720510654000}
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
                      <IProgress className="w-[83px]" percent={(item.contributed / item.maxContributed) * 100} />
                      <div className="font-OCR text-[18px] text-[#fff] line-[13px]  text-right">
                        {item.contributed}/{item.maxContributed} {tokenSymbol}
                      </div>
                    </div>
                  </div>

                  <Button
                    className={`memoo_button w-[100%] h-[56px] rounded-[7px] ${btnType}`}
                    onClick={() => navigate(`/${path}/${item.ticker}`)}
                  >
                    {btnText}
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-[100%]">
            <Empty />
          </div>
        )}
      </div>
    </div>
  );
};
export default KingsCards;
