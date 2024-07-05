import React from 'react';
import './index.scss';

interface BannerBoxProps {
  children: React.ReactNode;
  background: string;
  title: string;
}

const BannerBox = ({ children, background, title }: BannerBoxProps) => {
  return (
    <div className="banner-box" style={{ background: `url(${background}) no-repeat`, backgroundSize: 'cover' }}>
      <h5 className="banner-box-title font-404px text-[#07E993] text-[16px]">{title}</h5>
      {children}
    </div>
  );
};

export default BannerBox;
