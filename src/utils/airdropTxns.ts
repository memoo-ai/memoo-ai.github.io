import { Ed25519Program, PublicKey, SYSVAR_INSTRUCTIONS_PUBKEY, ComputeBudgetProgram } from '@solana/web3.js';
import { Schema, serialize, deserialize } from 'borsh';
import { Memoo } from '@/contracts/idl/memoo';
import { Program, BN } from '@coral-xyz/anchor';

export interface AirdropTxnsParams {
  memeId: PublicKey;
  serialized: Uint8Array;
  signature: Uint8Array;
  signerPublicKey: PublicKey;
  payer: PublicKey;
  payerAccountA: PublicKey;
  memeConfig: PublicKey;
  memeUserData: PublicKey;
  mintAccountA: PublicKey;
  poolAuthorityA: PublicKey;
  poolAccountA: PublicKey;
  addixEd25519Program: boolean;
}

export class AirdropTxns {
  public constructor(private readonly programAPI: Program<Memoo>) {}

  public async createTx({
    memeId,
    serialized,
    signature,
    signerPublicKey,
    payer,
    payerAccountA,
    memeConfig,
    memeUserData,
    mintAccountA,
    poolAuthorityA,
    poolAccountA,
    addixEd25519Program,
  }: AirdropTxnsParams) {
    console.log(`signature is ${signature.length}`);
    let ixEd25519Program: any = null;
    if (addixEd25519Program) {
      ixEd25519Program = Ed25519Program.createInstructionWithPublicKey({
        publicKey: signerPublicKey.toBytes(),
        signature,
        message: serialized,
      });
    }
    console.log(`memeId is ${memeId}`);

    return (
      this.programAPI.methods
        .dealHunterClaim(memeId)
        .accounts({
          payer: payer,
          instructionsSysvar: SYSVAR_INSTRUCTIONS_PUBKEY,
          payerAccountA,
          memeConfig,
          memeUserData,
          mintAccountA,
        })
        .remainingAccounts([
          {
            pubkey: poolAuthorityA,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: poolAccountA,
            isSigner: false,
            isWritable: true,
          },
        ])
        .preInstructions(
          [
            ixEd25519Program,
            ComputeBudgetProgram.setComputeUnitLimit({
              units: 400_000,
            }),
            ComputeBudgetProgram.setComputeUnitPrice({
              microLamports: new BN(100000),
            }),
          ].filter(Boolean),
        )

        // .preInstructions([ixEd25519Program].filter(Boolean))
        .transaction()
    );
  }
}

export class AirdropMessage {
  public static schema: Schema = new Map([
    [
      AirdropMessage,
      {
        kind: 'struct',
        fields: [
          ['address', [32]],
          ['meme', [32]],
          ['count', 'u64'],
          ['expiry', 'u64'],
        ],
      },
    ],
  ]);

  public address: Uint8Array;
  public meme: Uint8Array;
  public count: BN;
  public expiry: BN;

  public constructor(obj: { count: BN; expiry: BN; address: Uint8Array; meme: Uint8Array }) {
    this.address = obj.address;
    this.meme = obj.meme;
    this.count = obj.count;
    this.expiry = obj.expiry;
  }

  public serialize(): Uint8Array {
    return serialize(AirdropMessage.schema, this);
  }

  public deserialize(data: Buffer): AirdropMessage {
    return deserialize(AirdropMessage.schema, AirdropMessage, data);
  }
}
