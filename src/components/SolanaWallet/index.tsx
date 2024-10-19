import { FC, useState, useEffect, Children, ReactNode, cloneElement, isValidElement } from 'react';
import { MEMOO_TOKEN_STORAGE } from '@/constants';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { SolanaPortalWalletTop, SolanaPortalWalletBottom } from '@/components/SolanaPortal';
import WalletLogo from '@/assets/imgs/wallet-logo.png';
import './index.scss';
import { useAccount } from '@/hooks/useWeb3';
const termAndConditions = import.meta.env.VITE_LINK_TERMS_AND_CONDITIONS;
const Wallet: FC<{ children: ReactNode }> = ({ children }) => {
  const [updatePortal, setUpdatePortal] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const { address } = useAccount();

  return (
    <div
      onClick={() => {
        setOpenModal(true);
        setUpdatePortal((count) => count + 1);
      }}
    >
      {address ? (
        <div>{children}</div>
      ) : (
        <WalletMultiButton className="!h-max box-border">
          {children}{' '}
          {openModal && (
            <div>
              <SolanaPortalWalletTop update={updatePortal}>
                <div className="flex items-center flex-column justify-center mt-[25px] ">
                  <img className="w-[142.11px] h-[167.2px]" src={WalletLogo} alt="" />
                </div>
                <div className="connect-to-memoo text-center mb-[21px]">Connect to MeMoo</div>
              </SolanaPortalWalletTop>
              <SolanaPortalWalletBottom update={updatePortal}>
                <div>
                  <p className="w-full font-OCR text-[#ffffff] text-[10px] leading-[16px] text-center whitespace-pre-wrap">
                    {`By connecting your wallet and using MeMoo,\nyou agree to our `}
                    <a href={termAndConditions} target="_blank" className="text-[#07E993] cursor-pointer text-center">
                      Terms of Service.
                    </a>
                    {/* and{' '} */}
                    {/* <span className="text-[#07E993]">Privacy Policy.</span> */}
                  </p>
                </div>
              </SolanaPortalWalletBottom>
            </div>
          )}
        </WalletMultiButton>
      )}
    </div>
  );
};

export default Wallet;
