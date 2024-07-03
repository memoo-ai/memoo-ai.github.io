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

const useSolana = () => {
  const { publicKey } = useWallet();
  // const { connection } = useConnection();

  // const keypair = Keypair.generate();
  // console.log('Public Key:', keypair.publicKey.toString());
  // console.log('Private Key:', keypair.secretKey.toString());
  // const secret = [
  //   114, 206, 229, 172, 91, 255, 65, 28, 204, 38, 180, 245, 51, 157, 53, 114, 75, 66, 31, 186, 67, 54, 194, 10, 203,
  //   136, 196, 94, 64, 49, 236, 191, 108, 151, 183, 239, 49, 28, 167, 131, 208, 53, 161, 55, 100, 40, 30, 39, 197, 238,
  //   109, 12, 59, 141, 66, 140, 246, 57, 209, 106, 76, 48, 26, 28,
  // ];
  // const FROM_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(secret));
  // const QUICKNODE_RPC = 'https://example.solana-testnet.quiknode.pro/0123456/';

  const sendTokens = useCallback(async () => {
    if (!publicKey) {
      console.log('Wallet not connected!');
      return;
    }

    try {
      const keypair = Keypair.generate();
      // const secret = keypair.secretKey;
      const secret = [
        85, 128, 24, 172, 157, 138, 79, 194, 130, 27, 213, 197, 89, 104, 204, 100, 144, 182, 53, 120, 226, 193, 96, 250,
        107, 42, 242, 252, 22, 18, 163, 190, 245, 110, 123, 97, 114, 42, 77, 196, 92, 229, 228, 136, 97, 53, 15, 198,
        208, 214, 36, 228, 185, 201, 237, 186, 234, 106, 114, 17, 216, 29, 54, 227,
      ];
      const FROM_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(secret));
      const QUICKNODE_RPC = 'https://api.testnet.solana.com';
      const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
      // const DESTINATION_WALLET = 'Dd2wvcTj2WDB9RKCVZKKMSTuZFmmRCYxPEkriAfJj2mK';
      // const MINT_ADDRESS = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';
      // const TRANSFER_AMOUNT = 1;
      const getNumberDecimals = async (mintAddress: string): Promise<number> => {
        const info = await SOLANA_CONNECTION.getParsedAccountInfo(new PublicKey(mintAddress));
        const result = (info.value?.data as ParsedAccountData).parsed.info.decimals as number;
        return result;
      };
      console.log('FROM_KEYPAIR_publicKey:', FROM_KEYPAIR.publicKey);
      console.log('FROM_KEYPAIR_secretKey:', FROM_KEYPAIR.secretKey);
      // const QUICKNODE_RPC = 'https://example.solana-testnet.quiknode.pro/0123456/';
      // const QUICKNODE_RPC = 'https://api.testnet.solana.com';
      // // const QUICKNODE_RPC = 'https://solana-devnet.g.alchemy.com/v2/gJHiBkHJL2zkSu0IXQR5a6nDfVDQKQE6';
      // const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC, 'confirmed');
      const DESTINATION_WALLET = 'Dd2wvcTj2WDB9RKCVZKKMSTuZFmmRCYxPEkriAfJj2mK';
      // const DESTINATION_WALLET = '4bic8yotkfTsc4mVsW29bstWPKSGWjfh2qorvymfkr37';
      const MINT_ADDRESS = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';
      const TRANSFER_AMOUNT = 100;
      // eslint-disable-next-line no-debugger
      debugger;
      const sourceAccount = await getAssociatedTokenAddress(
        new PublicKey(MINT_ADDRESS),
        FROM_KEYPAIR.publicKey,
        // connection,
        // FROM_KEYPAIR,
        // new PublicKey(MINT_ADDRESS),
        // FROM_KEYPAIR.publicKey,
      );
      console.log('sourceAccount-public:', publicKey);
      console.log('sourceAccount:', sourceAccount);
      const destinationAccount = await getOrCreateAssociatedTokenAccount(
        SOLANA_CONNECTION,
        FROM_KEYPAIR,
        new PublicKey(MINT_ADDRESS),
        new PublicKey(DESTINATION_WALLET),
      );

      // const destinationAccount = await getAssociatedTokenAddress(
      //   new PublicKey(MINT_ADDRESS),
      //   new PublicKey(DESTINATION_WALLET),
      //   // connection,
      //   // FROM_KEYPAIR,
      //   // new PublicKey(MINT_ADDRESS),
      //   // FROM_KEYPAIR.publicKey,
      // );

      console.log('DESTINATION_WALLET:', DESTINATION_WALLET);
      console.log('DESTINATION_WALLET:', new PublicKey(DESTINATION_WALLET));
      console.log('destination:', destinationAccount.toString());
      console.log('destinationAccount:', destinationAccount);

      const numberDecimals = await getNumberDecimals(MINT_ADDRESS);

      const tx = new Transaction();
      tx.add(
        createTransferInstruction(
          sourceAccount,
          destinationAccount.address,
          FROM_KEYPAIR.publicKey,
          TRANSFER_AMOUNT * Math.pow(10, 6),
        ),
      );
      console.log('FROM_KEYPAIR.publicKey:', FROM_KEYPAIR.publicKey);
      console.log('count:', TRANSFER_AMOUNT * Math.pow(10, numberDecimals));
      const latestBlockHash = await SOLANA_CONNECTION.getLatestBlockhash('confirmed');
      tx.recentBlockhash = latestBlockHash.blockhash;

      const signature = await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [FROM_KEYPAIR]);
      console.log(
        '\x1b[32m', // Green Text
        `Transaction Success!🎉`,
        `\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
      );
    } catch (error) {
      console.error('Error sending tokens:', error);
    }
  }, [publicKey]);

  return {
    sendTokens,
  };
};

export default useSolana;
