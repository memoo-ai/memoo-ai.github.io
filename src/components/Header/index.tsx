import { NavLink } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import ConnectWallet from './connectWallet';
import styles from './index.module.scss';
import NavMenu from '@/components/NavMenu';
import {
  IconMemoo,
  IconSearch,
  IconClear,
  IconBook,
  IconTwitter,
  IconTelegram,
  IconTriangle,
  IconClose,
} from '../icons';
import { Button } from '@radix-ui/themes';
import { useLogin } from '@/hooks/useLogin';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Input, Popover, Spin } from 'antd';
import './index.module.scss';
import { useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Swipe from '@/components/Swipe';
import { SearchTokenCreator } from '@/api/common';
import { SearchList } from '@/types';

import DefaultAvatar from '@/assets/imgs/default-avatar.png';
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
const Header = () => {
  const { loginMeme } = useLogin();
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeywords] = useState('');
  const [searchList, setSearchList] = useState<SearchList>();

  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const menusTop = useMemo(() => {
    return [
      { name: 'ABOUT', path: '/home', isActive: location.pathname === '/home' },
      { name: 'SCOREBOARD', path: '/join', isActive: location.pathname === '/join' },
      { name: 'APP', path: '/', isActive: location.pathname !== '/home' && location.pathname !== '/join' },
    ];
  }, [location.pathname]);

  const showSwipe = useMemo(() => {
    return location.pathname === '/' || location.pathname === '/gecko' || location.pathname === '/join';
  }, [location.pathname]);
  useEffect(() => {
    const headerElement = document.querySelector('.header');
    if (headerElement) {
      document.body.appendChild(headerElement);
    }
  }, []);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current?.contains(event.target as Node)) {
      setShowSearch(false);
      setShowSearchResult(false);
      setKeywords('');
      setSearchList({
        seachCreatorData: [],
        seachTokenData: [],
      });
    }
  };

  const search = debounce(async () => {
    setLoading(true);
    // TODO
    const { data } = await SearchTokenCreator(keyword);
    console.log('search', data.records);
    if (data) {
      setSearchList(data);
    }
    setShowSearchResult(true);
    setLoading(false);
  }, 1000);
  useEffect(() => {
    if (!keyword) {
      setShowSearchResult(false);
    }
    if (keyword) {
      search();
    }
    return () => {
      search.cancel();
    };
  }, [keyword]);

  const memeTokens = useMemo(() => {
    const tokenList = searchList?.seachTokenData ?? [];
    return (
      tokenList.length > 0 && (
        <div>
          <h3 className="font-404px text-[16px] text-green mb-[7px] leading-[20px]">Meme Tokens</h3>
          <div className="flex flex-col">
            {tokenList.slice(0, 3).map((item, index) => (
              <div
                className="flex items-center gap-x-[12px] rounded-[7px] px-[9px] py-[6px] cursor-pointer group hover:bg-[#2B526E]"
                key={index}
              >
                <img className="w-[25px] h-[25px] rounded-[50%]" src={item.icon} alt="" />
                <span className="font-OCR text-[14px] leading-[12px] text-white group-hover:text-green">
                  {item.tokenName}
                </span>
                <span className="font-OCR text-[10px] leading-[12px] text-white group-hover:text-green">
                  {item.ticker}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    );
  }, [searchList]);
  const creators = useMemo(() => {
    const creatorList = searchList?.seachCreatorData ?? [];
    return (
      creatorList.length > 0 && (
        <div>
          <h3 className="font-404px text-[16px] text-green mb-[7px] leading-[20px] mt-[23px] cursor-pointer ">
            CREATORS
          </h3>
          <div className="flex flex-col">
            {creatorList.slice(0, 3).map(
              (item, index) =>
                creatorList.length > 0 && (
                  <div
                    className="flex items-center gap-x-[12px] rounded-[7px] px-[9px] py-[6px] group hover:bg-[#2B526E]"
                    key={index}
                  >
                    <img className="w-[25px] h-[25px] rounded-[50%]" src={item.profileImage} alt="" />
                    <span className="font-OCR text-[14px] leading-[12px] text-white group-hover:text-green">
                      {item.userName}
                    </span>
                    {/* <span className="font-OCR text-[10px] leading-[12px] text-white group-hover:text-green">ticker</span> */}
                  </div>
                ),
            )}
          </div>
        </div>
      )
    );
  }, [searchList]);

  return (
    <header className={`${styles.header} z-[9999]`}>
      <div className={`${styles.headerTop} flex justify-between items-center`}>
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
        {!showSearch && (
          <div className="">
            <div className="flex items-center ml-[50px] ">
              <span className={`${styles.betaBtn}`}>BETA</span>
            </div>
          </div>
        )}
        <div className="flex items-center gap-x-[12px] flex-1 justify-end">
          {/* <Button onclick={loginMeme}> login</Button> */}
          {/* <Wallet /> */}
          {/* <WalletConnect /> */}
          {/* <div className="mr-[12px]" onMouseLeave={() => setShowSearch(false)}> */}
          <div
            ref={searchRef}
            className="flex-1 flex justify-end h-[46px]"
            onMouseLeave={() => {
              if (!keyword) {
                setShowSearch(false);
              }
            }}
          >
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
                  value={keyword}
                  onChange={(e) => {
                    setKeywords(e.currentTarget.value);
                  }}
                />
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setKeywords('');
                    setShowSearchResult(false);
                  }}
                >
                  {keyword ? <IconClose className="w-[10px] h-[10px]" /> : <IconClear />}
                </div>
                {showSearchResult && (
                  <div className={`${styles.searchResult} rounded-[15px] bg-[#1f3b4f]`}>
                    {memeTokens}
                    {creators}
                    {!searchList && (
                      <div
                        className={`${styles.noData} w-full font-OCR text-center text-[14px] text-[#fff]`}
                      >{`Your search didn't match any records`}</div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div
                className={`bg-[#1f3b4f] flex items-center justify-center p-[10px] ${styles.searchIcon}  rounded-[7px]`}
                onMouseOver={() => setShowSearch(true)}
              >
                <IconSearch />
              </div>
            )}
          </div>
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
