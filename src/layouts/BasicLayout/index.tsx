import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';
import Header from '@/components/Header';
import Toast from '@/components/Toast';
import Footer from '@/components/Footer';
import MobilePage from './mobile';
import isMobile from 'is-mobile';
import { useEthersSigner } from '@/hooks/useEthers';
import { useAccountEffect } from 'wagmi';
import { useLogin } from '@/hooks/useLogin';
const BasicLayout: React.FC = () => {
  const signer = useEthersSigner({ chainId: Number(import.meta.env.VITE_NODE_CHAIN_ID) });
  const [connected, setConnected] = useState(false);
  const { loginMeme } = useLogin();
  useAccountEffect({
    onConnect(data) {
      setConnected(true);
    },
  });

  useEffect(() => {
    if (connected && signer && localStorage.getItem('meme_token')) {
      (async () => {
        const msg = String(Date.now());
        const rawSignature = await signer.signMessage(msg);
        console.log('rawSignature', rawSignature);
        // TODO
        await loginMeme();
        window.location.reload();
      })();
    }
  }, [connected, signer]);

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
