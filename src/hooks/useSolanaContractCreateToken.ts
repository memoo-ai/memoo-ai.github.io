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

const useSolana = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const getNumberDecimals = async (mintAddress: string): Promise<number> => {
    const info = await connection.getParsedAccountInfo(new PublicKey(mintAddress));
    const result = (info.value?.data as ParsedAccountData).parsed.info.decimals as number;
    return result;
  };
  const mintTokenSql = useCallback(async () => {
    if (!publicKey) {
      console.log('Wallet not connected!');
      return;
    }

    try {
      // const secret = [
      //   85, 128, 24, 172, 157, 138, 79, 194, 130, 27, 213, 197, 89, 104, 204, 100, 144, 182, 53, 120, 226, 193, 96, 250,
      //   107, 42, 242, 252, 22, 18, 163, 190, 245, 110, 123, 97, 114, 42, 77, 196, 92, 229, 228, 136, 97, 53, 15, 198,
      //   208, 214, 36, 228, 185, 201, 237, 186, 234, 106, 114, 17, 216, 29, 54, 227,
      // ];
      // console.log(secret);
      const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
      const keypair = Keypair.generate();
      const FROM_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(keypair.secretKey));
      const tokenMintAccount = new PublicKey(keypair.publicKey);
      const DESTINATION_WALLET = 'Dd2wvcTj2WDB9RKCVZKKMSTuZFmmRCYxPEkriAfJj2mK';
      // const DESTINATION_WALLET = '4bic8yotkfTsc4mVsW29bstWPKSGWjfh2qorvymfkr37';
      const MINT_ADDRESS = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';
      // eslint-disable-next-line no-debugger
      debugger;
      const create = await createMint(connection, FROM_KEYPAIR, FROM_KEYPAIR.publicKey, null, 2);
      console.log('createMint:', create.toString());

      const metadataData = {
        name: 'TestMint',
        symbol: 'TRAINING',
        // Arweave / IPFS / Pinata etc link using metaplex standard for off-chain data
        uri: 'https://arweave.net/1234',
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null,
      };
      const metadataPDAAndBump = PublicKey.findProgramAddressSync(
        [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), tokenMintAccount.toBuffer()],
        TOKEN_METADATA_PROGRAM_ID,
      );
      const metadataPDA = metadataPDAAndBump[0];

      const transaction = new Transaction();

      const createMetadataAccountInstruction = createCreateMetadataAccountV3Instruction(
        {
          metadata: metadataPDA,
          mint: tokenMintAccount,
          mintAuthority: keypair.publicKey,
          payer: keypair.publicKey,
          updateAuthority: keypair.publicKey,
        },
        {
          createMetadataAccountArgsV3: {
            collectionDetails: null,
            data: metadataData,
            isMutable: true,
          },
        },
      );

      transaction.add(createMetadataAccountInstruction);

      const transactionSignature = await sendAndConfirmTransaction(connection, transaction, [keypair]);
    } catch (error) {
      console.error('Error sending tokens:', error);
    }
  }, [publicKey]);

  return {
    mintTokenSql,
  };
};

export default useSolana;
