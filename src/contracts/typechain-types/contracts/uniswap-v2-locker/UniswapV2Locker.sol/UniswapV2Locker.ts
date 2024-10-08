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

export interface UniswapV2LockerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "gFees"
      | "getLockedTokenAtIndex"
      | "getNumLockedTokens"
      | "getNumLocksForToken"
      | "getUserLockForTokenAtIndex"
      | "getUserLockedTokenAtIndex"
      | "getUserNumLockedTokens"
      | "getUserNumLocksForToken"
      | "getUserWhitelistStatus"
      | "getWhitelistedUserAtIndex"
      | "getWhitelistedUsersLength"
      | "incrementLock"
      | "lockLPToken"
      | "migrate"
      | "owner"
      | "relock"
      | "renounceOwnership"
      | "setDev"
      | "setFees"
      | "setMigrator"
      | "setReferralTokenAndHold"
      | "setSecondaryFeeToken"
      | "splitLock"
      | "tokenLocks"
      | "transferLockOwnership"
      | "transferOwnership"
      | "uniswapFactory"
      | "whitelistFeeAccount"
      | "withdraw"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "OwnershipTransferred" | "onDeposit" | "onWithdraw"
  ): EventFragment;

  encodeFunctionData(functionFragment: "gFees", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getLockedTokenAtIndex",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getNumLockedTokens",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNumLocksForToken",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserLockForTokenAtIndex",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserLockedTokenAtIndex",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserNumLockedTokens",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserNumLocksForToken",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserWhitelistStatus",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getWhitelistedUserAtIndex",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getWhitelistedUsersLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "incrementLock",
    values: [AddressLike, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "lockLPToken",
    values: [
      AddressLike,
      BigNumberish,
      BigNumberish,
      AddressLike,
      boolean,
      AddressLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "migrate",
    values: [AddressLike, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "relock",
    values: [AddressLike, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "setDev", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "setFees",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setMigrator",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setReferralTokenAndHold",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setSecondaryFeeToken",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "splitLock",
    values: [AddressLike, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenLocks",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferLockOwnership",
    values: [AddressLike, BigNumberish, BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "uniswapFactory",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "whitelistFeeAccount",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [AddressLike, BigNumberish, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "gFees", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getLockedTokenAtIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNumLockedTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNumLocksForToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserLockForTokenAtIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserLockedTokenAtIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserNumLockedTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserNumLocksForToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserWhitelistStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWhitelistedUserAtIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWhitelistedUsersLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "incrementLock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lockLPToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "migrate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "relock", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setDev", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setFees", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setMigrator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setReferralTokenAndHold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSecondaryFeeToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "splitLock", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenLocks", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferLockOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "uniswapFactory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "whitelistFeeAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace onDepositEvent {
  export type InputTuple = [
    lpToken: AddressLike,
    user: AddressLike,
    amount: BigNumberish,
    lockDate: BigNumberish,
    unlockDate: BigNumberish
  ];
  export type OutputTuple = [
    lpToken: string,
    user: string,
    amount: bigint,
    lockDate: bigint,
    unlockDate: bigint
  ];
  export interface OutputObject {
    lpToken: string;
    user: string;
    amount: bigint;
    lockDate: bigint;
    unlockDate: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace onWithdrawEvent {
  export type InputTuple = [lpToken: AddressLike, amount: BigNumberish];
  export type OutputTuple = [lpToken: string, amount: bigint];
  export interface OutputObject {
    lpToken: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface UniswapV2Locker extends BaseContract {
  connect(runner?: ContractRunner | null): UniswapV2Locker;
  waitForDeployment(): Promise<this>;

  interface: UniswapV2LockerInterface;

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

  gFees: TypedContractMethod<
    [],
    [
      [
        bigint,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        string,
        bigint,
        bigint
      ] & {
        ethFee: bigint;
        secondaryFeeToken: string;
        secondaryTokenFee: bigint;
        secondaryTokenDiscount: bigint;
        liquidityFee: bigint;
        referralPercent: bigint;
        referralToken: string;
        referralHold: bigint;
        referralDiscount: bigint;
      }
    ],
    "view"
  >;

  getLockedTokenAtIndex: TypedContractMethod<
    [_index: BigNumberish],
    [string],
    "view"
  >;

  getNumLockedTokens: TypedContractMethod<[], [bigint], "view">;

  getNumLocksForToken: TypedContractMethod<
    [_lpToken: AddressLike],
    [bigint],
    "view"
  >;

  getUserLockForTokenAtIndex: TypedContractMethod<
    [_user: AddressLike, _lpToken: AddressLike, _index: BigNumberish],
    [[bigint, bigint, bigint, bigint, bigint, string]],
    "view"
  >;

  getUserLockedTokenAtIndex: TypedContractMethod<
    [_user: AddressLike, _index: BigNumberish],
    [string],
    "view"
  >;

  getUserNumLockedTokens: TypedContractMethod<
    [_user: AddressLike],
    [bigint],
    "view"
  >;

  getUserNumLocksForToken: TypedContractMethod<
    [_user: AddressLike, _lpToken: AddressLike],
    [bigint],
    "view"
  >;

  getUserWhitelistStatus: TypedContractMethod<
    [_user: AddressLike],
    [boolean],
    "view"
  >;

  getWhitelistedUserAtIndex: TypedContractMethod<
    [_index: BigNumberish],
    [string],
    "view"
  >;

  getWhitelistedUsersLength: TypedContractMethod<[], [bigint], "view">;

  incrementLock: TypedContractMethod<
    [
      _lpToken: AddressLike,
      _index: BigNumberish,
      _lockID: BigNumberish,
      _amount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  lockLPToken: TypedContractMethod<
    [
      _lpToken: AddressLike,
      _amount: BigNumberish,
      _unlock_date: BigNumberish,
      _referral: AddressLike,
      _fee_in_eth: boolean,
      _withdrawer: AddressLike
    ],
    [void],
    "payable"
  >;

  migrate: TypedContractMethod<
    [
      _lpToken: AddressLike,
      _index: BigNumberish,
      _lockID: BigNumberish,
      _amount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  relock: TypedContractMethod<
    [
      _lpToken: AddressLike,
      _index: BigNumberish,
      _lockID: BigNumberish,
      _unlock_date: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  setDev: TypedContractMethod<[_devaddr: AddressLike], [void], "nonpayable">;

  setFees: TypedContractMethod<
    [
      _referralPercent: BigNumberish,
      _referralDiscount: BigNumberish,
      _ethFee: BigNumberish,
      _secondaryTokenFee: BigNumberish,
      _secondaryTokenDiscount: BigNumberish,
      _liquidityFee: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  setMigrator: TypedContractMethod<
    [_migrator: AddressLike],
    [void],
    "nonpayable"
  >;

  setReferralTokenAndHold: TypedContractMethod<
    [_referralToken: AddressLike, _hold: BigNumberish],
    [void],
    "nonpayable"
  >;

  setSecondaryFeeToken: TypedContractMethod<
    [_secondaryFeeToken: AddressLike],
    [void],
    "nonpayable"
  >;

  splitLock: TypedContractMethod<
    [
      _lpToken: AddressLike,
      _index: BigNumberish,
      _lockID: BigNumberish,
      _amount: BigNumberish
    ],
    [void],
    "payable"
  >;

  tokenLocks: TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [
      [bigint, bigint, bigint, bigint, bigint, string] & {
        lockDate: bigint;
        amount: bigint;
        initialAmount: bigint;
        unlockDate: bigint;
        lockID: bigint;
        owner: string;
      }
    ],
    "view"
  >;

  transferLockOwnership: TypedContractMethod<
    [
      _lpToken: AddressLike,
      _index: BigNumberish,
      _lockID: BigNumberish,
      _newOwner: AddressLike
    ],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  uniswapFactory: TypedContractMethod<[], [string], "view">;

  whitelistFeeAccount: TypedContractMethod<
    [_user: AddressLike, _add: boolean],
    [void],
    "nonpayable"
  >;

  withdraw: TypedContractMethod<
    [
      _lpToken: AddressLike,
      _index: BigNumberish,
      _lockID: BigNumberish,
      _amount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "gFees"
  ): TypedContractMethod<
    [],
    [
      [
        bigint,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        string,
        bigint,
        bigint
      ] & {
        ethFee: bigint;
        secondaryFeeToken: string;
        secondaryTokenFee: bigint;
        secondaryTokenDiscount: bigint;
        liquidityFee: bigint;
        referralPercent: bigint;
        referralToken: string;
        referralHold: bigint;
        referralDiscount: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getLockedTokenAtIndex"
  ): TypedContractMethod<[_index: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "getNumLockedTokens"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getNumLocksForToken"
  ): TypedContractMethod<[_lpToken: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getUserLockForTokenAtIndex"
  ): TypedContractMethod<
    [_user: AddressLike, _lpToken: AddressLike, _index: BigNumberish],
    [[bigint, bigint, bigint, bigint, bigint, string]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getUserLockedTokenAtIndex"
  ): TypedContractMethod<
    [_user: AddressLike, _index: BigNumberish],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getUserNumLockedTokens"
  ): TypedContractMethod<[_user: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getUserNumLocksForToken"
  ): TypedContractMethod<
    [_user: AddressLike, _lpToken: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getUserWhitelistStatus"
  ): TypedContractMethod<[_user: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "getWhitelistedUserAtIndex"
  ): TypedContractMethod<[_index: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "getWhitelistedUsersLength"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "incrementLock"
  ): TypedContractMethod<
    [
      _lpToken: AddressLike,
      _index: BigNumberish,
      _lockID: BigNumberish,
      _amount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "lockLPToken"
  ): TypedContractMethod<
    [
      _lpToken: AddressLike,
      _amount: BigNumberish,
      _unlock_date: BigNumberish,
      _referral: AddressLike,
      _fee_in_eth: boolean,
      _withdrawer: AddressLike
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "migrate"
  ): TypedContractMethod<
    [
      _lpToken: AddressLike,
      _index: BigNumberish,
      _lockID: BigNumberish,
      _amount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "relock"
  ): TypedContractMethod<
    [
      _lpToken: AddressLike,
      _index: BigNumberish,
      _lockID: BigNumberish,
      _unlock_date: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setDev"
  ): TypedContractMethod<[_devaddr: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setFees"
  ): TypedContractMethod<
    [
      _referralPercent: BigNumberish,
      _referralDiscount: BigNumberish,
      _ethFee: BigNumberish,
      _secondaryTokenFee: BigNumberish,
      _secondaryTokenDiscount: BigNumberish,
      _liquidityFee: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setMigrator"
  ): TypedContractMethod<[_migrator: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setReferralTokenAndHold"
  ): TypedContractMethod<
    [_referralToken: AddressLike, _hold: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setSecondaryFeeToken"
  ): TypedContractMethod<
    [_secondaryFeeToken: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "splitLock"
  ): TypedContractMethod<
    [
      _lpToken: AddressLike,
      _index: BigNumberish,
      _lockID: BigNumberish,
      _amount: BigNumberish
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "tokenLocks"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [
      [bigint, bigint, bigint, bigint, bigint, string] & {
        lockDate: bigint;
        amount: bigint;
        initialAmount: bigint;
        unlockDate: bigint;
        lockID: bigint;
        owner: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "transferLockOwnership"
  ): TypedContractMethod<
    [
      _lpToken: AddressLike,
      _index: BigNumberish,
      _lockID: BigNumberish,
      _newOwner: AddressLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "uniswapFactory"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "whitelistFeeAccount"
  ): TypedContractMethod<
    [_user: AddressLike, _add: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<
    [
      _lpToken: AddressLike,
      _index: BigNumberish,
      _lockID: BigNumberish,
      _amount: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "onDeposit"
  ): TypedContractEvent<
    onDepositEvent.InputTuple,
    onDepositEvent.OutputTuple,
    onDepositEvent.OutputObject
  >;
  getEvent(
    key: "onWithdraw"
  ): TypedContractEvent<
    onWithdrawEvent.InputTuple,
    onWithdrawEvent.OutputTuple,
    onWithdrawEvent.OutputObject
  >;

  filters: {
    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "onDeposit(address,address,uint256,uint256,uint256)": TypedContractEvent<
      onDepositEvent.InputTuple,
      onDepositEvent.OutputTuple,
      onDepositEvent.OutputObject
    >;
    onDeposit: TypedContractEvent<
      onDepositEvent.InputTuple,
      onDepositEvent.OutputTuple,
      onDepositEvent.OutputObject
    >;

    "onWithdraw(address,uint256)": TypedContractEvent<
      onWithdrawEvent.InputTuple,
      onWithdrawEvent.OutputTuple,
      onWithdrawEvent.OutputObject
    >;
    onWithdraw: TypedContractEvent<
      onWithdrawEvent.InputTuple,
      onWithdrawEvent.OutputTuple,
      onWithdrawEvent.OutputObject
    >;
  };
}
