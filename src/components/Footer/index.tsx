import React, { ReactNode } from 'react';
import styles from './index.module.scss';

interface FooterProps {
  children?: ReactNode;
}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles['footerLogo']}>
        <img src="/logo.svg" alt="" className="w-[300px] h-[106px]" />
        <div className="flex items-center gap-6 mt-6">
          <img src="/SVG/icon-twitter.svg" className="w-8 cursor-pointer" alt="" />
          <img src="/SVG/icon-tg.svg" alt="" className="w-8 cursor-pointer" />
        </div>
      </div>
      <div className={styles['footerCopyright']}>
        <img src="/img-powered-base.png" alt="" className="w-[167px] h-[18px]" />
        <p>Copyright © 2024 MeMoo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
