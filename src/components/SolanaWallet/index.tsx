import { FC, useState, useEffect, Children, ReactNode, cloneElement, isValidElement } from 'react';
import { MEMOO_TOKEN_STORAGE } from '@/constants';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { SolanaPortalWalletTop, SolanaPortalWalletBottom } from '@/components/SolanaPortal';
import WalletLogo from '@/assets/imgs/wallet-logo.png';
import isMobile from 'is-mobile';

const Wallet: FC<{ children: ReactNode }> = ({ children }) => {
  const [updatePortal, setUpdatePortal] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      onClick={() => {
        setOpenModal(true);
        setUpdatePortal((count) => count + 1);
      }}
    >
      <WalletMultiButton>
        {children}{' '}
        {openModal && (
          <div>
            <SolanaPortalWalletTop update={updatePortal}>
              {isMobile() ? (
                <div>
                  <div className="flex items-center flex-column justify-center mt-[25px] ">
                    <img className="w-[41.14px] h-[41px]" src="/logo.svg" alt="" />
                  </div>
                  <div className="connect-to-memoo text-center mb-[26px] mt-[9px]">Connect to MeMoo LITE</div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center flex-column justify-center mt-[25px] ">
                    <img className="w-[142.11px] h-[167.2px]" src={WalletLogo} alt="" />
                  </div>
                  <div className="connect-to-memoo text-center mb-[21px] mt-[41px]">Connect to MeMoo</div>
                </div>
              )}
            </SolanaPortalWalletTop>
            <SolanaPortalWalletBottom update={updatePortal}>
              <div className="flex w-[366px] justify-between mt-[10px]">
                <p className=" font-OCR text-[#ffffff] text-[10px] text-left">
                  By connecting your wallet and using MeMoo, you <br /> agree to our{' '}
                  <span className="text-[#07E993]">Terms of Service</span> and{' '}
                  <span className="text-[#07E993]">Privacy Policy.</span>
                </p>
              </div>
            </SolanaPortalWalletBottom>
          </div>
        )}
      </WalletMultiButton>
    </div>
  );
};

export default Wallet;
