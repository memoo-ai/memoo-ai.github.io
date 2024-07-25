import { useMemo, useCallback } from 'react';
import { useConnection, useAnchorWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, Wallet, Program, BN, Idl } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';

export function useAnchorProgram(programId: PublicKey, idl: Idl) {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const provider = useMemo(() => {
    if (!wallet) return null;
    return new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
  }, [connection, wallet]);

  const program = useMemo(() => {
    if (!provider) return null;
    return new Program(idl, programId, provider);
  }, [provider, programId, idl]);

  return program;
}
