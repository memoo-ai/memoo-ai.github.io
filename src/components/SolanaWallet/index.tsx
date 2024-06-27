import { FC, useState, useEffect, Children, ReactNode, cloneElement, isValidElement } from 'react';
import { MEMOO_TOKEN_STORAGE } from '@/constants';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Wallet: FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <WalletMultiButton />
    </div>
  );
};

export default Wallet;
