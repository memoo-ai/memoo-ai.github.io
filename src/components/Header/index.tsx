import { NavLink } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import ConnectWallet from './connectWallet';
import styles from './index.module.scss';
import NavMenu from '@/components/NavMenu';
import { IconMemoo, IconSearch, IconClear } from '../icons';
import { Button } from '@radix-ui/themes';
import { useLogin } from '@/hooks/useLogin';
import { useState, useCallback, useEffect } from 'react';
import { Input, Popover, Spin } from 'antd';
import './index.module.scss';
import debounce from 'lodash.debounce';
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

  // useEffect(() => {
  //   (async () => {
  //     if (!keywords) {
  //       setList([]);
  //       return;
  //     }
  //     setLoading(true);
  //     // To do
  //     const list = await Promise.all(
  //       Array.from(Array(10)).map(async (item, index) => {
  //         return {
  //           icong: index,
  //           name: index + 1,
  //         };
  //       }),
  //     );
  //     console.log(list);
  //     setList(list);
  //     setLoading(false);
  //   })();
  // }, [keywords]);

  return (
    <header
      className={`${styles.header} flex justify-between items-center z-[999]`}
      // onClick={() => setShowSearch(false)}
    >
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
    </header>
  );
};

export default Header;
