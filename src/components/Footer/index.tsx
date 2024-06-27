import type { ReactNode } from 'react';
import React from 'react';
import './index.scss';
import { IconTwitter, IconTelegram, IconVector, IconMemoo } from '@/components/icons';

interface FooterProps {
  children?: ReactNode;
}

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
          <IconVector className="cursor-pointer w-[47.24px] h-[34px]" />
          <IconTwitter
            className="cursor-pointer w-[40.24px] h-[33.92px]"
            onClick={() => {
              window.open('https://x.com/MemooAI', '_blank');
            }}
          />
          <IconTelegram className="cursor-pointer w-[36.06px] h-[33.75px]" />
        </div>
      </div>
      <div className="footerCopyright">
        <img src="/img-powered-base.png" alt="" className="w-[167px] h-[18px]" />
        <p className="font-OCR">Copyright © 2024 MeMoo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
