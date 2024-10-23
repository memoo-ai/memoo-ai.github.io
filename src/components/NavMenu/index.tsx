import React from 'react';
import { useState, useEffect } from 'react';
import { IconHamburgerMenu, IconCross, IconClose } from '@/components/icons';
import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.scss';

interface MenuItem {
  name: string;
  path: string;
  target?: string;
}

interface MobileNavMenuProps {
  menus: MenuItem[];
  handleOpen?: (isOpen: boolean) => void;
  showSwipe?: boolean;
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({ menus, handleOpen, showSwipe }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    handleOpen?.(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none lg:hidden">
          {isOpen ? (
            <div className="h-[30px] w-[30px] bg-green rounded-[4px] flex items-center justify-center">
              <IconClose color="#1F3B4F" hoverColor="#1F3B4F" />
            </div>
          ) : (
            <IconHamburgerMenu className="h-[30px] w-[30px]" />
          )}
        </button>
      </div>
      {isOpen && (
        <nav
          className={`${styles.easeAnimation} text-white fixed left-0 right-0 bottom-0 ${showSwipe ? 'top-[81px]' : 'top-[51px]'} bg-[#1F3B4F] p-8 gap-4 "`}
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
