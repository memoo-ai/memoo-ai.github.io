import type { ReactNode } from 'react';
import React from 'react';
import styles from './index.module.scss';
import { IconTwitter, IconTelegram, IconVector } from '@/components/icons';

interface FooterProps {
  children?: ReactNode;
}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles['footerLogo']}>
        <img src="./logo.svg" alt="" className="w-[300px] h-[106px]" />
        <div className="flex items-center gap-6 mt-6">
          <IconVector className="cursor-pointer w-8" hoverColor="#B53BFF" />
          <IconTwitter className="cursor-pointer w-8" hoverColor="#B53BFF" />
          <IconTelegram className="cursor-pointer w-8" hoverColor="#B53BFF" />
        </div>
      </div>
      <div className={styles['footerCopyright']}>
        <img src="./img-powered-base.png" alt="" className="w-[167px] h-[18px]" />
        <p className="font-404px">Copyright © 2024 MeMoo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
