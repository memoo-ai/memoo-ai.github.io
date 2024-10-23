import type { ReactNode } from 'react';
import React from 'react';
import './mobile.scss';
import { IconTwitter, IconTelegram, IconBook, IconMemoo, IconCoin } from '@/components/icons';

interface FooterProps {
  children?: ReactNode;
}
const gitBook = import.meta.env.VITE_LINK_GIT_BOOK;
const twitter = import.meta.env.VITE_LINK_TWITTER;
const telegram = import.meta.env.VITE_LINK_TELEGRAM;
const MobileFooter: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className="mobile-footer">
      <div className="flex flex-col items-center justify-center gap-y-[9px] h-full">
        <img src="/img-powered-solana.png" alt="" className="w-[107.3px] h-[10px]" />
        {/* <div className="flex items-center">
          <span className="font-REV text-[#AF8DC4] text-[12px] mr-[9px]">POWERED ON</span>{' '}
          <IconCoin color="#AF8DC4" iconColor="#AF8DC4" />{' '}
        </div> */}
        <p className="font-OCR text-[8px] leading-[8px] text-[#AF8DC4]">
          Copyright © 2024 MeMoo. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default MobileFooter;
