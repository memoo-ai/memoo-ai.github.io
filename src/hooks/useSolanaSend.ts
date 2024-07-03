import React, { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, clusterApiUrl, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useTransaction } from '@/utils/solanaWeb3/sendTransactionConfirmed';
import { useCallback } from 'react';
const Transfer = () => {
  const { publicKey, sendTransaction } = useWallet();
  const [toPublicKey, setToPublicKey] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const { sendTransactionConfirmed } = useTransaction();

  const handleTransfer = useCallback(async () => {
    try {
      if (!publicKey) {
        setMessage('Connect to wallet first');
        return;
      }
      const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');

      const toPubKey = new PublicKey('EAM6xqsHBWiPKoPqajV6mmqFEbHKkumK5CaqjyWXEx9t');

      const lamports = parseFloat('0.001') * LAMPORTS_PER_SOL;
      // eslint-disable-next-line no-debugger
      // debugger;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: toPubKey,
          lamports,
        }),
      );

      const signature = await sendTransaction(transaction, connection);
      console.log(signature);

      setMessage(`Transaction successful with signature: ${signature}`);
    } catch (error) {
      setMessage(`Transaction failed: ${error.message}`);
    }
  }, [publicKey]);
  return { handleTransfer };
};

export default Transfer;
