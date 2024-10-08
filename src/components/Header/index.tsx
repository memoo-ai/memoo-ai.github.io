import { NavLink, Link } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import styles from './index.module.scss';
import NavMenu from '@/components/NavMenu';
import { IconMemoo } from '../icons';
// import { useState } from 'react';
export interface MenuItem {
  name: string;
  path: string;
  target?: string;
}

export const menus: MenuItem[] = [
  { name: 'LaunchPad', path: '/' },
  { name: 'MemeGecko', path: '/gecko' },
  { name: 'Create', path: '/create_token' },
  // { name: 'Dashboard', path: '/dashboard' },
];

export default () => {
  return (
    <header className={`${styles.header} flex justify-between items-center z-[999]`}>
      <div className="flex items-center  gap-[3rem]">
        <Link to="/home" className="flex items-center justify-center">
          <img src="/logo.svg" alt="Logo" className="w-[60px] h-[60px] mr-[8px]" />
          <IconMemoo className="" />
        </Link>
      </div>
      <div className="md:flex hidden items-center  ml-[54px] mr-auto">
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
      <div className="flex items-center gap-[1rem]">
        <WalletConnect />
        <NavMenu menus={menus} />
      </div>
    </header>
  );
};
