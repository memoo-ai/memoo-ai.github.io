export interface Token {
  address: string;
  l1Address?: string;
  name?: string;
  symbol: string;
  decimals: number;
  iconUrl?: string;
  price?: any;
  networkKey?: string;
}
export interface SourceToken {
  symbol: string;
  tokenAddress: string;
  chainName: string;
  chainId: number;
  decimals: number;
  balance: number;
  availableToRedeem: number;
  iconURL?: string;
}

export interface MergeToken {
  symbol: string;
  tokenAddress: string;
  decimals: number;
  price: number;
  totalQty: number;
  totalValue: number;
  sourceTokenBalance: number;
  iconURL: string;
  createAt: string;
  lastUpgradedAt: string;
}

export interface IPieChartData {
  name: string;
  value: number;
}
export interface SourceTokenBalanceItem {
  tokenAddress: string;
  symbol: string;
  chainName: string;
  chainId: number;
  balance: bigint;
}

export interface IPieChartData {
  name: string;
  value: number;
}

export interface tableData {
  symbol?: string;
  chainName?: string;
  sourceToken: string;
  transactionHash: string;
  blockTimestamp: string;
  amount: string;
}

declare type TokenCreateStage = 'in-queue' | 'imo' | 'launch' | '1st-claim' | '2st-claim';

declare interface ResponseWrapper<T> {
  code: number;
  data: T;
  msg: string;
}

declare interface IDOActiveDetail {
  commitment: string;
  communityActivit: string;
  communitySize: string;
  contractAddress: string;
  createdAt: string;
  creatorActivity: string;
  description: string;
  endsIn: string;
  fdv: number;
  holders: string;
  icon: string;
  idoDate: string;
  liquidity: string;
  lpContractAddress: string;
  marketCap: string;
  meMooScore: string;
  memeTwitterBind: boolean;
  participants: number;
  pinnedTwitter: string;
  platformTwitterBind: boolean;
  price: number;
  socialInfo: string;
  status: string;
  telegram: string;
  ticker: string;
  tokenName: string;
  totalRaised: string;
  totalSupply: string;
  twitter: string;
  website: string;
}
