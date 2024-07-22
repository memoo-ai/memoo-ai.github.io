import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { MEMOO_TOKEN_STORAGE } from '@/constants';

export const useSolanaWallet = () => {
  const { publicKey, connected, signMessage, connect, disconnect } = useWallet();
  const [pubKey, setPubKey] = useState(null);

  useEffect(() => {
    if (connected && publicKey) {
      setPubKey(publicKey.toString());
    } else {
      setPubKey(null);
      localStorage.removeItem(MEMOO_TOKEN_STORAGE);
    }
  }, [connected, publicKey]);

  const connectWallet = useCallback(async () => {
    try {
      await connect();
    } catch (err) {
      console.error('Failed to connect wallet:', err);
    }
  }, [connect]);

  const getSign = useCallback(async () => {
    if (!connected) return;

    try {
      const msg = String(Date.now());
      const encodedMessage = new TextEncoder().encode(msg);
      const rawSignature = await signMessage(encodedMessage);
      return { rawSignature, msg };
    } catch (err) {
      console.error('Failed to sign message:', err);
    }
  }, [connected]);

  return {
    connectWallet,
    pubKey,
    getSign,
    isConnected: connected,
    disconnect,
  };
};
