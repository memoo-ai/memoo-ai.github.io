import { useMemo, useCallback } from 'react';
import { useConnection, useAnchorWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, Wallet, Program, BN, Idl } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { Memoo } from '@/contracts/idl/memoo';
import * as anchor from '@coral-xyz/anchor';

export function useAnchorProgram(programId: PublicKey, idl: Idl) {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const provider = useMemo(() => {
    if (!wallet) return null;
    return new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
  }, [connection, wallet]);

  // const program = useMemo<Program<Memoo> | null>(() => {
  //   if (!provider) return null;
  //   // return new Program(idl, programId, provider) as any;
  //   return anchor.workspace.Memoo as Program<Memoo>;
  // }, [provider, programId, idl]);
  const program = useMemo<Program<Memoo> | null>(() => {
    if (!provider) return null;
    return new Program<Memoo>(idl as any, programId, provider);
  }, [provider, programId, idl]);

  // const program = useMemo<Memoo>(() => {
  //   if (!provider) return null;
  //   return new Program(idl, programId, provider) as any;
  // }, [provider, programId, idl]);

  return program;
}
