/* eslint-disable no-debugger */
import { useWallet, useConnection, useAnchorWallet } from '@solana/wallet-adapter-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Provider, BN, Idl } from '@coral-xyz/anchor';
import {
  Keypair,
  PublicKey,
  Connection,
  Transaction,
  sendAndConfirmTransaction,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  createAssociatedTokenAccountInstruction,
  NATIVE_MINT,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
  getOrCreateAssociatedTokenAccount,
} from '@solana/spl-token';
import IDL from '@/contracts/idl/memoo.json';
import { useBaseConfig } from '@/hooks/useBaseConfig';
import { useAnchorProgram } from './useProgram';
import { useSolana } from '@/hooks/useSolana';
import { AirdropTxns, AirdropMessage } from '@/utils/airdropTxns';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
// import { base64ToUint8Array } from '@/utils';

// import { memooConfig } from '@/types';
export interface MemooConfig {
  admin: PublicKey;
  airdropPrice: BN;
  id: PublicKey;
  idoPrice: BN;
  idoCreatorBuyLimit: number;
  idoUserBuyLimit: number;
  openTime: BN;
  platformFeeCreateMemeSol: BN;
  platformFeeRateDenominatorIdo: number;
  platformFeeRateIdo: number;
  platformFeeRecipient: PublicKey;
  tokenAllocationAirdrop: number;
  tokenAllocationCreator: number;
  tokenAllocationIdo: number;
  tokenAllocationLp: number;
  tokenAllocationPlatform: number;
  totalSupply: BN;
}
export interface MemeConfig {
  createTimestamp: BN;
  creator: PublicKey;
  creatorTotal: BN;
  id: PublicKey;
  memeIdoCount: BN;
  memeIdoMoney: BN;
  platformTotal: BN;
  preLaunchSecond: BN;
  totalSupply: BN;
}
export interface MemeUserIdoData {
  creatorLockCount: BN;
  creatorLockCountPermission: BN;
  creatorLockPeriod: BN;
  isInitialized: boolean;
  memeId: PublicKey;
  // lockCount: BN;
  memeUserAirdropClaimedCount: BN;
  memeUserIdoClaimedCount: BN;
  memeUserIdoCount: BN;
  memeUserIdoMoney: BN;
  user: PublicKey;
}
export const useAccount = () => {
  const { publicKey, signTransaction, signAllTransactions, sendTransaction, wallet } = useWallet();
  // const RPC_URL = 'https://api.devnet.solana.com';
  const RPC_URL = import.meta.env.VITE_RPC_URL;
  const connection = new Connection(RPC_URL);
  const programId = new PublicKey(import.meta.env.VITE_PROGRAM_ID);
  const { solanaConfig } = useBaseConfig();
  const program = useAnchorProgram(programId, IDL as Idl);
  const [memooConfig, setMemooConfig] = useState<MemooConfig>();
  // const memooConfigPda = new PublicKey(import.meta.env.VITE_MEMOO_CONFIG_PDA);
  // const memooConfigPda = import.meta.env.VITE_MEMOO_CONFIG_PDA;
  const memooConfigPda = useMemo(() => {
    if (!solanaConfig) return;
    const globalMemeConfigId = 'HC4FUre8ht7yMhFPFxbGTCh2WZL7YXUhF4tEhS8FqgbR';
    // const globalMemeConfigId = solanaConfig?.globalMemooConfigId;
    return PublicKey.findProgramAddressSync(
      [Buffer.from('global_memoo_config'), new PublicKey(globalMemeConfigId).toBuffer()],
      // [Buffer.from('global_memoo_config'), new PublicKey(solanaConfig?.globalMemooConfigId).toBuffer()],
      programId,
    )[0];
    // return new PublicKey(import.meta.env.VITE_MEMOO_CONFIG_PDA);
  }, [solanaConfig]);

  // const getMemooConfig = useCallback(async () => {
  //   if (!memooConfigPda || !program) return;
  //   const config = await program.account.globalMemooConfig.fetch(memooConfigPda);
  //   return config;
  // }, [solanaConfig, publicKey, signTransaction, program]);

  useEffect(() => {
    (async () => {
      if (!memooConfigPda || !program) return;
      // const config = (await program.account.globalMemooConfig.fetch(memooConfigPda)) as any;
      const config = (await program.account.globalMemooConfig.fetch(memooConfigPda)) as any;
      console.log('memooConfig:', config);
      setMemooConfig(config);
    })();
  }, [memooConfigPda]);
  // const maxProportion = useMemo(() => Number(memooConfig?.idoCreatorBuyLimit) / 10000, [memooConfig]);
  // console.log('globalMemooConfig:', memooConfig);
  // useEffect(() => {
  //   (async () => {
  //     if (!memooConfigPda || !program) return;
  //     const config = await program.account.globalMemooConfig.fetch(memooConfigPda);
  //     setMemooConfig(config);
  //   })();
  // }, [memooConfigPda, program, connection]);

  const registerTokenMint = useCallback(
    async (memeId: string, totalPay: number | string | bigint) => {
      if (!solanaConfig || !publicKey || !signTransaction || !program) return;
      // console.log('totalPay', Number(new BN(totalPay).add(memooConfig?.platformFeeCreateMemeSol)));
      try {
        // console.log('memooConfigPda:', memooConfigPda);
        // const config = await program.account.globalMemooConfig.fetch(memooConfigPda);
        // console.log('globalMemooConfig:', config);
        // const memeConfigId = Keypair.generate().publicKey;
        console.log('memooConfigPda:', memooConfigPda);
        const memeConfigId = new PublicKey(memeId);
        const memeConfigPda = PublicKey.findProgramAddressSync(
          // [Buffer.from('meme_config'), new PublicKey(memeConfigId).toBuffer()],
          [Buffer.from('meme_config'), memeConfigId.toBuffer()],
          programId,
        )[0];
        console.log('memeConfigPda:', memeConfigPda);

        const memeUserDataPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
          programId,
        )[0];
        console.log('memeUserDataPda:', memeUserDataPda);
        const poolSolAuthority = PublicKey.findProgramAddressSync(
          [Buffer.from('authority'), memeConfigId.toBuffer(), NATIVE_MINT.toBuffer()],
          programId,
        )[0];
        console.log('poolSolAuthority:', poolSolAuthority);

        const poolAccountSol = await getAssociatedTokenAddress(NATIVE_MINT, poolSolAuthority, true);
        console.log('poolAccountSol:', poolAccountSol);
        const userWsolAddress = await getAssociatedTokenAddress(NATIVE_MINT, publicKey);
        console.log('userWsolAddress:', userWsolAddress);
        const userWsolAccountInfo = await connection.getAccountInfo(userWsolAddress);
        console.log('userWsolAccountInfo:', userWsolAccountInfo);
        console.log('Program ID:', program.programId.toBase58());
        console.log('memeConfigId:', memeConfigId);
        console.log('memeConfigPda:', memeConfigPda.toBase58());
        console.log('memooConfigPda:', memooConfigPda.toBase58());
        console.log('memeUserDataPda:', memeUserDataPda.toBase58());
        const transaction = new Transaction();
        let createAtaIx;
        if (!userWsolAccountInfo) {
          createAtaIx = createAssociatedTokenAccountInstruction(
            publicKey, // payer
            userWsolAddress, // associatedToken
            publicKey, // owner
            NATIVE_MINT, // mint
          );
          transaction.add(createAtaIx);
        }

        console.log('transaction:', transaction);
        console.log('amount- totalPay:', totalPay);
        console.log('totalPay:', new BN(totalPay).add(memooConfig?.platformFeeCreateMemeSol));
        const registerTokenMintIx = await program.methods
          .registerTokenMint(memeConfigId, new BN(totalPay).add(memooConfig?.platformFeeCreateMemeSol), new BN(0))
          // .registerTokenMint(memeConfigId, new BN(18000000).add(memooConfig?.platformFeeCreateMemeSol), new BN(0), 9)
          .accounts({
            memooConfig: memooConfigPda,
            memeConfig: memeConfigPda,
            memeUserData: memeUserDataPda,
            platformFeeRecipient: memooConfig?.platformFeeRecipient,
            // platformFeeRecipient: new PublicKey(platform_fee_recipient),
            poolAuthorityWsol: poolSolAuthority,
            poolAccountWsol: poolAccountSol,
            mintAccountWsol: NATIVE_MINT,
            userSolAccount: publicKey,
            userWsolAccount: userWsolAddress,
            wsolMint: NATIVE_MINT,
          })
          .instruction();

        transaction.add(registerTokenMintIx);
        const latestBlockhash = await connection.getLatestBlockhash('finalized');
        transaction.recentBlockhash = latestBlockhash.blockhash;
        transaction.feePayer = publicKey;
        const signedTransaction = await signTransaction(transaction);
        // const fee = await transaction.getEstimatedFee(connection);
        // console.log('fee:', fee);
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());

        console.log('Transaction sent. Signature:', signature);
        const confirmationStrategy = {
          signature: signature,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        };

        const confirmation = await connection.confirmTransaction(confirmationStrategy, 'finalized');
        console.log('confirmation:', confirmation);

        if (confirmation.value.err) {
          throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`);
        }
        return confirmation;
      } catch (error) {
        console.error('Error in registerTokenMint:', error);
        throw error;
      }
    },
    [connection, signTransaction, solanaConfig, publicKey, program],
  );

  const idoBuy = useCallback(
    // eslint-disable-next-line max-params
    async (memeId: string, amount: BN, isCreate: boolean, proportion: number) => {
      if (!memooConfig || !program || !publicKey) return;
      try {
        console.log('memeId:', memeId);
        const memeConfigId = new PublicKey(memeId);
        debugger;
        const memeConfigPda = PublicKey.findProgramAddressSync(
          // [Buffer.from('meme_config'), new PublicKey(memeConfigId).toBuffer()],
          [Buffer.from('meme_config'), memeConfigId.toBuffer()],
          programId,
        )[0];
        console.log('memeConfigPda:', memeConfigPda.toString());
        const memeConfig: MemeConfig = (await program.account.memeConfig.fetch(memeConfigPda)) as any;

        // debugger;
        console.log('amount:', amount);
        console.log('memeConfig?.totalSupply:', memeConfig?.totalSupply);
        console.log('memooConfig.idoUserBuyLimit:', memooConfig.idoUserBuyLimit);
        console.log('memooConfig.idoPrice:', memooConfig.idoPrice);
        // console.log('memeUserIdoData:', memeUserIdoData);
        console.log('memeConfig:', memeConfig);
        console.log('memooConfig:', memooConfig);
        // const amount1 = new BN(18000000);
        // const idoUserBuyLimit = memeConfig?.totalSupply
        //   .mul(new BN(isCreate ? memooConfig.idoCreatorBuyLimit : memooConfig.idoUserBuyLimit))
        //   .div(new BN(10000));
        // const buyQuantity = memeConfig?.totalSupply.mul(new BN(proportion)).div(new BN(100));
        // console.log('idoUserBuyLimit:', idoUserBuyLimit);
        // console.log('goingBuy:', buyQuantity);
        // debugger;
        // const transaction = new Transaction();
        // let createAtaIx;
        // createAtaIx = createAssociatedTokenAccountInstruction(
        //   publicKey, // payer
        //   userWsolAddress, // associatedToken
        //   publicKey, // owner
        //   NATIVE_MINT, // mint
        // );
        // transaction.add(createAtaIx);
        const memeUserDataPda_idoBuy = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
          programId,
        )[0];
        // debugger;

        // const memeUserIdoData: MemeUserIdoData = (await program.account.memeUserIdoData.fetch(
        //   memeUserDataPda_idoBuy,
        // )) as any;
        // console.log('memeUserIdoData:', memeUserIdoData);
        console.log('memeConfig:', memeConfig);
        // if (memeUserIdoData?.memeUserIdoCount + goingBuy > idoUserBuyLimit) {
        // if (memeUserIdoData?.memeUserIdoCount.add(buyQuantity).gt(idoUserBuyLimit)) {
        //   console.log('exceed the limit');
        //   return;
        // }

        const idoBuyCost = amount.mul(memooConfig.idoPrice);
        console.log('idoBuyCost', idoBuyCost);
        const poolSolAuthority = PublicKey.findProgramAddressSync(
          [Buffer.from('authority'), memeConfigId.toBuffer(), NATIVE_MINT.toBuffer()],
          programId,
        )[0];
        const poolAccountSol = await getAssociatedTokenAddress(NATIVE_MINT, poolSolAuthority, true);
        const idoBuyWsolAccount = getAssociatedTokenAddressSync(NATIVE_MINT, publicKey, true);
        // const userWsolAddress = await getAssociatedTokenAddress(NATIVE_MINT, publicKey);
        // const userWsolAccountInfo = await connection.getAccountInfo(userWsolAddress);
        // const transaction = new Transaction();
        // let createAtaIx;
        // if (!userWsolAccountInfo) {
        //   createAtaIx = createAssociatedTokenAccountInstruction(
        //     publicKey, // payer
        //     userWsolAddress, // associatedToken
        //     publicKey, // owner
        //     NATIVE_MINT, // mint
        //   );
        //   transaction.add(createAtaIx);
        // }
        // // debugger;
        const tx = await program.methods
          // .idoBuy(memeConfigId, idoBuyCost)
          .idoBuy(memeConfigId, idoBuyCost)
          .accounts({
            memooConfig: memooConfigPda,
            memeConfig: memeConfigPda,
            memeUserData: memeUserDataPda_idoBuy,
            payer: publicKey,
            // poolAuthorityWsol: poolSolAuthority,
            poolAccountWsol: poolAccountSol,
            // mintAccountWsol: NATIVE_MINT,
            // userSolAccount: publicKey,
            userWsolAccount: idoBuyWsolAccount,
            wsolMint: NATIVE_MINT,
          })
          .rpc();

        return tx;
      } catch (e) {
        console.log('error:', e);
      }
    },
    [connection, publicKey],
  );

  const creatorClaim = useCallback(
    async (memeId: string, mintPublicKey: string) => {
      console.log('creatorClaim');
      // debugger;
      if (!memooConfig || !program || !publicKey) return;
      try {
        const memeConfigId = new PublicKey(memeId);
        const mintAPublicKey = new PublicKey(mintPublicKey);
        // const memeUserDataPda_idoBuy = PublicKey.findProgramAddressSync(
        //   [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
        //   programId,
        // )[0];
        // const memeUserIdoData: MemeUserIdoData = (await program.account.memeUserIdoData.fetch(
        //   memeUserDataPda_idoBuy,
        // )) as any;
        const memeUserDataPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
          programId,
        )[0];
        const adminAccountAPda = getAssociatedTokenAddressSync(mintAPublicKey, publicKey, true);
        // const adminAccountAPda = getAssociatedTokenAddressSync(
        //   mintAKeypair.publicKey,
        //   values.payerAdmin.publicKey,
        //   true
        // );
        const poolAuthorityA = PublicKey.findProgramAddressSync(
          [Buffer.from('authority'), memeConfigId.toBuffer(), mintAPublicKey.toBuffer()],
          programId,
        )[0];
        const poolAccountA = getAssociatedTokenAddressSync(mintAPublicKey, poolAuthorityA, true);
        const tx = await program.methods
          .creatorClaim(memeConfigId)
          .accounts({
            payer: publicKey,
            memooConfig: memooConfigPda,
            memeUserData: memeUserDataPda,
            // reatorAccountA: adminAccountAPda,
            creatorAccountA: adminAccountAPda,
            mintAccountA: mintAPublicKey,
            poolAuthorityA,
            poolAccountA: poolAccountA,
          })
          .rpc();
        console.log('creatorClaimTx:', tx);
        return tx;
      } catch (e) {
        console.log('error: ', e);
      }
    },
    [connection, publicKey, program],
  );
  const idoClaim = useCallback(
    async (memeId: string, mintaPublicKey: string) => {
      if (!memooConfig || !program || !publicKey) return;
      try {
        const memeConfigId = new PublicKey(memeId);
        const mintAPublicKey = new PublicKey(mintaPublicKey);
        const memeUserDataPda_idoBuy = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
          programId,
        )[0];
        const idoBuyerAccountA = getAssociatedTokenAddressSync(mintAPublicKey, publicKey, true);
        const poolAuthorityA = PublicKey.findProgramAddressSync(
          [Buffer.from('authority'), memeConfigId.toBuffer(), mintAPublicKey.toBuffer()],
          programId,
        )[0];
        const poolAccountA = getAssociatedTokenAddressSync(mintAPublicKey, poolAuthorityA, true);
        const tx = await program.methods
          .idoClaim(memeConfigId)
          .accounts({
            user: publicKey,
            memeUserData: memeUserDataPda_idoBuy,

            idoUserAccountA: idoBuyerAccountA,
            mintAccountA: mintAPublicKey,
            poolAuthorityA,
            poolAccountA: poolAccountA,
          })
          .rpc();
        return tx;
      } catch (e) {
        console.log('error: ', e);
      }
    },
    [connection, publicKey, program],
  );
  const getMemeUserData = useCallback(
    async (memeId: string) => {
      console.log('getMemeUserData');
      if (!memooConfig || !program || !publicKey) return;
      try {
        // debugger;
        const memeConfigId = new PublicKey(memeId);
        const memeUserDataPda_idoBuy = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
          programId,
        )[0];
        const memeUserData: MemeUserIdoData = (await program.account.memeUserIdoData.fetch(
          memeUserDataPda_idoBuy,
        )) as any;
        return memeUserData;
      } catch (e) {
        console.log('error: ', e);
      }
    },
    [connection, publicKey, program],
  );
  let tran: any;
  const airdropClaim = useCallback(
    // eslint-disable-next-line max-params
    async (memeId: string, mintaPublicKey: string, msg: any, signature: Uint8Array, signerPublicKey: PublicKey) => {
      if (!memooConfig || !program || !publicKey || !signTransaction || !sendTransaction) return;
      try {
        const memeConfigId = new PublicKey(memeId);
        const mintAPublicKey = new PublicKey(mintaPublicKey);
        const memeConfigPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_config'), memeConfigId.toBuffer()],
          programId,
        )[0];
        // const memeConfig: MemeConfig = (await program.account.memeConfig.fetch(memeConfigPda)) as any;
        const memeUserDataPda_idoBuy = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
          programId,
        )[0];
        const idoBuyerAccountA = getAssociatedTokenAddressSync(mintAPublicKey, publicKey, true);

        const poolAuthority = PublicKey.findProgramAddressSync(
          [Buffer.from('authority'), memeConfigId.toBuffer(), mintAPublicKey.toBuffer()],
          programId,
        )[0];
        const poolAccountA = getAssociatedTokenAddressSync(mintAPublicKey, poolAuthority, true);
        // const currentDate = new Date();
        // const futureDate = new Date(currentDate);
        // futureDate.setDate(futureDate.getDate() + 14);
        console.log('Date:', Date.now());
        const date = 1722998299247;
        const message = new AirdropMessage({
          address: publicKey.toBuffer(),
          meme: memeConfigId.toBuffer(),
          count: new BN(100),
          expiry: new BN(Math.floor(date / 1000) + 14 * 24 * 60 * 60), // 当前时间加14天
        });
        const encoded = message.serialize();
        console.log('Serialized message:', encoded);
        const decoded = message.deserialize(Buffer.from(encoded));
        console.log('Deserialized message:', decoded);

        const MSG = encoded;
        // // const person = idoBuyer;
        let platformSecretKey =
          '5yXAv6E1fzrwzESNQY6zRVDQMiwvnNap5vWKgXQYzJFc4a9AzbsKpQrki88qpsLkztUDyr5LDniikRHQ122bNseL';
        const scopedSlots = bs58.decode(platformSecretKey);
        // console.log('platformSecretKey: ', base64ToUint8Array(platformSecretKey));
        const keyPair = Keypair.fromSecretKey(scopedSlots);
        // const secretKey = hexToUint8Array(platformSecretKey);
        let signatureNacl = nacl.sign.detached(MSG, keyPair.secretKey);
        const platformPublicKey = keyPair.publicKey;

        const transaction = new Transaction();
        // debugger;
        console.log('createTx-memeId:', memeConfigId.toBase58());
        console.log('createTx-serialized:', msg);
        // console.log('createTx-signature:', signature);
        console.log('createTx-payer:', publicKey.toBase58());
        console.log('createTx-payerAccountA:', idoBuyerAccountA.toBase58());
        console.log('createTx-memeConfig:', memeConfigPda.toBase58());
        console.log('createTx-memeUserData:', memeUserDataPda_idoBuy.toBase58());
        console.log('createTx-mintAccountA:', mintAPublicKey.toBase58());
        console.log('createTx-poolAuthorityA:', poolAuthority.toBase58());
        console.log('createTx-poolAccountA:', poolAccountA.toBase58());
        // const encodedMsg = message.deserialize(Buffer.from(msg));
        // console.log('encodedMsg:', JSON.stringify(encodedMsg));
        // console.log('encodedMsg:', encodedMsg);
        // console.log('encodedMsg-address:', encodedMsg.address);
        // console.log('encodedMsg-address-JSON:', JSON.stringify(encodedMsg.address));
        // console.log('encodedMsg-meme:', encodedMsg.meme);
        // console.log('encodedMsg-meme-JSON:', JSON.stringify(encodedMsg.meme));
        // console.log('encodedMsg-count:', Number(encodedMsg.count));
        // console.log('encodedMsg-expiry:', Number(encodedMsg.expiry));
        // console.log('encodedMsg:', JSON.parse(encodedMsg));

        const tx = await new AirdropTxns(program).createTx({
          memeId: memeConfigId,
          // serialized: MSG,
          // signature: signatureNacl,
          // signerPublicKey: platformPublicKey,
          serialized: msg,
          signature,
          signerPublicKey: signerPublicKey,
          payer: publicKey,
          payerAccountA: idoBuyerAccountA,
          memeConfig: memeConfigPda,
          memeUserData: memeUserDataPda_idoBuy,
          mintAccountA: mintAPublicKey,
          poolAuthorityA: poolAuthority,
          poolAccountA: poolAccountA,
          addixEd25519Program: true,
        });
        // if (tx) {
        //   try {
        //     // debugger;
        //     const idoBuyS = '2i9Wbo6ZySbszqKSsc22wLKfGZHny8viNnqdwz1iynSARmwRzmug8n8jCEBKTpDoGsMPFTDqGTrtt12Uq5hXdC98';
        //     const idoBuySec = bs58.decode(idoBuyS);
        //     console.log('idoBuySec: ', idoBuySec);
        //     const idoKeyPair = Keypair.fromSecretKey(idoBuySec);
        //     // debugger;
        //     const rs = await sendAndConfirmTransaction(connection, new Transaction().add(tx), [idoKeyPair], {
        //       skipPreflight: true,
        //     });

        //     console.log('sendAndConfirmTransaction:', rs);
        //     // const rs = await sendAndConfirmTransactionWithWallet(connection, transaction.add(tx));
        //     return rs;
        //     // If all goes well, we're good!
        //   } catch (error) {
        //     // No idea how to catch this error otherwise
        //     console.log('error: ', error);
        //   }
        // }
        // const COMPUTE_BUDGET_PROGRAM_ID = new PublicKey('ComputeBudget111111111111111111111111111111');

        // // 增加计算单位的指令
        // const computeBudgetIx = new TransactionInstruction({
        //   keys: [],
        //   programId: COMPUTE_BUDGET_PROGRAM_ID,
        //   data: Buffer.from(Uint8Array.of(0, 192, 0, 0, 0, 0)), // 表示增加200,000计算单位
        // });
        // console.log('transaction-tx: ', tx);
        // transaction.add(computeBudgetIx);
        transaction.add(tx);
        const latestBlockhash = await connection.getLatestBlockhash('finalized');
        transaction.recentBlockhash = latestBlockhash.blockhash;
        transaction.feePayer = publicKey;
        console.log('Transaction: ', transaction);
        // const signedTransaction = await signTransaction(transaction);
        const signedTransaction = await signTransaction(transaction);
        console.log('signedTransaction: ', signedTransaction);
        tran = signedTransaction;
        const txSignature = await connection.sendRawTransaction(signedTransaction.serialize(), {
          skipPreflight: true,
        });
        console.log('txSignature: ', txSignature);
        const txDetails = await connection.getParsedTransaction(txSignature, { commitment: 'confirmed' });
        console.log('txDetails: ', txDetails);
        // // // const signature = await sendTransaction(signedTransaction, connection);
        // // // const signature = await sendAndConfirmTransaction(connection, signedTransaction, []);
        // // console.log('sendAndConfirmTransaction: ', signature);
        const confirmationStrategy = {
          signature: txSignature,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        };

        const confirmation = await connection.confirmTransaction(confirmationStrategy, 'finalized');
        console.log('confirmation:', confirmation);

        if (confirmation.value.err) {
          throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`);
        }

        // return signature;
        // const latestBlockhash = await connection.getLatestBlockhash('finalized');
        // transaction.recentBlockhash = latestBlockhash.blockhash;
        // transaction.feePayer = publicKey;

        // const signedTransaction = await signTransaction(transaction);

        // const signature = await sendTransaction(signedTransaction, connection);
        // console.log('sendTransaction:', signature);
        // const fee = await transaction.getEstimatedFee(connection);
        // console.log('fee:', fee);
        // const sign = await connection.sendRawTransaction(signedTransaction.serialize());

        // console.log('Transaction sent. Signature:', sign);
        // const confirmationStrategy = {
        //   signature: sign,
        //   blockhash: latestBlockhash.blockhash,
        //   lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        // };

        // const confirmation = await connection.confirmTransaction(confirmationStrategy, 'confirmed');
        // console.log('confirmation:', confirmation);

        // if (confirmation.value.err) {
        //   throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`);
        // }
        // const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
        // transaction.recentBlockhash = blockhash;
        // transaction.feePayer = publicKey;

        // const signedTransaction = await signTransaction(transaction);
        // let signers: any = [];
        // const signature = await (
        //   connection,
        //   signedTransaction,
        //   signers.concat(publicKey), // 确保包含钱包公钥
        //   {
        //     skipPreflight: false,
        //     preflightCommitment: 'confirmed',
        //     commitment: 'confirmed',
        //   },
        // );
        // return signature;
      } catch (e) {
        console.log('error: ', e);
      }
    },
    [connection, publicKey, program, signTransaction, sendTransaction],
  );

  return {
    address: publicKey,
    registerTokenMint,
    memooConfig,
    // getMemooConfig,
    idoBuy,
    creatorClaim,
    idoClaim,
    getMemeUserData,
    airdropClaim,
  };
};
