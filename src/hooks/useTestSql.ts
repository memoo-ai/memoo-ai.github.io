import { createMint } from '@solana/spl-token';
import { useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';
import bs58 from 'bs58';
const useTestSql = () => {
  const { publicKey } = useWallet();
  const createMint1 = useCallback(async () => {
    const connection = new Connection(clusterApiUrl('testnet'));
    const sere = [
      85, 128, 24, 172, 157, 138, 79, 194, 130, 27, 213, 197, 89, 104, 204, 100, 144, 182, 53, 120, 226, 193, 96, 250,
      107, 42, 242, 252, 22, 18, 163, 190, 245, 110, 123, 97, 114, 42, 77, 196, 92, 229, 228, 136, 97, 53, 15, 198, 208,
      214, 36, 228, 185, 201, 237, 186, 234, 106, 114, 17, 216, 29, 54, 227,
    ];

    const user = Keypair.fromSecretKey(new Uint8Array(sere));
    console.log(user.publicKey.toString());
    console.log(bs58.encode(user.secretKey));

    const tokenMint = await createMint(connection, user, user.publicKey, null, 2);
    console.log(tokenMint);
  }, [publicKey]);
  return {
    createMint1,
  };
};

export default useTestSql;
