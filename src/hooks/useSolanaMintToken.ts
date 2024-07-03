import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
  getAssociatedTokenAddress,
  createMint,
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
import bs58 from 'bs58';
import { SWAP_PROGRAM_ID, TOKENS, TokenListContainer } from '@solana/spl-token-swap';

const useSolana = () => {
  const { publicKey } = useWallet();
  // const { connection } = useConnection();

  const pubKey = '6Yxe7k1K2YfnhGcwB3rf2XDt69cAD7oFwrosXoyb7KSF';
  const secret = [
    85, 128, 24, 172, 157, 138, 79, 194, 130, 27, 213, 197, 89, 104, 204, 100, 144, 182, 53, 120, 226, 193, 96, 250,
    107, 42, 242, 252, 22, 18, 163, 190, 245, 110, 123, 97, 114, 42, 77, 196, 92, 229, 228, 136, 97, 53, 15, 198, 208,
    214, 36, 228, 185, 201, 237, 186, 234, 106, 114, 17, 216, 29, 54, 227,
  ];

  const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');

  const FROM_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(secret));
  console.log('privateKey', bs58.encode(secret));
  // const QUICKNODE_RPC = 'https://example.solana-testnet.quiknode.pro/0123456/';
  // // const QUICKNODE_RPC = 'https://api.testnet.solana.com';
  // const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
  // const DESTINATION_WALLET = 'Dd2wvcTj2WDB9RKCVZKKMSTuZFmmRCYxPEkriAfJj2mK';
  // const MINT_ADDRESS = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';
  // const TRANSFER_AMOUNT = 1;
  const getNumberDecimals = async (mintAddress: string): Promise<number> => {
    const info = await connection.getParsedAccountInfo(new PublicKey(mintAddress));
    const result = (info.value?.data as ParsedAccountData).parsed.info.decimals as number;
    return result;
  };

  const sendTokens = useCallback(async () => {
    if (!publicKey) {
      console.log('Wallet not connected!');
      return;
    }

    try {
      const secret = [
        92, 203, 118, 23, 182, 203, 26, 238, 99, 62, 152, 156, 12, 18, 49, 44, 170, 197, 210, 234, 61, 70, 176, 207,
        181, 107, 215, 203, 143, 178, 195, 61, 40, 93, 22, 85, 132, 215, 39, 242, 200, 164, 93, 149, 144, 223, 49, 209,
        229, 7, 227, 33, 0, 138, 195, 7, 92, 71, 49, 167, 182, 145, 160, 111,
      ];
      const FROM_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(secret));
      console.log(FROM_KEYPAIR);
      console.log('FROM_KEYPAIR_publicKey:', FROM_KEYPAIR.publicKey);
      console.log('FROM_KEYPAIR_secretKey:', FROM_KEYPAIR.secretKey);
      // const QUICKNODE_RPC = 'https://example.solana-testnet.quiknode.pro/0123456/';
      const QUICKNODE_RPC = 'https://api.testnet.solana.com';
      // const QUICKNODE_RPC = 'https://solana-devnet.g.alchemy.com/v2/gJHiBkHJL2zkSu0IXQR5a6nDfVDQKQE6';
      const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC, 'confirmed');
      const DESTINATION_WALLET = 'Dd2wvcTj2WDB9RKCVZKKMSTuZFmmRCYxPEkriAfJj2mK';
      const MINT_ADDRESS = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';
      const TRANSFER_AMOUNT = 1;
      // eslint-disable-next-line no-debugger
      // debugger;
      const sourceAccount = await getAssociatedTokenAddress(
        new PublicKey(MINT_ADDRESS),
        publicKey,
        // connection,
        // FROM_KEYPAIR,
        // new PublicKey(MINT_ADDRESS),
        // FROM_KEYPAIR.publicKey,
      );
      console.log('sourceAccount:', sourceAccount);

      const destinationAccount = await getAssociatedTokenAddress(
        new PublicKey(MINT_ADDRESS),
        new PublicKey(DESTINATION_WALLET),
        // connection,
        // FROM_KEYPAIR,
        // new PublicKey(MINT_ADDRESS),
        // FROM_KEYPAIR.publicKey,
      );
      console.log('destinationAccount:', destinationAccount);

      const numberDecimals = await getNumberDecimals(MINT_ADDRESS);

      const tx = new Transaction();
      tx.add(
        createTransferInstruction(
          publicKey,
          new PublicKey(DESTINATION_WALLET),
          publicKey,
          TRANSFER_AMOUNT * Math.pow(10, numberDecimals),
        ),
      );

      const latestBlockHash = await connection.getLatestBlockhash('confirmed');
      tx.recentBlockhash = latestBlockHash.blockhash;

      const signature = await sendAndConfirmTransaction(connection, tx, [FROM_KEYPAIR]);
      console.log(
        '\x1b[32m', // Green Text
        `Transaction Success!🎉`,
        `\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
      );
    } catch (error) {
      console.error('Error sending tokens:', error);
    }
  }, [publicKey]);
  const createMintDemo = useCallback(async () => {
    try {
      if (!publicKey) {
        return;
      }
      // eslint-disable-next-line no-debugger
      debugger;
      const tokenMint = await createMint(
        connection,
        {
          publicKey: new PublicKey(pubKey),
          secretKey: new Uint8Array(secret),
        },
        publicKey,
        publicKey,
        LAMPORTS_PER_SOL,
      );
      console.log(tokenMint);
      // const tokenAccount = await createAccount(
      //   connection,
      //   payer,
      //   mint,
      //   owner,
      //   keypair
      // );
    } catch (e) {
      console.log(e);
    }
  }, [publicKey]);

  return {
    sendTokens,
    createMintDemo,
  };
};

export default useSolana;
