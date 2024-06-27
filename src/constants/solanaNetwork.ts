import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
// import { BsquaredTestnet } from './chains';

export const projectId = import.meta.env.VITE_PROJECT_ID;

export const solanaNetwork = () => {
  const network = import.meta.env.VITE_WALLET_ADAPTER_NETWORK;
  const endpoint = clusterApiUrl(network);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      // Add other wallet adapters here
    ],
    [network],
  );

  const metadata = {
    name: 'MeMoo',
    description: 'The ultimate memecoin infrastructure',
    url: 'https://memoo.io',
    icons: ['../../public/img/favicon.png'],
  };
  return {
    endpoint,
    wallets,
    network,
  };
};
