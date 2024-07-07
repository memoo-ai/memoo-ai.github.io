import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
  getAssociatedTokenAddress,
  createMint,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  Connection,
  Keypair,
  ParsedAccountData,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { useCallback } from 'react';

const useSolana = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const getNumberDecimals = async (mintAddress: string): Promise<number> => {
    const info = await connection.getParsedAccountInfo(new PublicKey(mintAddress));
    const result = (info.value?.data as ParsedAccountData).parsed.info.decimals as number;
    return result;
  };
  const mintTokenSql = useCallback(async () => {
    if (!publicKey) {
      console.log('Wallet not connected!');
      return;
    }

    try {
      const mint = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';
      const fromPubkey = 'HX4bcUho7mNZL3NCBAzDKhoVjJzXibY1A1Wfr568wzBU';
      const toPubkey = 'Dd2wvcTj2WDB9RKCVZKKMSTuZFmmRCYxPEkriAfJj2mK';
      const TRANSFER_AMOUNT = 100;
      const fromTokenAccount = await getAssociatedTokenAddress(new PublicKey(mint), new PublicKey(fromPubkey));
      const toTokenAccount = await getAssociatedTokenAddress(new PublicKey(mint), new PublicKey(toPubkey));
      const transferInstruction = createTransferInstruction(
        fromTokenAccount,
        toTokenAccount,
        new PublicKey(fromPubkey),
        TRANSFER_AMOUNT * Math.pow(10, 6),
      );
      const transaction = new Transaction().add(transferInstruction);

      const signature = await sendTransaction(transaction, connection);
      const latestBlockhash = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        {
          signature,
          ...latestBlockhash,
        },
        'confirmed',
      );
    } catch (error) {
      console.error('Error sending tokens:', error);
    }
  }, [publicKey]);

  return {
    mintTokenSql,
  };
};

export default useSolana;
