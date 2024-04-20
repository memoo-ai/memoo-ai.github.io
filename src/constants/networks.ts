import { createConfig, http } from 'wagmi';
import type { Chain } from '@wagmi/core/chains';
import { mainnet, base } from '@wagmi/core/chains';
import { Address, defineChain, createClient } from 'viem';
import { connectorsForWallets, getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  walletConnectWallet,
  okxWallet,
  rabbyWallet,
  metaMaskWallet,
  injectedWallet,
} from '@rainbow-me/rainbowkit/wallets';
// import { walletConnect } from 'wagmi/connectors';
import { BinanceWallet } from './wallet/binanceWallet';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';
export const projectId = import.meta.env.VITE_PROJECT_ID;
// if (!projectId) {
//   throw new Error('VITE_PROJECT_ID is not set');
// }

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        injectedWallet,
        // rainbowWallet,
        // gateWallet, // hide gate for now
        okxWallet,
        // BinanceWallet,
        // rabbyWallet,
        metaMaskWallet,
        // walletConnectWallet,
      ],
    },
  ],
  {
    appName: 'Memoo',
    projectId: projectId,
  },
);

const metadata = {
  name: 'MeMoo',
  description: 'The ultimate memecoin infrastructure',
  url: 'https://memoo.io',
  icons: ['../../public/img/favicon.png'],
};
const chains = [base] as readonly [Chain, ...Chain[]];
// export const config = getDefaultConfig({
//   appName: 'zklink Nova',
//   projectId: projectId,
//   chains: chains,
//   ssr: false, // If your dApp uses server side rendering (SSR)
// });

export const wagmiDefaultConfig = createConfig({
  chains: chains,
  connectors: [
    // injected(),
    // metaMask(),
    // safe(),
    ...connectors,
    // walletConnect({
    //   projectId,
    //   metadata,
    //   showQrModal: true,
    // }),
  ],
  multiInjectedProviderDiscovery: true,
  client: ({ chain }) => {
    return createClient({ chain, transport: http() });
  },
});
