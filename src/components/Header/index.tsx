import { Link, NavLink } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import styles from './index.module.scss';
import NavMenu from '@/components/NavMenu';
import { useState } from 'react';
export interface MenuItem {
  name: string;
  path: string;
  target?: string;
}

export const menus: MenuItem[] = [
  { name: 'MemeGecko', path: '/gecko' },
  { name: 'LaunchPad', path: '/launchpad' },
  { name: 'Create', path: '/' },
];

export default () => {
  return (
    <header className={`${styles.header} flex justify-between items-center z-[999]`}>
      <div className="flex items-center  gap-[3rem]">
        <a href="/">
          <img src="./logo.svg" alt="Logo" className="w-[200px] h-[70px]" />
        </a>
      </div>
      <div className="md:flex hidden items-center  ml-[54px] mr-auto">
        {menus.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            target={item.target}
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : undefined}`}
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
