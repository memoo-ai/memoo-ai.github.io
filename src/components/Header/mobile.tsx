import { NavLink } from 'react-router-dom';
import ConnectWallet from './connectWallet';
import styles from './mobile.module.scss';
import NavMenu from '@/components/NavMenu';
import { IconMemoo, IconSearch, IconClear, IconBook, IconTwitter, IconTelegram, IconTriangle } from '../icons';
import { Button } from '@radix-ui/themes';
import { useLogin } from '@/hooks/useLogin';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { Input, Popover, Spin } from 'antd';
import './index.module.scss';
import { useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Swipe from '@/components/Swipe';
export interface MenuItem {
  name: string;
  path: string;
  target?: string;
}

export const menus: MenuItem[] = [
  { name: 'LaunchPad', path: '/' },
  { name: 'MemooGecko', path: '/gecko' },
  { name: 'Create', path: '/create_token' },
  // { name: 'Dashboard', path: '/dashboard' },
];
const gitBook = import.meta.env.VITE_LINK_GIT_BOOK;
const twitter = import.meta.env.VITE_LINK_TWITTER;
const telegram = import.meta.env.VITE_LINK_TELEGRAM;
const MobileHeader = () => {
  const { loginMeme } = useLogin();
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [list, setList] = useState([]);
  const onKeywordsChange = useCallback(
    debounce((e) => {
      setKeywords(e.currentTarget.value);
    }, 500),
    [],
  );

  const location = useLocation();

  const menusTop = useMemo(() => {
    return [
      { name: 'ABOUT', path: '/home', isActive: location.pathname === '/home' },
      { name: 'APP', path: '/', isActive: location.pathname !== '/home' },
    ];
  }, [location.pathname]);

  const showSwipe = useMemo(() => {
    return location.pathname === '/' || location.pathname === '/gecko';
  }, [location.pathname]);
  useEffect(() => {
    const headerElement = document.querySelector('.header');
    if (headerElement) {
      document.body.appendChild(headerElement);
    }
  }, []);

  return (
    <header className={`${styles.header} z-[9999]`}>
      {showSwipe && <Swipe direction="left" />}
      <div className={`${styles.headerContent} flex justify-between items-center gap-x-[24px]`}>
        <Spin spinning={loading} />
        <div className="flex items-center  gap-[3rem]">
          <a href="/home" className="flex items-center justify-center">
            <img src="/mobile-logo.svg" alt="Logo" />
          </a>
        </div>
        <div>
          <div className="flex items-center">
            <span className={`${styles.betaBtn}`}>BETA</span>
          </div>
        </div>
        <div className="flex items-center gap-[1rem]">
          <IconSearch />
          <ConnectWallet />
          <NavMenu
            menus={menus}
            handleOpen={(e) => {
              setShowMenu(e);
            }}
          />
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#5D64A2]" />

      <div className="flex items-center gap-x-[25px] mr-[80px]">
        {/* <img src="./SVG/icon-twitter.svg" className="w-8 cursor-pointer" alt="" /> */}
        <IconBook
          color="#131522"
          hoverColor="#131522"
          className="cursor-pointer w-[16px] h-[10px]"
          onClick={() => {
            window.open(gitBook, '_blank');
          }}
        />
        <IconTelegram
          className="cursor-pointer w-[12px] h-[10px]"
          color="#131522"
          hoverColor="#131522"
          onClick={() => {
            window.open(telegram, '_blank');
          }}
        />{' '}
        <IconTwitter
          className="cursor-pointer w-[13px] h-[10px]"
          color="#131522"
          hoverColor="#131522"
          onClick={() => {
            window.open(twitter, '_blank');
          }}
        />
      </div>
    </header>
  );
};

export default MobileHeader;
