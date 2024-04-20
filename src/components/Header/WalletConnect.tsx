import { Button, DropdownMenu } from '@radix-ui/themes';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { useAccount, useDisconnect } from 'wagmi';
import { handleCopy } from '@/utils';
import { IconProfile } from '@/components/icons';
import './walletConnect.scss';
const explorerURL = import.meta.env.VITE_EXPLORER_URL;

export default () => {
  const { address, isConnected } = useAccount();
  const { connectors, disconnect } = useDisconnect();
  const onDisconnect = async () => {
    if (isConnected || address) {
      for (const connector of connectors) {
        // maybe multi connectors. disconnct all.
        await disconnect({ connector });
      }
      await disconnect();
      console.log('=====================>disconnect');
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
                    onClick={openConnectModal}
                    className="cursor-pointer hidden md:block text-center text-lg  md:h-[51px] px-6 md:bg-[#CC0000] md:text-[#FFFFFF] font-bold font-Montserrat"
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button variant="soft" onClick={openChainModal}>
                    {account.address.slice(0, 6)}...{account.address.slice(-4)}
                  </Button>
                );
              }

              return (
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-[192px] h-[46px] bg-[#CC0000] rounded-lg mr-4 font-Montserrat font-bold text-[#fff] text-lg">
                    {account.address.slice(0, 6)}...{account.address.slice(-4)}
                  </div>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <div>
                        {/* <img src="./icon-profile.svg" alt="" /> */}
                        <IconProfile className="cursor-pointer" />
                      </div>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content className="wallet-dropdown-menu bg-[#fff]" align="end" sideOffset={20}>
                      <div className="divider-x" />
                      <DropdownMenu.Item className="mb-6 hover:bg-[#F2F2F2] py-2 h-10 cursor-pointer">
                        <div className="flex items-center">
                          <div className="flex justify-center items-center w-[40px]">
                            <img src="./icon-profile-user.svg" alt="" className="w-[16.8px] h-[19px] mr-4" />
                          </div>
                          <span className="font-Montserrat font-bold text-lg leading-5 text-[#000]">Profile</span>
                        </div>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="hover:bg-[#F2F2F2] mb-6 py-2 h-10  cursor-pointer">
                        <div className="flex items-center">
                          <div className="flex justify-center items-center w-[40px]">
                            <img src="./icon-profile-eye.svg" alt="" className="w-[26.3px] h-[17px] mr-4" />
                          </div>
                          <span className="font-Montserrat font-bold text-lg leading-5 text-[#000]">Watchlist</span>
                        </div>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="hover:bg-[#F2F2F2] mb-10 py-2 h-10  cursor-pointer">
                        <div className="flex items-center">
                          <div className="flex justify-center items-center w-[40px]">
                            <img src="./icon-profile-setting.svg" alt="" className="w-[22px] h-[22.68px] mr-4" />
                          </div>
                          <span className="font-Montserrat font-bold text-lg leading-5 text-[#000]">Settings</span>
                        </div>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onClick={onDisconnect}
                        className="hover:bg-[#F2F2F2] mt-3 py-2 h-10  cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="flex justify-center items-center w-[40px]">
                            <img src="./icon-profile-logout.svg" alt="" className="w-[22.2px] h-[22.2px] mr-4" />
                          </div>
                          <span className="font-Montserrat font-bold text-lg leading-5 text-[#000]">Log Out</span>
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
