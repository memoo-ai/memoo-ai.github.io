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
