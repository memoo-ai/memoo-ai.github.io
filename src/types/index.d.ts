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

declare interface IDOClaimStage {
  stageOneClaim: boolean;
  stageTwoClaim: boolean;
}

declare interface ResponseWrapper<T> {
  code: number;
  data: T;
  msg: string;
}

declare interface IDOActiveDetail extends IDOClaimStage {
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
  status: IDOStatus;
  telegram: string;
  ticker: string;
  tokenName: string;
  totalRaised: string;
  totalSupply: string;
  twitter: string;
  website: string;
}

declare interface IDOLaunchedDetail extends IDOClaimStage {
  allTimeLow: number;
  claimFlag: boolean;
  commitment: string;
  communityActivit: string;
  communitySize: string;
  contractAddress: string;
  count: number;
  createdAt: string;
  creatorActivity: string;
  description: string;
  fdv: string;
  holders: string;
  icon: string;
  idoDate: string;
  increase1H: number;
  increase24H: number;
  liquidity: string;
  lpContractAddress: string;
  lpLock: boolean;
  marketCap: string;
  maxSupply: string;
  meMooScore: string;
  memeTwitterBind: boolean;
  participants: number;
  pinnedTwitter: string;
  platformTwitterBind: boolean;
  price: number;
  socialInfo: string;
  status: IDOStatus;
  telegram: string;
  ticker: string;
  tokenName: string;
  totalRaised: string;
  totalSupply: string;
  twitter: string;
  volume24H: number;
  website: string;
}

declare interface PageWrapper<T> {
  limit: number;
  next_page: number;
  offset: number;
  page: number;
  prev_page: number;
  records: T[];
  rowStart: number;
  total_page: number;
  total_record: number;
}

declare interface IDOLaunchedDetailTop10 {
  address: string;
  proportion: string;
}

declare interface IDOQueueDetail extends IDOClaimStage {
  commitment: string;
  communityActivit: string;
  communitySize: string;
  contractAddress: string;
  createdAt: number;
  creatorActivity: string;
  description: string;
  endsIn: string;
  fdv: number;
  holders: string;
  icon: string;
  idoDate: number;
  liquidity: string;
  lpContractAddress: string;
  marketCap: string;
  meMooScore: string;
  banners: string[];
  memeTwitterBind: boolean;
  pinnedTwitter: string;
  platformTwitterBind: boolean;
  socialInfo: string;
  status: IDOStatus;
  telegram: string;
  ticker: string;
  tokenName: string;
  totalRaised: string;
  totalSupply: number;
  twitter: string;
  website: string;
  projectTwitter: string;
  platformTwitter: string;
  airdropEndsIn: number;
  claimFlag: boolean;
  creatorAddress: string;
  creatorTelegram: string;
  creatorTwitter: string;
  creatorWebsite: string;
}

declare type IDOStatus = 'Draft' | 'QUEUE' | 'IDO' | 'Launched';
