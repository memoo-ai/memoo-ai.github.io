import { useWallet, useConnection, useAnchorWallet } from '@solana/wallet-adapter-react';
import { useAccount as useWagmiAccount } from 'wagmi';
import { useCallback, useEffect, useState } from 'react';
import { AnchorProvider, Wallet, Program, BN } from '@coral-xyz/anchor';
import * as anchor from '@coral-xyz/anchor';
import { Keypair, PublicKey, Connection } from '@solana/web3.js';
import IDL from '@/contracts/idl/memoo.json';

export const useContract = () => {
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  // const { address } = useWagmiAccount();
  // const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState(null);
  const programId = new PublicKey(import.meta.env.VITE_PROGRAM_ID);
  const connection = new Connection(import.meta.env.VITE_RPC_URL);

  // const programId = new PublicKey('DBwzuVPjiBEm8eyPkFDCCzTPzgWgN5sq11io4LPcPHre');
  // if (publicKey) {
  //   return {
  //     address: publicKey?.toBase58(),
  //   };
  // }
  // useEffect(() => {
  //   if (publicKey) {
  //     const provider = new AnchorProvider(
  //       connection,
  //       {
  //         publicKey,
  //         signTransaction,
  //         signAllTransactions,
  //       },
  //       { commitment: 'processed' },
  //     );
  //     const program = new Program(idl, programId, provider);
  //     setProgram(program);
  //   }
  // }, [connection, publicKey, signTransaction, signAllTransactions]);

  const createTokenMint = useCallback(async () => {
    if (!publicKey) return;
    console.log('publicKey', publicKey);
    console.log('ProgramId:', IDL.metadata.address);

    try {
      // const keypair = Keypair.generate();
      const provider = new AnchorProvider(
        connection,
        {
          publicKey,
          signTransaction,
          signAllTransactions,
        } as any,
        {
          commitment: 'processed',
        },
      );
      // const provider = new AnchorProvider(connection, wallet, {});
      console.log('provider:', provider);
      // const program = new Program(IDL as any, programId, provider);
      let a = JSON.stringify(IDL);
      let b = JSON.parse(a);
      // const program = new Program(b as anchor.Idl, programId, {
      //   connection,
      // });
      const program = new Program(b as anchor.Idl, provider);
      // const transactionSignature = await program.methods
      //   .initialize(data)
      //   .accounts({
      //     newAccount: newAccountKp.publicKey,
      //     signer: wallet.publicKey,
      //     systemProgram: SystemProgram.programId,
      //   })
      //   .signers([newAccountKp])
      //   .rpc();
      console.log('program:', program);

      const metaData = {
        name: 'name',
        symbol: 'symbol',
        uri: 'uri',
      };
      return provider;
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
