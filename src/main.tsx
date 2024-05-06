import '@radix-ui/themes/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import './assets/styles/global.scss';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { wagmiDefaultConfig } from './constants/networks';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';

import routeConfig from './router';
import Loading from './components/Loading';

const basename = '/';
const router = createBrowserRouter(routeConfig, {
  basename,
});
const root = createRoot(document.querySelector('#app')!);
const queryClient = new QueryClient();

// debugger; // eslint-disable-line no-debugger

root.render(
  // <StrictMode>
  <WagmiProvider config={wagmiDefaultConfig}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <Theme appearance="dark" accentColor="green">
          <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
          </Suspense>
        </Theme>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>,
);
