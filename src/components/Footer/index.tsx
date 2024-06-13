import type { ReactNode } from 'react';
import React from 'react';
import './index.scss';
import { IconTwitter, IconTelegram, IconVector } from '@/components/icons';

interface FooterProps {
  children?: ReactNode;
}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className="footer hidden md:flex">
      <div className="footerLogo">
        <img src="/logo.svg" alt="" className="w-[300px] h-[106px]" />
        <div className="flex items-center gap-6 mt-6">
          <IconVector className="cursor-pointer w-8" hoverColor="#B53BFF" />
          <IconTwitter className="cursor-pointer w-8" hoverColor="#B53BFF" />
          <IconTelegram className="cursor-pointer w-8" hoverColor="#B53BFF" />
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
