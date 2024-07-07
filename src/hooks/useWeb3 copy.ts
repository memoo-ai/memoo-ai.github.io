import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token';
import {
  Connection,
  Keypair,
  ParsedAccountData,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  clusterApiUrl,
} from '@solana/web3.js';
import { useCallback } from 'react';

const useWeb3 = () => {
  const { publicKey: address } = useWallet();
  const { connection } = useConnection();

  const getNumberDecimals = async (mintAddress: string): Promise<number> => {
    const info = await connection.getParsedAccountInfo(new PublicKey(mintAddress));
    const result = (info.value?.data as ParsedAccountData).parsed.info.decimals as number;
    return result;
  };

  const transfer = useCallback(async () => {
    if (!address) {
      console.log('Wallet not connected!');
      return;
    }

    try {
      const secret = import.meta.env.SECRET_KEY;
      const fromKeypair = Keypair.fromSecretKey(new Uint8Array(secret));
      const DESTINATION_WALLET = 'Dd2wvcTj2WDB9RKCVZKKMSTuZFmmRCYxPEkriAfJj2mK';
      // const DESTINATION_WALLET = '4bic8yotkfTsc4mVsW29bstWPKSGWjfh2qorvymfkr37';
      const MINT_ADDRESS = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';
      const TRANSFER_AMOUNT = 100;
      // eslint-disable-next-line no-debugger
      debugger;
      const sourceAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromKeypair,
        new PublicKey(MINT_ADDRESS),
        fromKeypair.publicKey,
      );
      // const sourceAccount = await getAssociatedTokenAddress(
      //   new PublicKey(MINT_ADDRESS),
      //   fromKeypair.publicKey,
      //   // connection,
      //   // fromKeypair,
      //   // new PublicKey(MINT_ADDRESS),
      //   // fromKeypair.publicKey,
      // );
      const destinationAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromKeypair,
        new PublicKey(MINT_ADDRESS),
        new PublicKey(DESTINATION_WALLET),
      );

      // const destinationAccount = await getAssociatedTokenAddress(
      //   new PublicKey(MINT_ADDRESS),
      //   new PublicKey(DESTINATION_WALLET),
      //   // connection,
      //   // fromKeypair,
      //   // new PublicKey(MINT_ADDRESS),
      //   // fromKeypair.publicKey,
      // );
      const numberDecimals = await getNumberDecimals(MINT_ADDRESS);
      const tx = new Transaction();
      tx.add(
        createTransferInstruction(
          sourceAccount.address,
          destinationAccount.address,
          fromKeypair.publicKey,
          TRANSFER_AMOUNT * Math.pow(10, numberDecimals),
        ),
      );
      const latestBlockHash = await connection.getLatestBlockhash('confirmed');
      tx.recentBlockhash = latestBlockHash.blockhash;
      const signature = await sendAndConfirmTransaction(connection, tx, [fromKeypair]);
      console.log(
        '\x1b[32m', // Green Text
        `Transaction Success!🎉`,
        `\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
      );
    } catch (error) {
      console.error('Error sending tokens:', error);
    }
  }, [address]);

  return {
    address,
    transfer,
  };

  // return {
  //   address,
  // };
};
export default useWeb3;
