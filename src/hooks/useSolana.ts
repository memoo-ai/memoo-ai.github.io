import { useState, useEffect, useCallback } from 'react';
import { MEMOO_TOKEN_STORAGE } from '@/constants';
import { useWallet } from '@solana/wallet-adapter-react';

export const useSolana = () => {
  const { publicKey, wallet, connect, disconnect, signMessage } = useWallet();

  const uint8ArrayToBase64 = (uint8Array: any) => {
    let binaryString = '';
    const bytes = new Uint8Array(uint8Array);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binaryString += String.fromCharCode(bytes[i]);
    }
    return btoa(binaryString);
  };

  const getSign = useCallback(async () => {
    if (!wallet || !signMessage) return;
    const msg = String(Date.now());
    const encodedMessage = new TextEncoder().encode(msg);
    const rawSignature = await signMessage(encodedMessage);
    return { rawSignature: uint8ArrayToBase64(rawSignature), msg };
  }, [wallet, signMessage]);

  return {
    connect,
    disconnect,
    getSign,
  };
};
