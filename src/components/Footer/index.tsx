import type { ReactNode } from 'react';
import React from 'react';
import './index.scss';
import { IconTwitter, IconTelegram, IconBook, IconMemoo, IconCoin } from '@/components/icons';

interface FooterProps {
  children?: ReactNode;
}
const gitBook = import.meta.env.VITE_LINK_GIT_BOOK;
const twitter = import.meta.env.VITE_LINK_TWITTER;
const telegram = import.meta.env.VITE_LINK_TELEGRAM;
const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className="footer hidden md:flex">
      <div className="footerLogo">
        <div className="flex items-center  gap-[3rem]">
          <a href="/" className="flex items-center justify-center">
            <img src="/logo.svg" alt="Logo" className="w-[106px] h-[106px] mr-[8px]" />
            <IconMemoo className="w-[174.53px] h-[68.48px]" />
          </a>
        </div>
        <div className="flex items-center gap-6 mt-6">
          <IconBook
            className="cursor-pointer w-[47.24px] h-[34px]"
            onClick={() => {
              window.open(gitBook, '_blank');
            }}
          />
          <IconTelegram
            className="cursor-pointer w-[36.06px] h-[33.75px]"
            onClick={() => {
              window.open(telegram, '_blank');
            }}
          />
          <IconTwitter
            className="cursor-pointer w-[40.24px] h-[33.92px]"
            onClick={() => {
              window.open(twitter, '_blank');
            }}
          />
        </div>
      </div>
      <div className="footerCopyright">
        <img src="/img-powered-solana.png" alt="" className="w-[167px] h-[18px]" />
        {/* <div className="flex items-center">
          <span className="font-REV text-[#AF8DC4] text-[12px] mr-[9px]">POWERED ON</span>{' '}
          <IconCoin color="#AF8DC4" iconColor="#AF8DC4" />{' '}
        </div> */}
        <p className="font-OCR">Copyright © 2024 MeMoo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
