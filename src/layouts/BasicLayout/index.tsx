import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import Header from '@/components/Header';
import Toast from '@/components/Toast';
import Footer from '@/components/Footer';
import MobilePage from './mobile';
import isMobile from 'is-mobile';
import { useEthersSigner } from '@/hooks/useEthers';
import { useAccountEffect } from 'wagmi';
import { useLogin } from '@/hooks/useLogin';
import { MEMOO_TOKEN_STORAGE } from '@/constants';
import { useWallet } from '@solana/wallet-adapter-react';
import { usePhantom } from '@/hooks/useSolana';

const BasicLayout: React.FC = () => {
  const signer = useEthersSigner({ chainId: Number(import.meta.env.VITE_NODE_CHAIN_ID) });
  // const [connected, setConnected] = useState(false);
  const { loginMeme } = useLogin();
  const { connected, publicKey } = useWallet();
  const { pubKey } = usePhantom();
  const location = useLocation();
  const navigate = useNavigate();
  // useAccountEffect({
  //   onConnect(data) {
  //     setConnected(true);
  //   },
  //   onDisconnect() {
  //     localStorage.removeItem(MEMOO_TOKEN_STORAGE);
  //     window.location.reload();
  //   },
  // });

  useEffect(() => {
    if (connected && !localStorage.getItem(MEMOO_TOKEN_STORAGE)) {
      (async () => {
        // if (!signer) return;
        // const msg = String(Date.now());
        // const rawSignature = await signer.signMessage(msg);
        // console.log('rawSignature', rawSignature);
        // // TODO
        await loginMeme();
        window.location.reload();
      })();
    }
  }, [connected, signer]);
  // const whitelist = ['/', '/launchpad', '/gecko'];
  // useEffect(() => {
  //   (async () => {
  //     // if (location.pathname === '/') return;
  //     if (whitelist.includes(location.pathname)) return;

  //     if (!localStorage.getItem(MEMOO_TOKEN_STORAGE)) {
  //       await loginMeme();
  //       navigate('/');
  //     }
  //   })();
  // }, [location]);

  return (
    <div>
      {isMobile() && <MobilePage />}
      {!isMobile() && (
        <>
          <Header />
          <Toast />
          <div className={styles.content}>
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default BasicLayout;
