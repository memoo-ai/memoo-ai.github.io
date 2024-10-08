/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export declare namespace MemeInfoStructs {
  export type MemeInfoStruct = {
    creator: AddressLike;
    defaultAdmin: AddressLike;
    pauser: AddressLike;
    minter: AddressLike;
    name: string;
    symbol: string;
    totalSupply: BigNumberish;
    decimals: BigNumberish;
    payToken: AddressLike;
    idoPrice: BigNumberish;
    airdropPrice: BigNumberish;
    preLaunchSecond: BigNumberish;
    idoUserBuyLimit: BigNumberish;
  };

  export type MemeInfoStructOutput = [
    creator: string,
    defaultAdmin: string,
    pauser: string,
    minter: string,
    name: string,
    symbol: string,
    totalSupply: bigint,
    decimals: bigint,
    payToken: string,
    idoPrice: bigint,
    airdropPrice: bigint,
    preLaunchSecond: bigint,
    idoUserBuyLimit: bigint
  ] & {
    creator: string;
    defaultAdmin: string;
    pauser: string;
    minter: string;
    name: string;
    symbol: string;
    totalSupply: bigint;
    decimals: bigint;
    payToken: string;
    idoPrice: bigint;
    airdropPrice: bigint;
    preLaunchSecond: bigint;
    idoUserBuyLimit: bigint;
  };

  export type MemeConfigInfoStruct = {
    memeInfo: MemeInfoStructs.MemeInfoStruct;
    memooConfig: MemooManageStructs.MemooConfigStruct;
    creatorTotal: BigNumberish;
    platformTotal: BigNumberish;
    memeCreateTimestamp: BigNumberish;
  };

  export type MemeConfigInfoStructOutput = [
    memeInfo: MemeInfoStructs.MemeInfoStructOutput,
    memooConfig: MemooManageStructs.MemooConfigStructOutput,
    creatorTotal: bigint,
    platformTotal: bigint,
    memeCreateTimestamp: bigint
  ] & {
    memeInfo: MemeInfoStructs.MemeInfoStructOutput;
    memooConfig: MemooManageStructs.MemooConfigStructOutput;
    creatorTotal: bigint;
    platformTotal: bigint;
    memeCreateTimestamp: bigint;
  };
}

export declare namespace MemooManageStructs {
  export type TokenAllocationStruct = {
    creator: BigNumberish;
    ido: BigNumberish;
    lp: BigNumberish;
    airdrop: BigNumberish;
    platform: BigNumberish;
  };

  export type TokenAllocationStructOutput = [
    creator: bigint,
    ido: bigint,
    lp: bigint,
    airdrop: bigint,
    platform: bigint
  ] & {
    creator: bigint;
    ido: bigint;
    lp: bigint;
    airdrop: bigint;
    platform: bigint;
  };

  export type MemooConfigStruct = {
    memeFactory: AddressLike;
    treasury: AddressLike;
    memeWhitelist: AddressLike;
    uniswapV2Factory: AddressLike;
    uniswapV2Router02: AddressLike;
    uniswapDeadline: BigNumberish;
    liquidityHolder: AddressLike;
    liquidityLocker: AddressLike;
    platformMemeRecipient: AddressLike;
    platformFeeRecipient: AddressLike;
    platformFeeRateIdo: BigNumberish;
    platformFeeRateDenominatorIdo: BigNumberish;
    platformFeeCreateMeme: BigNumberish;
    platformFeeCreateMemePayToken: AddressLike;
    idoCreatorBuyLimit: BigNumberish;
    allocation: MemooManageStructs.TokenAllocationStruct;
  };

  export type MemooConfigStructOutput = [
    memeFactory: string,
    treasury: string,
    memeWhitelist: string,
    uniswapV2Factory: string,
    uniswapV2Router02: string,
    uniswapDeadline: bigint,
    liquidityHolder: string,
    liquidityLocker: string,
    platformMemeRecipient: string,
    platformFeeRecipient: string,
    platformFeeRateIdo: bigint,
    platformFeeRateDenominatorIdo: bigint,
    platformFeeCreateMeme: bigint,
    platformFeeCreateMemePayToken: string,
    idoCreatorBuyLimit: bigint,
    allocation: MemooManageStructs.TokenAllocationStructOutput
  ] & {
    memeFactory: string;
    treasury: string;
    memeWhitelist: string;
    uniswapV2Factory: string;
    uniswapV2Router02: string;
    uniswapDeadline: bigint;
    liquidityHolder: string;
    liquidityLocker: string;
    platformMemeRecipient: string;
    platformFeeRecipient: string;
    platformFeeRateIdo: bigint;
    platformFeeRateDenominatorIdo: bigint;
    platformFeeCreateMeme: bigint;
    platformFeeCreateMemePayToken: string;
    idoCreatorBuyLimit: bigint;
    allocation: MemooManageStructs.TokenAllocationStructOutput;
  };
}

export interface IMemeFactoryInterface extends Interface {
  getFunction(
    nameOrSignature: "createMeme" | "memeConfigInfo"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "MemeCreated"): EventFragment;

  encodeFunctionData(
    functionFragment: "createMeme",
    values: [
      MemeInfoStructs.MemeInfoStruct,
      MemooManageStructs.MemooConfigStruct
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "memeConfigInfo",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "createMeme", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "memeConfigInfo",
    data: BytesLike
  ): Result;
}

export namespace MemeCreatedEvent {
  export type InputTuple = [
    meme: AddressLike,
    memeConfigInfo: MemeInfoStructs.MemeConfigInfoStruct
  ];
  export type OutputTuple = [
    meme: string,
    memeConfigInfo: MemeInfoStructs.MemeConfigInfoStructOutput
  ];
  export interface OutputObject {
    meme: string;
    memeConfigInfo: MemeInfoStructs.MemeConfigInfoStructOutput;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IMemeFactory extends BaseContract {
  connect(runner?: ContractRunner | null): IMemeFactory;
  waitForDeployment(): Promise<this>;

  interface: IMemeFactoryInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  createMeme: TypedContractMethod<
    [
      memeInfo: MemeInfoStructs.MemeInfoStruct,
      memooConfig: MemooManageStructs.MemooConfigStruct
    ],
    [
      [string, MemeInfoStructs.MemeConfigInfoStructOutput] & {
        meme: string;
        memeConfigInfo: MemeInfoStructs.MemeConfigInfoStructOutput;
      }
    ],
    "nonpayable"
  >;

  memeConfigInfo: TypedContractMethod<
    [meme: AddressLike],
    [MemeInfoStructs.MemeConfigInfoStructOutput],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "createMeme"
  ): TypedContractMethod<
    [
      memeInfo: MemeInfoStructs.MemeInfoStruct,
      memooConfig: MemooManageStructs.MemooConfigStruct
    ],
    [
      [string, MemeInfoStructs.MemeConfigInfoStructOutput] & {
        meme: string;
        memeConfigInfo: MemeInfoStructs.MemeConfigInfoStructOutput;
      }
    ],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "memeConfigInfo"
  ): TypedContractMethod<
    [meme: AddressLike],
    [MemeInfoStructs.MemeConfigInfoStructOutput],
    "view"
  >;

  getEvent(
    key: "MemeCreated"
  ): TypedContractEvent<
    MemeCreatedEvent.InputTuple,
    MemeCreatedEvent.OutputTuple,
    MemeCreatedEvent.OutputObject
  >;

  filters: {
    "MemeCreated(address,tuple)": TypedContractEvent<
      MemeCreatedEvent.InputTuple,
      MemeCreatedEvent.OutputTuple,
      MemeCreatedEvent.OutputObject
    >;
    MemeCreated: TypedContractEvent<
      MemeCreatedEvent.InputTuple,
      MemeCreatedEvent.OutputTuple,
      MemeCreatedEvent.OutputObject
    >;
  };
}
