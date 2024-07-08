import { Button, DropdownMenu } from '@radix-ui/themes';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useAccountEffect } from 'wagmi';

import { FC, useState, useEffect, Children, ReactNode, cloneElement, isValidElement } from 'react';
import { MEMOO_TOKEN_STORAGE } from '@/constants';
import ConnectModalPortal from '../Header/connectModalPortal';
import ConnectModalPortalTop from '../Header/connectModalPortalTop';

const Wallet: FC<{ children: ReactNode }> = ({ children }) => {
  const { address, isConnected } = useAccount();
  const { connectors, disconnect } = useDisconnect();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openConnectModal } = useConnectModal();
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
    <div>
      {openConnectModal ? (
        <div>
          <div onClick={openConnectModal}>{children}</div>
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
          {/* {Children.map(children, (child) => {
            if (isValidElement<{ onClick: () => void }>(child)) {
              return cloneElement(child, { onClick: () => openConnectModal });
            }
            return child;
          })} */}
        </div>
      ) : (
        <div> {children}</div>
      )}
    </div>
    // <ConnectButton.Custom>
    //   {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
    //     // Note: If your app doesn't use authentication, you
    //     // can remove all 'authenticationStatus' checks
    //     const ready = mounted && authenticationStatus !== 'loading';
    //     const connected =
    //       ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

    //     return (
    //       <div
    //         {...(!ready && {
    //           'aria-hidden': true,
    //           style: {
    //             opacity: 0,
    //             pointerEvents: 'none',
    //             userSelect: 'none',
    //           },
    //         })}
    //       >
    //         {(() => {
    //           if (!connected) {
    //             return (
    //               // <Button
    //               //   variant="soft"
    //               //   onClick={() => {
    //               //     openConnectModal();
    //               //     setIsModalOpen(true);
    //               //   }}
    //               //   className="cursor-pointer hidden md:block text-center text-lg  md:h-[51px] px-6   font-bold font-404px"
    //               // />
    //               <div
    //                 onClick={() => {
    //                   openConnectModal();
    //                   setIsModalOpen(true);
    //                 }}
    //               >
    //                 {children}
    //               </div>
    //             );
    //           }
    //         })()}
    //         {Children.map(children, (child) => {
    //           if (isValidElement<{ onClick: () => void }>(child)) {
    //             return cloneElement(child, { onClick: () => openConnectModal() });
    //           }
    //           return child;
    //         })}
    //       </div>
    //     );
    //   }}
    // </ConnectButton.Custom>
  );
};

export default Wallet;
