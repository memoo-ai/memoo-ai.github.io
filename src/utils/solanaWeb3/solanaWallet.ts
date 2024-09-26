/* eslint-disable no-debugger */
import { ZERO, zeroBN } from '@/constants';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, Keypair, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

const useSolanaWallet = () => {
  const [balance, setBalance] = useState<BigNumber>(ZERO);
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    if (!publicKey || !connection) return;

    (async () => {
      // Query balance
      const balance = await connection.getBalance(publicKey);
      console.log('Solanabalance:', balance);
      setBalance(new BigNumber(balance).dividedBy(LAMPORTS_PER_SOL));
    })();
  }, [publicKey, connection]);

  return { balance };
};

export default useSolanaWallet;
