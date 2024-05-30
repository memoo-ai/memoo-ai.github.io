export type CreatorStatus = '' | 'Draft' | 'QUEUE' | 'IDO' | 'Launched';
export type CollectorType = 'Airdrop' | 'Participated';
export interface CreatorList {
  id: string;
  icon: string;
  launchDate: number;
  meMooScore: string;
  status: CreatorStatus;
  ticker: string;
  tokenName: string;
  totalRaised: string;
}
export interface Collector {
  id: string;
  icon: string;
  launchDate: number;
  meMooScore: string;
  status: CreatorStatus;
  ticker: string;
  tokenName: string;
  totalRaised: string;
}
