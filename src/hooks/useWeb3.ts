import { useWallet } from '@solana/wallet-adapter-react';
import { useAccount as useWagmiAccount } from 'wagmi';

export const useAccount = () => {
  const { publicKey } = useWallet();
  const { address } = useWagmiAccount();

  if (publicKey) {
    return {
      address: publicKey?.toBase58(),
    };
  }
  return {
    address: null,
  };

  // return {
  //   address,
  // };
};
