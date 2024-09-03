import '@radix-ui/themes/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import './assets/styles/global.scss';
import { Suspense, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { wagmiDefaultConfig } from './constants/networks';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import { ConfigProvider } from 'antd';
import routeConfig from './router';
import Loading from './components/Loading';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets';

// const { network, endpoint, wallets } = solanaNetwork();
const App = () => {
  const basename = '/';
  const router = createBrowserRouter(routeConfig, {
    basename,
  });
  const root = createRoot(document.querySelector('#app')!);
  const queryClient = new QueryClient();
  // debugger; // eslint-disable-line no-debugger
  // const network = import.meta.env.VITE_WALLET_ADAPTER_NETWORK; // Use WalletAdapterNetwork.Mainnet for mainnet
  // const endpoint = clusterApiUrl(network);
  const network = import.meta.env.VITE_RPC_URL;
  const endpoint = import.meta.env.VITE_RPC_URL;

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network }), new TorusWalletAdapter()],
    [network],
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WagmiProvider config={wagmiDefaultConfig}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider
                locale="en-US"
                modalSize="compact"
                theme={darkTheme({
                  accentColor: '#07E993',
                  accentColorForeground: '#2e3036',
                  borderRadius: 'small',
                  fontStack: 'system',
                  overlayBlur: 'small',
                })}
              >
                <Theme appearance="dark" accentColor="green">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: '#07E993',
                        borderRadius: 2,
                        colorBgContainer: '#f6ffed',
                      },
                    }}
                  >
                    <Suspense fallback={<Loading />}>
                      <RouterProvider router={router} />
                    </Suspense>
                  </ConfigProvider>
                </Theme>
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
const root = createRoot(document.querySelector('#app')!);
root.render(<App />);
