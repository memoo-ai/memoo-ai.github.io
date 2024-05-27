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
import { ConfigProvider } from 'antd';
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
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#07E993',
                borderRadius: 2,

                // 派生变量，影响范围小
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
  </WagmiProvider>,
);
