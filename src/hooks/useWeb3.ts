/* eslint-disable max-params */
/* eslint-disable no-debugger */
import { useWallet, useConnection, useAnchorWallet } from '@solana/wallet-adapter-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Provider, BN, Idl } from '@coral-xyz/anchor';
import {
  clusterApiUrl,
  PublicKey,
  Connection,
  Transaction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
  ComputeBudgetProgram,
  VersionedTransaction,
  TransactionMessage,
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
import { AirdropTxns } from '@/utils/airdropTxns';
import { BigNumber } from 'bignumber.js';
import message from '@/components/IMessage';
import { connect } from 'http2';

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
  admin: PublicKey;
  createTimestamp: BN;
  creator: PublicKey;
  creatorTotal: BN;
  id: PublicKey;
  idoEnd: boolean;
  isInitialized: boolean;
  memeAirdropCount: BN;
  memeAirdropTotal: BN;
  memeIdoCount: BN;
  memeIdoMoney: BN;
  mintTokenAddress: PublicKey;
  platform: PublicKey;
  platformTotal: BN;
  poolA: PublicKey;
  poolWsol: PublicKey;
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
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const [balance, setBalance] = useState(0);
  // const RPC_URL = 'https://api.devnet.solana.com';
  const RPC_URL = import.meta.env.VITE_RPC_URL;
  const connection = new Connection(RPC_URL);

  // useEffect(() => {
  //   if (!publicKey || !connection) return;

  //   (async () => {
  //     // Query balance
  //     const balance = await connection.getBalance(publicKey);
  //     const result = new BigNumber(balance).dividedBy(LAMPORTS_PER_SOL);
  //     setBalance(Number(result ?? 0));
  //   })();
  // }, [publicKey, connection]);

  const getBalance = async () => {
    if (!connection || !publicKey) return 0;
    const balance = await connection.getBalance(publicKey);
    const result = new BigNumber(balance).dividedBy(LAMPORTS_PER_SOL);
    return Number(result ?? 0);
  };
  // const network = import.meta.env.VITE_WALLET_ADAPTER_NETWORK;
  // const connection = new Connection(clusterApiUrl(network));
  const programId = new PublicKey(import.meta.env.VITE_PROGRAM_ID);
  const globalMemeConfigId = import.meta.env.VITE_GLOBAL_MEMOO_CONFIG_ID;
  // const { solanaConfig } = useBaseConfig();
  const program = useAnchorProgram(programId, IDL as Idl);
  const [memooConfig, setMemooConfig] = useState<MemooConfig>();
  // const memooConfigPda = new PublicKey(import.meta.env.VITE_MEMOO_CONFIG_PDA);
  // const memooConfigPda = import.meta.env.VITE_MEMOO_CONFIG_PDA;
  const memooConfigPda = useMemo(() => {
    // if (!solanaConfig) return;
    // const globalMemeConfigId = '4b6bXbodnZH1K1kPipZzTAUn93SNYhRidyuz79Uoy4HW';
    // const globalMemeConfigId = solanaConfig?.globalMemooConfigId;
    const config = PublicKey.findProgramAddressSync(
      [Buffer.from('global_memoo_config'), new PublicKey(globalMemeConfigId).toBuffer()],
      // [Buffer.from('global_memoo_config'), new PublicKey(solanaConfig?.globalMemooConfigId).toBuffer()],
      programId,
    )[0];
    console.log('memooConfigPda:', config);
    return config;
    // return new PublicKey(import.meta.env.VITE_MEMOO_CONFIG_PDA);
  }, [globalMemeConfigId]);

  // const getMemooConfig = useCallback(async () => {
  //   if (!memooConfigPda || !program) return;
  //   const config = await program.account.globalMemooConfig.fetch(memooConfigPda);
  //   return config;
  // }, [solanaConfig, publicKey, signTransaction, program]);

  useEffect(() => {
    (async () => {
      if (!memooConfigPda || !program) return;
      // const config = (await program.account.globalMemooConfig.fetch(memooConfigPda)) as any;
      const config: MemooConfig = (await program.account.globalMemooConfig.fetch(memooConfigPda)) as any;
      // debugger;
      console.log('memooConfig:', config);
      setMemooConfig(config);
    })();
  }, [memooConfigPda]);
  const getSimulationUnits = async (
    connection: Connection,
    instructions: TransactionInstruction[],
    payer: PublicKey,
  ): Promise<number | undefined> => {
    const Instructions = [ComputeBudgetProgram.setComputeUnitLimit({ units: 1_400_000 }), ...instructions];

    const VersionedTxn = new VersionedTransaction(
      new TransactionMessage({
        instructions: Instructions,
        payerKey: payer,
        recentBlockhash: PublicKey.default.toString(),
      }).compileToV0Message(),
    );

    const simulation = await connection.simulateTransaction(VersionedTxn, {
      replaceRecentBlockhash: true,
      sigVerify: false,
      commitment: 'finalized',
    });

    if (simulation.value.err) {
      return undefined;
    }

    return simulation.value.unitsConsumed;
  };
  const sendMyTransaction = async (
    publicKey: PublicKey,
    signTransaction: any,
    myTransaction: TransactionInstruction,
    publickeys: PublicKey[],
  ) => {
    // 1. Establish a connection to the Solana cluster
    // const connection = new Connection(endpoint);

    // 2. Create your transaction
    const transaction = new Transaction();
    // ... add instructions to the transaction

    // 3. Fetch the recent priority fees
    // const { result } = await fetchEstimatePriorityFees({ endpoint });
    // const priorityFee = result.per_compute_unit['medium']; // Replace with your priority fee level based on your business requirements
    const recentPrioritizationFees = await connection.getRecentPrioritizationFees({
      lockedWritableAccounts: publickeys,
    });
    const maxPriceItem = recentPrioritizationFees.reduce(
      (max, item) => (item.prioritizationFee > max.prioritizationFee ? item : max),
      recentPrioritizationFees[0],
    );

    console.log('maxPriceItem: ', maxPriceItem);

    const priorityFeeInstruction = ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: maxPriceItem?.prioritizationFee ?? 20000,
    });
    // const recentPrioritizationFees = await connection.getFeeForMessage(
    //   transaction.serializeMessage().toString('base64'),
    // );

    // const recentPrioritizationFees = await transaction.getEstimatedFee(connection);
    // 4. Create a PriorityFee instruction and add it to your transaction
    // if (recentPrioritizationFees) {
    // }

    console.log('recentPrioritizationFees: ', recentPrioritizationFees);
    // console.log('microlamports: ', microlamports);
    // debugger;
    // if (microlamports) {
    //   priorityFeeInstruction = ComputeBudgetProgram.setComputeUnitPrice({
    //     microLamports: microlamports?.prioritizationFee ?? 20000,
    //   });
    // } else {
    //   priorityFeeInstruction = ComputeBudgetProgram.setComputeUnitPrice({
    //     microLamports: 20000,
    //   });
    // }

    transaction.add(priorityFeeInstruction);
    transaction.add(myTransaction);
    // 5. Simulate the transaction and add the compute unit limit instruction to your transaction
    // let [units, recentBlockhash] = await Promise.all([
    //   getSimulationUnits(connection, transaction.instructions, publicKey),
    //   connection.getLatestBlockhash(),
    // ]);
    // console.log('ComputeUnitLimit-units: ', units, ' recentBlockhash: ', recentBlockhash.blockhash);
    // if (units) {
    //   units = Math.ceil(units * 1.05); // margin of error
    //   transaction.add(ComputeBudgetProgram.setComputeUnitLimit({ units }));
    // }
    const recentBlockhash = await connection.getLatestBlockhash('finalized');
    // 6. Sign and send your transaction
    transaction.feePayer = publicKey;
    transaction.recentBlockhash = recentBlockhash.blockhash;
    const signedTransaction = await signTransaction(transaction);

    const hash = await connection.sendRawTransaction(signedTransaction.serialize(), {
      skipPreflight: false,
      maxRetries: 3,
      preflightCommitment: 'finalized',
    });
    const transactionStatus = await connection.getTransaction(hash);
    console.log('TransactionHash: ', hash);
    console.log('transactionStatus: ', transactionStatus);
    return {
      hash,
      blockhash: recentBlockhash.blockhash,
      lastValidBlockHeight: recentBlockhash.lastValidBlockHeight,
    };
  };

  const registerTokenMint = useCallback(
    async (memeId: string, totalPay: string, paySol: number) => {
      if (!publicKey || !signTransaction || !program || !memooConfig) return;
      // console.log('totalPay', Number(new BN(totalPay).add(memooConfig?.platformFeeCreateMemeSol)));
      try {
        // console.log('memooConfigPda:', memooConfigPda);
        // const config = await program.account.globalMemooConfig.fetch(memooConfigPda);
        // console.log('globalMemooConfig:', config);
        // const memeConfigId = Keypair.generate().publicKey;
        const nowBalance = await getBalance();
        if (nowBalance < paySol + 0.00001) {
          message.warning(`Insufficient balance in the wallet`, {
            key: 'Insufficient balance in the wallet to create',
          });
          return 'error';
        }
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
        // console.log('memooConfigPda:', memooConfigPda.toBase58());
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
        const platformFeeBN = new BN(memooConfig?.platformFeeCreateMemeSol);
        // const defaultFeeBN = new BigNumber(0.000000001).multipliedBy(10 ** 9);
        // const totalResult = Number(totalPay) > 0 ? totalPay : defaultFeeBN;
        // const totalPayWithFee = new BN(totalResult).add(platformFeeBN);
        const totalResultBN = new BigNumber(totalPay);
        const totalPayWithFee = totalResultBN.plus(platformFeeBN.toString());
        console.log('totalPay:', Number(totalPay));
        console.log('platformFeeCreateMemeSol: ', platformFeeBN.toString());
        console.log('totalPayWithFee:', totalPayWithFee.toString());
        // const priorityFee = 20000;
        // const priorityFeeInstruction = ComputeBudgetProgram.setComputeUnitPrice({
        //   microLamports: priorityFee,
        // });
        // transaction.add(priorityFeeInstruction);
        const registerTokenMintIx = await program.methods
          .registerTokenMint(memeConfigId, new BN(totalPayWithFee.toString()), new BN(0))
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
          .preInstructions(
            [
              ComputeBudgetProgram.setComputeUnitLimit({
                units: 400_000,
              }),
              ComputeBudgetProgram.setComputeUnitPrice({
                // microLamports: new BN(100000),
                microLamports: 100000,
              }),
            ].filter(Boolean),
          )
          .rpc({
            maxRetries: 3,
          });
        // .rpc();
        return registerTokenMintIx;
        // const confirmationStrategy = {
        //   signature: hash,
        //   blockhash,
        //   lastValidBlockHeight,
        // };

        // const confirmation = await connection.confirmTransaction(confirmationStrategy, 'finalized');
        // console.log('confirmation:', confirmation);

        // if (confirmation.value.err) {
        //   console.log('Transaction failed: ', confirmation.value.err.toString());
        //   return 'error';
        //   // throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`);
        // }
        // return confirmation;
        // return hash;
        // if (hash) return hash;
        //   .rpc();
        // return registerTokenMintIx;
        // const transaction1 = new Transaction();
        // transaction1.add(registerTokenMintIx);
        // transaction.feePayer = publicKey;
        // const simulationResult = await connection.simulateTransaction(transaction1);
        // console.log('simulationResult:', simulationResult);
        // const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
        //   units: simulationResult.value.unitsConsumed ?? 1000000,
        // });

        // const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
        //   microLamports: 10000,
        // });
        // transaction.add(modifyComputeUnits).add(addPriorityFee).add(registerTokenMintIx);
        // const latestBlockhash = await connection.getLatestBlockhash('finalized');
        // transaction.recentBlockhash = latestBlockhash.blockhash;
        // transaction.feePayer = publicKey;
        // const signedTransaction = await signTransaction(transaction);
        // const fee = await transaction.getEstimatedFee(connection);
        // console.log(`Estimated SOL transfer cost: ${fee} lamports`);
        // console.log('latestBlockhash:', latestBlockhash);
        // // const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        // const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
        //   skipPreflight: true,
        //   preflightCommitment: 'confirmed',
        //   maxRetries: 3,
        // });

        // console.log('Transaction sent. Signature:', signature);
        // const confirmationStrategy = {
        //   signature: signature,
        //   blockhash: latestBlockhash.blockhash,
        //   lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        // };

        // const confirmation = await connection.confirmTransaction(confirmationStrategy, 'finalized');
        // console.log('confirmation:', confirmation);

        // if (confirmation.value.err) {
        //   console.log('Transaction failed: ', confirmation.value.err.toString());
        //   return 'error';
        //   // throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`);
        // }
        // return confirmation;
        // return signature;
      } catch (error) {
        console.error('Error in registerTokenMint:', error);
        return null;
        // throw error;
      }
    },
    [connection, signTransaction, publicKey, program, memooConfig],
  );

  const idoBuy = useCallback(
    // eslint-disable-next-line max-params
    async (memeId: string, amount: BigNumber, paySol: number) => {
      if (!memooConfig || !program || !publicKey) return;
      try {
        console.log('memeId:', memeId);
        const nowBalance = await getBalance();
        console.log('nowBalance', nowBalance);
        if (nowBalance < paySol + 0.000001) {
          message.warning(`Insufficient balance in the wallet`, {
            key: 'Insufficient balance in the wallet to idoBuy',
          });
          return;
        }
        const memeConfigId = new PublicKey(memeId);
        // debugger;
        const memeConfigPda = PublicKey.findProgramAddressSync(
          // [Buffer.from('meme_config'), new PublicKey(memeConfigId).toBuffer()],
          [Buffer.from('meme_config'), memeConfigId.toBuffer()],
          programId,
        )[0];
        console.log('memeConfigPda:', memeConfigPda.toString());
        const memeConfig: MemeConfig = (await program.account.memeConfig.fetch(memeConfigPda)) as any;

        // debugger;
        console.log('amount:', Number(amount));
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

        // const idoBuyCost = amount.dividedBy(new BigNumber(memooConfig.idoPrice.toString()));
        // console.log('idoBuyCost', idoBuyCost);
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
        const idoBuyCost = amount.multipliedBy(10 ** 9);
        console.log('idoBuyCost:', Number(idoBuyCost));
        const tx = await program.methods
          // .idoBuy(memeConfigId, idoBuyCost)
          .idoBuy(memeConfigId, new BN(Number(idoBuyCost)))
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
        const nowBalance = await getBalance();
        if (nowBalance < 0.000001) {
          message.warning(`Insufficient balance in the wallet`, {
            key: 'Insufficient balance in the wallet to creatorClaimAll',
          });
          return;
        }
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
        const nowBalance = await getBalance();
        if (nowBalance < 0.000001) {
          message.warning(`Insufficient balance in the wallet`, {
            key: 'Insufficient balance in the wallet to creatorClaimAll',
          });
          return;
        }
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

  const creatorClaimAll = useCallback(
    async (memeId: string, mintaPublicKey: string, userCanClaimCount: number) => {
      if (!memooConfig || !program || !publicKey || !signTransaction) return;
      try {
        const nowBalance = await getBalance();
        if (nowBalance < 0.000001) {
          message.warning(`Insufficient balance in the wallet`, {
            key: 'Insufficient balance in the wallet to creatorClaimAll',
          });
          return;
        }
        const memeConfigId = new PublicKey(memeId);
        const mintAPublicKey = new PublicKey(mintaPublicKey);
        const memeUserDataPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
          programId,
        )[0];
        const adminAccountAPda = getAssociatedTokenAddressSync(mintAPublicKey, publicKey, true);
        const poolAuthorityA = PublicKey.findProgramAddressSync(
          [Buffer.from('authority'), memeConfigId.toBuffer(), mintAPublicKey.toBuffer()],
          programId,
        )[0];
        const poolAccountA = getAssociatedTokenAddressSync(mintAPublicKey, poolAuthorityA, true);
        const instruction1 = await program.methods
          .creatorClaim(memeConfigId)
          .accounts({
            payer: publicKey,
            memooConfig: memooConfigPda,
            memeUserData: memeUserDataPda,
            creatorAccountA: adminAccountAPda,
            mintAccountA: mintAPublicKey,
            poolAuthorityA,
            poolAccountA: poolAccountA,
          })
          .instruction();
        const instruction2 = await program.methods
          .idoClaim(memeConfigId)
          .accounts({
            user: publicKey,
            memeUserData: memeUserDataPda,
            idoUserAccountA: adminAccountAPda,
            mintAccountA: mintAPublicKey,
            poolAuthorityA,
            poolAccountA: poolAccountA,
          })
          .instruction();

        const transaction = new Transaction().add(instruction1);
        if (userCanClaimCount > 0) {
          transaction.add(instruction2);
        }

        const latestBlockhash = await connection.getLatestBlockhash('finalized');
        transaction.recentBlockhash = latestBlockhash.blockhash;
        transaction.feePayer = publicKey;
        const signedTransaction = await signTransaction(transaction);
        const fee = await transaction.getEstimatedFee(connection);
        console.log('fee:', fee);
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        // const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
        //   skipPreflight: true,
        // });

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
  const getMemeCreatorData = useCallback(
    async (memeId: string) => {
      console.log('getMemeUserData');
      // debugger;
      if (!memooConfig || !program || !publicKey) return;
      try {
        // debugger;
        const memeConfigId = new PublicKey(memeId);
        const memeConfigPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_config'), memeConfigId.toBuffer()],
          programId,
        )[0];
        const memeConfig: MemeConfig = (await program.account.memeConfig.fetch(memeConfigPda)) as any;
        const memeUserDataPda_idoBuy = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), memeConfig.creator.toBuffer()],
          programId,
        )[0];
        const memeCreatorData: MemeUserIdoData = (await program.account.memeUserIdoData.fetch(
          memeUserDataPda_idoBuy,
        )) as any;
        console.log('memeCreatorData: ', memeCreatorData);
        return {
          memeConfig,
          memeCreatorData,
        };
      } catch (e) {
        console.log('error: ', e);
      }
    },
    [connection, publicKey, program],
  );

  const airdropClaim = useCallback(
    // eslint-disable-next-line max-params
    async (memeId: string, mintaPublicKey: string, msg: any, signature: Uint8Array, signerPublicKey: PublicKey) => {
      if (!memooConfig || !program || !publicKey || !signTransaction) return;
      try {
        const nowBalance = await getBalance();
        if (nowBalance < 0.000001) {
          message.warning(`Insufficient balance in the wallet`, {
            key: 'Insufficient balance in the wallet to creatorClaimAll',
          });
          return;
        }
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
        const transaction = new Transaction();
        // debugger;
        console.log('createTx-memeId:', memeConfigId.toBase58());
        console.log('createTx-serialized:', msg);
        console.log('createTx-signature:', signature);
        console.log('createTx-payer:', publicKey.toBase58());
        console.log('createTx-payerAccountA:', idoBuyerAccountA.toBase58());
        console.log('createTx-memeConfig:', memeConfigPda.toBase58());
        console.log('createTx-memeUserData:', memeUserDataPda_idoBuy.toBase58());
        console.log('createTx-mintAccountA:', mintAPublicKey.toBase58());
        console.log('createTx-poolAuthorityA:', poolAuthority.toBase58());
        console.log('createTx-poolAccountA:', poolAccountA.toBase58());
        const tx = await new AirdropTxns(program).createTx({
          memeId: memeConfigId,
          serialized: msg,
          signature,
          signerPublicKey,
          payer: publicKey,
          payerAccountA: idoBuyerAccountA,
          memeConfig: memeConfigPda,
          memeUserData: memeUserDataPda_idoBuy,
          mintAccountA: mintAPublicKey,
          poolAuthorityA: poolAuthority,
          poolAccountA: poolAccountA,
          addixEd25519Program: true,
        });
        transaction.add(tx);
        const latestBlockhash = await connection.getLatestBlockhash('finalized');
        transaction.recentBlockhash = latestBlockhash.blockhash;
        transaction.feePayer = publicKey;
        console.log('Transaction: ', transaction);
        // const signedTransaction = await signTransaction(transaction);
        const signedTransaction = await signTransaction(transaction);
        console.log('signedTransaction: ', signedTransaction);

        const txSignature = await connection.sendRawTransaction(signedTransaction.serialize(), {
          skipPreflight: true,
        });
        console.log('txSignature: ', txSignature);
        const txDetails = await connection.getParsedTransaction(txSignature, { commitment: 'confirmed' });
        console.log('txDetails: ', txDetails);
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
        return confirmation;
      } catch (e) {
        console.log('error: ', e);
      }
    },
    [connection, publicKey, program, signTransaction],
  );

  const useAddress = useCallback(
    (className = '', key = 'connect wallet') => {
      if (!publicKey) {
        message.info('Please connect wallet first', { key, className });
        return false;
      }
      return true;
    },
    [publicKey],
  );

  return {
    address: publicKey,
    registerTokenMint,
    memooConfig,
    // getMemooConfig,
    idoBuy,
    creatorClaim,
    creatorClaimAll,
    idoClaim,
    getMemeUserData,
    getMemeCreatorData,
    airdropClaim,
    useAddress,
  };
};
