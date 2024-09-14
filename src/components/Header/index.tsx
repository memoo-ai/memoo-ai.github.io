import { NavLink } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import ConnectWallet from './connectWallet';
import styles from './index.module.scss';
import NavMenu from '@/components/NavMenu';
import { IconMemoo, IconSearch, IconClear, IconVector, IconTwitter, IconTelegram, IconTriangle } from '../icons';
import { Button } from '@radix-ui/themes';
import { useLogin } from '@/hooks/useLogin';
import { useState, useCallback, useMemo } from 'react';
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

const Header = () => {
  const { loginMeme } = useLogin();
  // const [showSearch, setShowSearch] = useState(false);
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

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.headerTop} flex justify-end items-center`}>
        <div className="flex items-center gap-x-[25px] mr-[80px]">
          {/* <img src="./SVG/icon-twitter.svg" className="w-8 cursor-pointer" alt="" /> */}
          <IconVector color="#131522" hoverColor="#131522" className="cursor-pointer w-[16px] h-[10px]" />
          <IconTelegram
            className="cursor-pointer w-[12px] h-[10px]"
            color="#131522"
            hoverColor="#131522"
            onClick={() => {
              window.open('https://t.me/memooai_official', '_blank');
            }}
          />{' '}
          <IconTwitter
            className="cursor-pointer w-[13px] h-[10px]"
            color="#131522"
            hoverColor="#131522"
            onClick={() => {
              window.open('https://x.com/MemooAI', '_blank');
            }}
          />
        </div>
        <div className="flex items-center gap-x-[25px] mr-[15px]">
          {menusTop.map((item, index) => (
            <NavLink to={item.path} key={index} className="relative h-100% font-404px text-[10px] text-[#131522]">
              {item.name}
              {item.isActive && <IconTriangle className={`${styles.triangle}`} color="#131522" />}
            </NavLink>
          ))}
        </div>
      </div>
      <div className={`${styles.headerContent} flex justify-between items-center`}>
        <Spin spinning={loading} />
        <div className="flex items-center  gap-[3rem]">
          <a href="/home" className="flex items-center justify-center">
            <img src="/logo.svg" alt="Logo" className="w-[60px] h-[60px] mr-[8px]" />
            <IconMemoo className="" />
          </a>
        </div>
        <div className="md:flex hidden items-center  ml-[54px] mr-auto gap-6">
          {menus.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              target={item.target}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive && item.name !== 'Create' ? styles.active : undefined} ${
                  item.name === 'Create' ? styles.create : ''
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="flex-1">
          <div className="flex items-center ml-[50px] ">
            <span className={`${styles.betaBtn}`}>BETA</span>
          </div>
        </div>
        <div className="flex items-center gap-[1rem]">
          {/* <Button onclick={loginMeme}> login</Button> */}
          {/* <Wallet /> */}
          {/* <WalletConnect /> */}
          {/* <div className="mr-[12px]" onMouseLeave={() => setShowSearch(false)}> */}
          {/* <div className="mr-[12px]">
      {showSearch ? (
        <div
          className={`bg-[#1f3b4f] flex items-center justify-center p-[10px] ${
            showSearch ? styles.search : ''
          } rounded-[7px]`}
        >
          <IconSearch />
          <Input
            className={`border text-[14px] font-OCR pl-[10px] ${styles.searchInput}`}
            placeholder="Search Meme Tokens, Creators"
            onChange={(e) => {
              onKeywordsChange(e);
            }}
          />
          <IconClear />
          <Popover>
            <div className={`${styles.searchResult} rounded-[7px] bg-[#1f3b4f]`}>
              {list.length &&
                list.map((item, index) => (
                  <div className="p-[10px]" key={index}>
                    {item.icong}
                  </div>
                ))}
              {!list.length && (
                <div
                  className={`${styles.noData} w-[100%] font-OCR px-[19px] text-[14px] text-[#fff]`}
                >{`Your search didn't match any records`}</div>
              )}
            </div>
          </Popover>
        </div>
      ) : (
        <div
          className={`bg-[#1f3b4f] flex items-center justify-center p-[10px] ${styles.searchIcon}  rounded-[7px]`}
          onMouseOver={() => setShowSearch(true)}
        >
          <IconSearch />
        </div>
      )}
    </div> */}
          <ConnectWallet />
          <NavMenu menus={menus} />
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#5D64A2]" />
      {showSwipe && <Swipe direction="left" />}
    </header>
  );
};

export default Header;
