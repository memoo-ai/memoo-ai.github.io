import { Button, DropdownMenu } from '@radix-ui/themes';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useAccountEffect } from 'wagmi';

// import { handleCopy } from '@/utils';
import {
  IconProfile,
  IconWalletContentCreator,
  IconWalletContentCollector,
  IconWalletContentWatchList,
  IconWalletContentLogout,
  IconWalletContentProfile,
} from '@/components/icons';
import './walletConnect.scss';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectModalPortal from './connectModalPortal';
import ConnectModalPortalTop from './connectModalPortalTop';
import { MEMOO_TOKEN_STORAGE } from '@/constants';
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
  {
    name: 'WatchList',
    path: '/dashboard',
    type: 'WatchList',
    icon: IconWalletContentWatchList,
  },
];
if (import.meta.env.MODE === 'development') {
  opts.unshift({
    name: 'Profile',
    path: '/dashboard',
    type: 'Profile',
    icon: IconWalletContentProfile,
  });
}
const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connectors, disconnect } = useDisconnect();
  const navigate = useNavigate();
  const iconRefs = useRef<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onDisconnect = async () => {
    if (isConnected || address) {
      for (const connector of connectors) {
        // maybe multi connectors. disconnct all.
        await disconnect({ connector });
      }
      await disconnect();
      // window.location.reload();
      console.log('=====================>disconnect');
      localStorage.removeItem(MEMOO_TOKEN_STORAGE);
    }
  };

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    variant="soft"
                    onClick={() => {
                      openConnectModal();
                      setIsModalOpen(true);
                    }}
                    className="wallet-border cursor-pointer hidden md:block text-center text-lg  md:h-[51px] px-6 md:bg-[#1F3B4F] md:text-[#07E993] font-bold font-404px"
                  >
                    Connect Wallet
                    {isModalOpen && (
                      <ConnectModalPortalTop
                        onClose={() => {
                          setIsModalOpen(false);
                        }}
                      >
                        <div className="flex items-center flex-column justify-center mt-[-30px]">
                          <img className="w-[142.11px] " src="./walletContent/wallet-logo.png" alt="" />
                        </div>
                        <div className="connect-to-memoo text-center">Connect to MeMoo</div>
                      </ConnectModalPortalTop>
                    )}
                    {isModalOpen && (
                      <ConnectModalPortal
                        onClose={() => {
                          setIsModalOpen(false);
                        }}
                      >
                        <div>
                          <p className="w-[320px] font-OCR text-[#ffffff]">
                            By connecting your wallet and using MeMoo, you agree to our{' '}
                            <span className="text-[#07E993]">Terms of Service</span> and{' '}
                            <span className="text-[#07E993]">Privacy Policy.</span>
                          </p>
                        </div>
                      </ConnectModalPortal>
                    )}
                  </Button>
                );
              }

              // if (chain.unsupported) {
              //   return (
              //     <Button variant="soft" onClick={openChainModal}>
              //       {account.address.slice(0, 6)}...{account.address.slice(-4)}
              //     </Button>
              //   );
              // }

              return (
                <div className="flex items-center">
                  <div className=" wallet-border flex items-center justify-center w-[192px] h-[46px] bg-[#1F3B4F] rounded-lg mr-4 font-404px font-bold text-[#07E993] text-lg">
                    {account.address.slice(0, 6)}...{account.address.slice(-4)}
                  </div>
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
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnect;
