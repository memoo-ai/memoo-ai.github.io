import { Connection, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';
import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token';

const useTransfer = () => {
  const { publicKey, sendTransaction } = useWallet();
  const connection = new Connection('https://api.testnet.solana.com');

  const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
  // const tokenAccount = new PublicKey('HX4bcUho7mNZL3NCBAzDKhoVjJzXibY1A1Wfr568wzBU');
  const tokenAccount = new PublicKey('Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr');
  const ownerAccount = new PublicKey('HX4bcUho7mNZL3NCBAzDKhoVjJzXibY1A1Wfr568wzBU');

  const transfer = useCallback(
    // async (toPublickey: PublicKey, amount: number) => {
    async () => {
      try {
        if (!publicKey) {
          return;
        }
        // eslint-disable-next-line no-debugger
        // debugger;
        const tx = new Transaction();
        tx.add(createTransferInstruction(tokenAccount, new PublicKey(publicKey), new PublicKey(ownerAccount), 1000000));

        const signTransaction = await sendTransaction(tx, connection);

        const transactionSignature = await connection.sendRawTransaction(signTransaction.serialize());
        console.log('signTransaction:', signTransaction);
      } catch (e) {
        console.log(e);
      }
    },
    [publicKey],
  );

  return {
    transfer,
  };
};

export default useTransfer;
