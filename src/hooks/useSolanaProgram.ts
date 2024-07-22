import { useWallet, useConnection, useAnchorWallet } from '@solana/wallet-adapter-react';
import { useCallback, useEffect, useState } from 'react';
import { AnchorProvider, Wallet, Program, BN } from '@coral-xyz/anchor';
import { Keypair, PublicKey, Connection } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import IDL from '@/contracts/idl/memoo.json';

export const useContract = () => {
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  // const { address } = useWagmiAccount();
  // const { connection } = useConnection();
  const QUICKNODE_RPC = 'https://api.devnet.solana.com';
  const connection = new Connection(QUICKNODE_RPC);
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<any>(null);
  // const programId = new PublicKey(IDL.metadata.address);
  const programId = new PublicKey(import.meta.env.VITE_PROGRAM_ID);

  // const programId = new PublicKey('DBwzuVPjiBEm8eyPkFDCCzTPzgWgN5sq11io4LPcPHre');
  // if (publicKey) {
  //   return {
  //     address: publicKey?.toBase58(),
  //   };
  // }
  useEffect(() => {
    if (publicKey) {
      const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
      console.log('provider:', provider);
      // const program = new Program(IDL as any, programId, provider);
      const program = new Program(IDL as any, programId, provider);
      setProgram(program);
    }
  }, [publicKey, signTransaction, signAllTransactions]);

  const createTokenMint = useCallback(async () => {
    if (!publicKey || !program) return;

    try {
      console.log('createTokenMint');
      let mintedAmount = 1000000000;
      let decimals = 9;
      let mintAKeypair = Keypair.generate();
      const associatedTokenAccount = await getAssociatedTokenAddress(mintAKeypair.publicKey, publicKey);
      const [metadataPDA, _] = await PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s').toBuffer(),
          mintAKeypair.publicKey.toBuffer(),
        ],
        new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'), // The public key of the token metadata program
      );
      const total_supply = new BN(mintedAmount).mul(new BN(10 ** decimals));
      const tx = await program.methods
        .createTokenMint(
          decimals,
          'YuMeMoo',
          'MeMooYu',
          'https://memoo-res.s3.amazonaws.com/0efb9bec-8021-4047-a964-fdcf5dc5ecad?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZ5SIXM4BHIM2XBI5%2F20240717%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240717T073004Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=802051885a1c022872a67083757ed87d3496fa212f88fa77548535227a532149',
          total_supply,
        )
        .accounts({
          payer: publicKey,
          mintAccount: mintAKeypair.publicKey,
          associatedTokenAccount,
          metadataAccount: metadataPDA,
          tokenMetadataProgram: new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
        })
        .signers([mintAKeypair])
        .rpc();
      console.log('Transaction ID:', tx);

      //   .initialize(data)
      //   .accounts({
      //     newAccount: newAccountKp.publicKey,
      //     signer: wallet.publicKey,
      //     systemProgram: SystemProgram.programId,
      //   })
      //   .signers([newAccountKp])
      //   .rpc();
      // console.log('program:', program);

      // const metaData = {
      //   name: 'name',
      //   symbol: 'symbol',
      //   uri: 'uri',
      // };
      return tx;
    } catch (e) {
      console.log('error:', e);
    }
  }, [publicKey]);

  return {
    createTokenMint,
  };

  // return {
  //   address,
  // };
};
