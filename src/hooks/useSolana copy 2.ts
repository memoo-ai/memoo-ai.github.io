import { useState, useEffect } from 'react';
import { MEMOO_TOKEN_STORAGE } from '@/constants';
// import { useWallet } from '@solana/wallet-adapter-react';
// import { useAccount as useWagmiAccount } from 'wagmi';

export const usePhantom = () => {
  const [pubKey, setPubKey] = useState(null);
  const getProvider = () => {
    if ('phantom' in window) {
      // @ts-ignore: Property 'phantom' does not exist on type 'Window & typeof globalThis'
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open('https://phantom.app/', '_blank');
    // return;
  };
  const provider = getProvider();

  const connectPhantom = async () => {
    try {
      const resp = await provider.connect({ onlyIfTrusted: true });
      // const resp = await provider.connect();
      console.log(resp.publicKey.toString());
      setPubKey(resp.publicKey.toString());
      // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
    } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
    }
  };
  useEffect(() => {
    if (!provider) return;

    // Store user's public key once they connect
    provider.on('connect', (publicKey: any) => {
      console.log('connect: ', publicKey);
      setPubKey(publicKey);
    });

    // Forget user's public key once they disconnect
    provider.on('disconnect', () => {
      setPubKey(null);
      localStorage.removeItem(MEMOO_TOKEN_STORAGE);
    });
  }, [provider]);

  const getSign = async () => {
    console.log('getSign');
    // // eslint-disable-next-line no-debugger
    // debugger;
    console.log('provider:', provider);
    if (!provider) return;
    const msg = String(Date.now());
    const encodedMessage = new TextEncoder().encode(msg);
    const rawSignature = await provider.signMessage(encodedMessage, 'utf8');

    return { rawSignature, msg };
  };

  return {
    getProvider,
    provider,
    connectPhantom,
    pubKey,
    getSign,
  };
};
