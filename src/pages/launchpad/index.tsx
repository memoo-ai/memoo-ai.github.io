import './index.scss';
import CommonBanner from '@/components/Banner';
import { useEffect, useState } from 'react';
import { Tabs } from 'antd';

import { ActiveIdoCard } from './card';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import BannerRightBox from '@/components/BannerRightBox';
import BannerBox from '@/components/BannerBox';
import GeckoBannerBg from '@/assets/imgs/gecko-banner-bg.png';
import LaunchpadAirdropBg from '@/assets/imgs/launchpad-airdrop-bg.png';
import MemooGeckoIcon from '@/assets/imgs/memoogecko.png';
import AirdropsIcon from '@/assets/imgs/airdrops.png';
import CreateTokensIcon from '@/assets/imgs/create-token.png';
import LaunchpadIcon from '@/assets/imgs/launchpad.png';
import { IconHorn } from '@/components/icons';
import LaunchPadImo from './launchpad-imo';
import LaunchPadAirdrop from './launchpad-airdrop';
import Swipe from '@/components/Swipe';

export type LaunchpadType = 'imo' | 'airdrop';
export default function LaunchPad() {
  const [activeKey, setActiveKey] = useState<LaunchpadType>('imo');
  const location = useLocation();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const type = query.get('type') as LaunchpadType;
    if (type) {
      setActiveKey(type);
    }
  }, [location.search]);

  const items = [
    {
      key: 'imo',
      label: 'IMO',
      children: <LaunchPadImo />,
    },
    {
      key: 'airdrop',
      label: 'Airdrop',
      children: <LaunchPadAirdrop />,
    },
  ];

  const banners = [
    {
      icon: MemooGeckoIcon,
      text: 'Memoogecko',
    },
    {
      icon: AirdropsIcon,
      text: 'Airdrops',
    },
    {
      icon: CreateTokensIcon,
      text: 'Create Tokens',
    },
    {
      icon: LaunchpadIcon,
      text: 'Launchpad',
    },
  ];

  const onChange = (e: any) => {
    setActiveKey(e);
    // onChangeType(e);
  };

  const options = [
    {
      value: '1',
      label: 'Not Identified',
    },
    {
      value: '2',
      label: 'Closed',
    },
    {
      value: '3',
      label: 'Communicated',
    },
    {
      value: '4',
      label: 'Identified',
    },
    {
      value: '5',
      label: 'Resolved',
    },
    {
      value: '6',
      label: 'Cancelled',
    },
  ];

  return (
    <div className="page">
      <div className="base-container">
        <div>
          <Swipe direction="left" />
        </div>
        <div className="flex justify-center mt-[60px] gap-x-5">
          <div className="w-[835px] h-[469px]">
            <BannerBox background={activeKey === 'imo' ? GeckoBannerBg : LaunchpadAirdropBg} title="MEMOOGECKO">
              {activeKey === 'imo' ? (
                <div className="pt-[60px] flex items-center flex-col">
                  <img className="w-[159px] h-[159px]" src="/logo.svg" alt="" />
                  <h3 className="font-Kitty mt-[13px] banner-title text-[40px]">Welcome to Memoo.</h3>
                  <h3 className="font-Kitty mt-[13px] banner-title text-[40px]">Trade, Hunt, Create, Launch.</h3>
                  <div className="flex items-center justify-center gap-[41px] mt-[-8px]">
                    {banners.map((banner) => {
                      return (
                        <div className="flex flex-col font-404px items-center justify-center" key={banner.text}>
                          <img className="w-[106px] h-[100px]" src={banner.icon} alt="" />
                          <p className="text-[16px] text-[#fff] font-OCR">{banner.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className=" flex items-start flex-col">
                  <img className="w-[309px] h-[292px]" src={AirdropsIcon} alt="" />
                  <div className="ml-[52px]">
                    <h3 className="font-Kitty mt-[13px] banner-title text-[40px]">Hunt For</h3>
                    <h3 className="font-Kitty mt-[13px] banner-title text-[40px]">Meme Token Airdrops.</h3>
                    <p className="font-OCR text-[20px] text-[#FFFFFF]">Collect Airdrops That Just Might 1000x.</p>
                  </div>
                </div>
              )}
            </BannerBox>
          </div>
          <div className="w-[406px] h-[470px]">
            <BannerRightBox title="POWERED ON">
              <div className="flex flex-col items-center w-[338px]">
                <div className="flex justify-center items-center w-[100%] mb-[11px]">
                  <IconHorn className="mr-[7px]" />
                  <span className="font-404px text-[16px] text-green">LIVE DEGEN ACTIVITY</span>
                </div>
                {/* <CarouselColumn /> */}
                <Swipe isScrolling={false} />
                {/* {list.map((item) => {
                  return (
                    <div
                      className="w-[100%] bg-[#2B526E] rounded-sm mb-[2px] px-[9px] py-[6px] flex items-center  cursor-pointer"
                      key={item.id}
                      onClick={() => navigate(`/airdrop/${item.ticker}`)}
                    >
                      <img className="w-[30px]" src="./temp/1.png" alt="" />{' '}
                      <span className="font-404px ml-[5px] text-[#fff] text-[12px]" style={{ color: getRandomColor() }}>
                        {item.address}
                      </span>
                    </div>
                  );
                })} */}
              </div>
            </BannerRightBox>
          </div>
        </div>
        <div className="pefer-errn">
          <p className="title font-Kitty text-[30px]">Are You a Meme Influencer?</p>
          <p className="font-OCR text-[14px] text-[#ffffff] content mt-[11px]">
            Click Here to Take the Test & Join Our Referral Program.
          </p>
        </div>
        <div className="flex items-center justify-between mt-[50px] mb-[30px]">
          <Tabs activeKey={activeKey} onChange={onChange} items={items} className="custom-tabs" />
        </div>
        <ActiveIdoCard />
        <CommonBanner
          title="Supercharge Your Meme Creation."
          desc="Create Your Very Own Meme Token Now."
          link="/create_token"
          linkText="BE A CREATOR"
        />
      </div>
    </div>
  );
}
