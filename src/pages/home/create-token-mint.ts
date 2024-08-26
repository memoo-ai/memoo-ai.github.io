// import { createMint } from '@solana/spl-token';
// import 'dotenv/config';
// import { getKeypairFromEnvironment, getExplorerLink } from '@solana-developers/helpers';
// import { Connection, clusterApiUrl } from '@solana/web3.js';

// const connection = new Connection(clusterApiUrl('testnet'));

// const user = getKeypairFromEnvironment('SECRET_KEY');

// console.log(`🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`);

// // This is a shortcut that runs:
// // SystemProgram.createAccount
// // token.createInitializeMintInstruction
// // See https://www.soldev.app/course/token-program
// export const tokenMint = await createMint(connection, user, user.publicKey, null, 2);

// const link = getExplorerLink('address', tokenMint.toString(), 'testnet');

// console.log(`✅ Finished! Created token mint: ${link}`);
