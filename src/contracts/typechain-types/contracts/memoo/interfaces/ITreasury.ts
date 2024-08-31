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
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export declare namespace MemooManageStructs {
  export type AddLiquidityParamsStruct = {
    router: AddressLike;
    tokenA: AddressLike;
    tokenB: AddressLike;
    amountADesired: BigNumberish;
    amountBDesired: BigNumberish;
    amountAMin: BigNumberish;
    amountBMin: BigNumberish;
    to: AddressLike;
    deadline: BigNumberish;
  };

  export type AddLiquidityParamsStructOutput = [
    router: string,
    tokenA: string,
    tokenB: string,
    amountADesired: bigint,
    amountBDesired: bigint,
    amountAMin: bigint,
    amountBMin: bigint,
    to: string,
    deadline: bigint
  ] & {
    router: string;
    tokenA: string;
    tokenB: string;
    amountADesired: bigint;
    amountBDesired: bigint;
    amountAMin: bigint;
    amountBMin: bigint;
    to: string;
    deadline: bigint;
  };

  export type AddLiquidityEthParamsStruct = {
    router: AddressLike;
    token: AddressLike;
    amountTokenDesired: BigNumberish;
    amountTokenMin: BigNumberish;
    amountETHMin: BigNumberish;
    to: AddressLike;
    deadline: BigNumberish;
  };

  export type AddLiquidityEthParamsStructOutput = [
    router: string,
    token: string,
    amountTokenDesired: bigint,
    amountTokenMin: bigint,
    amountETHMin: bigint,
    to: string,
    deadline: bigint
  ] & {
    router: string;
    token: string;
    amountTokenDesired: bigint;
    amountTokenMin: bigint;
    amountETHMin: bigint;
    to: string;
    deadline: bigint;
  };
}

export interface ITreasuryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addLiquidity"
      | "addLiquidityETH"
      | "approve"
      | "burn"
      | "transfer"
      | "transferEth"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addLiquidity",
    values: [MemooManageStructs.AddLiquidityParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "addLiquidityETH",
    values: [MemooManageStructs.AddLiquidityEthParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "burn",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferEth",
    values: [AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addLiquidityETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferEth",
    data: BytesLike
  ): Result;
}

export interface ITreasury extends BaseContract {
  connect(runner?: ContractRunner | null): ITreasury;
  waitForDeployment(): Promise<this>;

  interface: ITreasuryInterface;

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

  addLiquidity: TypedContractMethod<
    [addLiquidityParams: MemooManageStructs.AddLiquidityParamsStruct],
    [
      [bigint, bigint, bigint] & {
        amountA: bigint;
        amountB: bigint;
        liquidity: bigint;
      }
    ],
    "nonpayable"
  >;

  addLiquidityETH: TypedContractMethod<
    [addLiquidityEthParams: MemooManageStructs.AddLiquidityEthParamsStruct],
    [
      [bigint, bigint, bigint] & {
        amountToken: bigint;
        amountETH: bigint;
        liquidity: bigint;
      }
    ],
    "payable"
  >;

  approve: TypedContractMethod<
    [token: AddressLike, spender: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  burn: TypedContractMethod<
    [token: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  transfer: TypedContractMethod<
    [token: AddressLike, to: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  transferEth: TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addLiquidity"
  ): TypedContractMethod<
    [addLiquidityParams: MemooManageStructs.AddLiquidityParamsStruct],
    [
      [bigint, bigint, bigint] & {
        amountA: bigint;
        amountB: bigint;
        liquidity: bigint;
      }
    ],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "addLiquidityETH"
  ): TypedContractMethod<
    [addLiquidityEthParams: MemooManageStructs.AddLiquidityEthParamsStruct],
    [
      [bigint, bigint, bigint] & {
        amountToken: bigint;
        amountETH: bigint;
        liquidity: bigint;
      }
    ],
    "payable"
  >;
  getFunction(
    nameOrSignature: "approve"
  ): TypedContractMethod<
    [token: AddressLike, spender: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "burn"
  ): TypedContractMethod<
    [token: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [token: AddressLike, to: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferEth"
  ): TypedContractMethod<
    [to: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  filters: {};
}
