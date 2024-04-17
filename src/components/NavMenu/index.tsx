import React from 'react';
import { useState, useEffect } from 'react';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.scss';

interface MenuItem {
  name: string;
  path: string;
  target?: string;
}

interface MobileNavMenuProps {
  menus: MenuItem[];
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({ menus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none lg:hidden">
          {isOpen ? <Cross1Icon className="h-6 w-6" /> : <HamburgerMenuIcon className="h-6 w-6" />}
        </button>
      </div>
      {isOpen && (
        <nav
          className={`${styles.easeAnimation} text-white fixed left-0 right-0 bottom-0 top-[88px] bg-black bg-opacity-90 p-8 gap-4 "`}
        >
          <ul className="flex flex-col">
            {menus.map((item, index: number) => (
              <Link to={item.path} key={index} target={item.target} className="py-2 font-bold text-lg	">
                {item.name}
              </Link>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default MobileNavMenu;
