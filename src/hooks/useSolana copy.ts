import { useState, useEffect } from 'react';
import { MEMOO_TOKEN_STORAGE } from '@/constants';
import { useWallet } from '@solana/wallet-adapter-react';
// import { useAccount as useWagmiAccount } from 'wagmi';

export const usePhantom = () => {
  const { connected, publicKey, disconnect, signMessage } = useWallet();

  const getSign = async () => {
    console.log('getSign');
    // // eslint-disable-next-line no-debugger
    // debugger;
    if (!connected && publicKey) return;
    const msg = String(Date.now());
    const encodedMessage = new TextEncoder().encode(msg);
    console.log('encodedMessage', encodedMessage);
    const rawSignature = await signMessage(encodedMessage);

    return { rawSignature, msg };
  };

  return {
    getSign,
  };
};
