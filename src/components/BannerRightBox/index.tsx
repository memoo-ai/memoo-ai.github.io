import React from 'react';
import './index.scss';
import DefaultBg from '@/assets/imgs/powered-bg.png';
import SolanaIcon from '@/assets/imgs/solana.png';
import InfoIcon from '@/assets/imgs/alert 1.png';
import { IconCoin } from '@/components/icons';

interface BannerRightBoxProps {
  children: React.ReactNode;
  background?: string;
  title?: string;
  icon?: string;
  infoIcon?: string;
}

const BannerRightBox = ({
  children,
  background = DefaultBg,
  title,
  icon = SolanaIcon,
  infoIcon = InfoIcon,
}: BannerRightBoxProps) => {
  return (
    <div className="banner-right-box" style={{ background: `url(${background}) no-repeat`, backgroundSize: 'cover' }}>
      <div className="banner-right-box-top flex flex-col items-center">
        <h5 className="font-404px text-[#07E993] text-[12px]">{title}</h5>
        {/* <img src={icon} alt="" /> */}
        <IconCoin />
      </div>
      <img className="info-icon" src={infoIcon} alt="" />
      <div className="banner-right-box-slot">{children}</div>
    </div>
  );
};

export default BannerRightBox;
