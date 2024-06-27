import { Button, DropdownMenu } from '@radix-ui/themes';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// import { handleCopy } from '@/utils';
import {
  IconProfile,
  IconWalletContentCreator,
  IconWalletContentCollector,
  IconWalletContentWatchList,
  IconWalletContentLogout,
  IconWalletContentProfile,
  IconClose,
} from '@/components/icons';
import './connectWallet.scss';
import { useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEMOO_TOKEN_STORAGE } from '@/constants';
import { usePhantom } from '@/hooks/useSolana';
import { useLogin } from '@/hooks/useLogin';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { SolanaPortalTop, SolanaPortalBottom } from '@/components/SolanaPortal';

// const explorerURL = import.meta.env.VITE_EXPLORER_URL;
const opts = [
  // {
  //   name: 'Profile',
  //   path: '/dashboard',
  //   type: 'Profile',
  //   icon: IconWalletContentProfile,
  // },
  {
    name: 'Creator',
    path: '/dashboard',
    type: 'Creator',
    icon: IconWalletContentCreator,
  },
  {
    name: 'Collector',
    path: '/dashboard',
    type: 'Collector',
    icon: IconWalletContentCollector,
  },
  // {
  //   name: 'WatchList',
  //   path: '/dashboard',
  //   type: 'WatchList',
  //   icon: IconWalletContentWatchList,
  // },
];
if (import.meta.env.MODE === 'development') {
  opts.unshift({
    name: 'Profile',
    path: '/dashboard',
    type: 'Profile',
    icon: IconWalletContentProfile,
  });

  opts.push({
    name: 'WatchList',
    path: '/dashboard',
    type: 'WatchList',
    icon: IconWalletContentWatchList,
  });
}
const ConnectWallet = () => {
  const { provider } = usePhantom();
  const navigate = useNavigate();
  const iconRefs = useRef<any>({});
  const [updatePortal, setUpdatePortal] = useState(0);
  const onDisconnect = async () => {
    await provider.disconnect();
    localStorage.removeItem(MEMOO_TOKEN_STORAGE);
  };
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    if (!connected) return;
    console.log('useWallet,connected:', connected);
  }, [connected, publicKey]);

  const address = useMemo(() => {
    const base58 = publicKey?.toBase58();
    return base58 ? base58.slice(0, 6) + '...' + base58.slice(-4) : '';
  }, [publicKey]);

  return (
    <div>
      {connected ? (
        <div className="flex items-center">
          {connected && (
            <div className=" wallet-border flex items-center justify-center w-[164px] h-[46px] bg-[#1F3B4F] rounded-lg mr-4 font-404px font-bold text-[#07E993] text-lg">
              {address}
            </div>
          )}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <div>
                <IconProfile className="cursor-pointer wallet-border rounded-[12px]" />
              </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="wallet-dropdown-menu bg-[#1F3B4F]" align="end" sideOffset={20}>
              <div className="divider-x" />

              {opts.map((opt) => (
                <DropdownMenu.Item
                  key={opt.type}
                  className="mb-6 hover:bg-[#07E993] text-[#FFFFFF] hover:text-[#1F3B4F] py-2 h-10 cursor-pointer"
                  onMouseOver={() => iconRefs.current[opt.type].setHovered(true)}
                  onMouseLeave={() => iconRefs.current[opt.type].setHovered(false)}
                  onClick={() => {
                    navigate(`${opt.path}?type=${opt.type}`);
                  }}
                >
                  <div className="flex items-center">
                    <div className="flex justify-center items-center w-[40px]">
                      <opt.icon ref={(ref) => (iconRefs.current[opt.type] = ref)} />
                    </div>
                    <span className="font-404px font-bold text-lg leading-5">{opt.name}</span>
                  </div>
                </DropdownMenu.Item>
              ))}
              <DropdownMenu.Item
                onClick={onDisconnect}
                className="hover:bg-[#07E993] text-[#FFFFFF] hover:text-[#1F3B4F] mt-3 py-2 h-10  cursor-pointer"
                onMouseOver={() => iconRefs.current['logout'].setHovered(true)}
                onMouseLeave={() => iconRefs.current['logout'].setHovered(false)}
              >
                <div className="flex items-center">
                  <div className="flex justify-center items-center w-[40px]">
                    <IconWalletContentLogout ref={(ref) => (iconRefs.current['logout'] = ref)} />
                  </div>
                  <span className="font-404px font-bold text-lg leading-5">Log Out</span>
                </div>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      ) : (
        <div onClick={() => setUpdatePortal((count) => count + 1)}>
          <WalletMultiButton className="w-[192px]">
            Connect Wallet
            {
              <SolanaPortalTop updatePortal={updatePortal}>
                {/* <div className="w-[366px] flex justify-end ">
                <IconClose className="" onClick={() => setIsModalOpen(false)} />
              </div> */}
                <div className="flex items-center flex-column justify-center mt-[25px] ">
                  <img className="w-[142.11px] " src="./walletContent/wallet-logo.png" alt="" />
                </div>
                <div className="connect-to-memoo text-center mb-[21px]">Connect to MeMoo</div>
              </SolanaPortalTop>
            }
            <SolanaPortalBottom updatePortal={updatePortal}>
              <div className="flex w-[366px] justify-between mt-[10px]">
                <p className=" font-OCR text-[#ffffff] text-[10px] text-left">
                  By connecting your wallet and using MeMoo, you <br /> agree to our{' '}
                  <span className="text-[#07E993]">Terms of Service</span> and{' '}
                  <span className="text-[#07E993]">Privacy Policy.</span>
                </p>
              </div>
            </SolanaPortalBottom>
          </WalletMultiButton>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
