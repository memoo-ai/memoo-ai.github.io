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
  endsIn: number;
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
  rewardEndsIn: number;
}

declare interface IDOLaunchedDetail extends IDOClaimStage {
  allTimeLow: number;
  allTimeLowTime: number;
  allTimeLowIncrease: string;
  allTimeHigh: number;
  allTimeHighTime: number;
  allTimeHighTimeIncrease: string;
  claimFlag: boolean;
  commitment: string;
  communityActivit: string;
  communitySize: string;
  // contractAddress: string;
  contractAddress: `0x${string}`;
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
  rewardEndsIn: number;
  count: number;
  website: string;
  claimImoFlag: boolean;
  isParticipateImo: boolean;
  imoBalance: number;
  claimImoBalance: number;
  contributed: number;
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
declare interface memooScore {
  scoreField: string;
  scoreValue: number;
  totalScore: number;
}
declare interface IDOQueueDetail extends IDOClaimStage {
  commitment: string;
  communityActivit: string;
  communitySize: string;
  contractAddress: Address;
  createdAt: number;
  creatorActivity: string;
  description: string;
  endsIn: string;
  fdv: number;
  holders: string;
  icon: string;
  price: number;
  idoDate: number;
  liquidity: string;
  lpContractAddress: Address;
  marketCap: string;
  meMooScore: string;
  banners: string[];
  memeTwitterBind: boolean;
  pinnedTwitter: string;
  platformTwitterBind: boolean;
  projectTwitterBind: boolean;
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
  creatorAddress: Address;
  creatorTelegram: string;
  creatorTwitter: string;
  creatorWebsite: string;
  contributed: number;
  maxContributed: number;
  rewardEndsIn: number;
  count: number;
  claimImoFlag: boolean;
  isParticipateImo: boolean;
  imoBalance: number;
  claimImoBalance: number;
  memooScore: memooScore[];
}

declare type IDOStatus = 'Draft' | 'QUEUE' | 'IDO' | 'Launched';

declare interface pageParams {
  pageNumber: number;
  pageSize: number;
  status?: string;
}

declare interface LaunchpadIMO {
  endsIn: string;
  icon: string;
  meMooScore: string;
  status: string;
  ticker: string;
  tokenName: string;
  totalRaised: string;
}
declare interface LaunchpadAirdrop {
  icon: string;
  idoDate: string;
  meMooScore: string;
  participants: number;
  status: string;
  ticker: string;
  tokenName: string;
}
declare interface LaunchpadIDOCompeted {
  athRoi: string;
  icon: string;
  meMooScore: string;
  ticker: string;
  tokenName: string;
  totalRaised: string;
}

declare interface DashboardCreator {
  icon: string;
  launchDate: number;
  meMooScore: string;
  stageOneClaim: boolean;
  stageTwoClaim: boolean;
  status: string;
  ticker: string;
  tokenName: string;
  totalRaised: string;
}
declare interface DashboardCollectorAirdrop {
  claimFlag: boolean;
  endsIn: number;
  icon: string;
  launchDate: number;
  meMooScore: string;
  status: string;
  ticker: string;
  tokenName: string;
  totalRaised: string;
  totalSupply: number;
}
declare interface DashboardCollectorParticipated {
  contributed: string;
  endsIn: number;
  icon: string;
  launchDate: number;
  meMooScore: string;
  participatedFlag: boolean;
  status: string;
  ticker: string;
  tokenName: string;
  totalRaised: string;
  totalSupply: number;
}
declare type DashboardCollectorItem = DashboardCollectorAirdrop & DashboardCollectorParticipated;

declare interface DashboardWatchList {
  collectionFlag: boolean;
  endsIn: number;
  icon: string;
  launchDate: number;
  meMooScore: string;
  status: string;
  ticker: string;
  tokenName: string;
  totalRaised: string;
  totalSupply: number;
}
declare interface TrendingTokens {
  icon: string;
  increase1H: number;
  increase24H: number;
  marketCap: number;
  meMooScore: string;
  price: number;
  ticker: string;
  tokenName: string;
  volume24H: number;
}
declare interface TrendingCreators {
  collectiveHolders: number;
  collectiveMarketCap: string;
  profileImageUrl: string;
  rank: number;
  rankIcon: string;
  tokensCreated: number;
  topTokenMarketCap: string;
  userName: string;
}

declare type Address = `0x${string}` | string;

declare interface ProofRes {
  proof: string[];
  count: number;
  address: Address;
}

declare interface UnlockPeriod {
  index: bigint;
  periodType: 'price';
  value: bigint;
  unlockRate: bigint;
}
declare interface getMeMeme {
  balance: string;
  ethAmout: string;
  ticker: string;
}

declare interface TokenDetail {
  address: string;
  airdropEndsIn: number;
  banners: string[];
  claimFlag: boolean;
  contractAddress: string;
  contributed: number;
  createdAt: number;
  creatorAddress: string;
  creatorTelegram: string;
  creatorTwitter: string;
  creatorWebsite: string;
  description: string;
  endsIn: number;
  fdv: string;
  icon: string;
  idoDate: number;
  idoEndFlag: boolean;
  launchDate: number;
  lpContractAddress: string;
  lpLock: boolean;
  marketCap: string;
  maxContributed: number;
  oldBanners: string[];
  oldIcon: string;
  pinnedTwitter: string;
  preLaunchDuration: string;
  preMarketAcquisition: number;
  price: number;
  projectName: string;
  rewardEndsIn: number;
  stageOneClaim: boolean;
  stageTwoClaim: boolean;
  status: string;
  telegram: string;
  ticker: string;
  tokenName: string;
  totalRaised: string;
  totalSupply: string;
  twitter: string;
  userName: string;
  website: string;
}
declare interface LoginParams {
  address: any;
  message: string;
  signature: string;
  chain: 'Ethereum' | 'Solana';
}
declare interface LoginToken {
  expire: number;
  token: string;
}
declare interface AirdropDetail {
  hexMessage: string;
  hexSignature: string;
  jsonData: string;
  signature: string;
  airdropCount: number;
}
declare interface ImoPvCard {
  banners: [];
  contributed: number;
  description: string;
  endsIn: number;
  icon: string;
  idoPrice: number;
  maxContributed: number;
  projectId: number;
  ticker: string;
  tokenName: string;
}
declare interface AirdropCard {
  address: string;
  icon: string;
  ticker: string;
  tokenName: string;
}
declare interface CrossDirection {
  address: string;
  icon: string;
  ticker: string;
  tokenName: string;
}

declare interface CrowdSourcing {
  address: string;
  amout: string;
  icon: string;
  ticker: string;
  tokenName: string;
  tradeType: string;
}
declare interface SolanaConfig {
  globalMemooConfigId: string;
  memeConfigId: string;
  platformFeeRecipientPublicKey: string;
}
declare interface SolanaMemeConfig {
  memeConfigId: string;
  mintaPublickey: string;
}
declare interface memooConfig {
  admin: string;
  airdropPrice: string;
  id: string;
  idoPrice: string;
  idoCreatorBuyLimit: number;
  idoUserBuyLimit: number;
  openTime: string;
  platformFeeCreateMemeSol: string;
  platformFeeRateDenominatorIdo: number;
  platformFeeRateIdo: number;
  tokenAllocationAirdrop: number;
  tokenAllocationCreator: number;
  tokenAllocationIdo: number;
  tokenAllocationLp: number;
  tokenAllocationPlatform: number;
  totalSupply: string;
}
