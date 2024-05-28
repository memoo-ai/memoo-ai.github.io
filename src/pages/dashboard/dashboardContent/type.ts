export type CreatorStatus = 'All' | 'Draft' | 'QUEUE' | 'IMO' | 'Launched';
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
