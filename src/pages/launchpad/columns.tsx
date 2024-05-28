import { Button } from '@/components/ui/button';
export enum IDOStatus {
  active = 'active',
  upcoming = 'upcoming',
  completed = 'completed',
}
export interface IDO {
  id: string;
  endsIn: number;
  icon: string;
  meMooScore: string;
  status: IDOStatus;
  ticker: string;
  tokenName: string;
  totalRaised: number;
}
export interface Airdrop {
  id: string;
  icon: string;
  idoDate: string;
  meMooScore: string;
  participants: number;
  status: IDOStatus;
  ticker: string;
  tokenName: string;
}

export const columns = [
  {
    title: 'Token',
    dataIndex: 'tokenName',
    key: 'tokenName',
    render: (record: IDO) => (
      <div className="flex items-center">
        <img src={record.icon} alt="" className="w-[84px] h-[84px] rounded-full mr-5" />
        <span className="font-404px font-bold text-lg mr-2">{record.tokenName}</span>
        <span className="font-404px font-normal text-sm ">{record.meMooScore}</span>
      </div>
    ),
  },
  {
    title: 'Ends In',
    dataIndex: 'endsIn',
    key: 'endsIn',
    sorter: true,
    render: (endsIn: string) => <div className="font-404px font-semibold text-lg ">{endsIn}</div>,
  },
  {
    title: 'Total Raissed',
    dataIndex: 'totalRaised',
    key: 'totalRaised',
    sorter: true,
    render: (totalRaised: number) => <span className="font-404px font-semibold text-lg">{totalRaised}E</span>,
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Button variant="default" className="w-[136px] h-[50px] uppercase font-404px font-bold text-lg">
        airdrop
      </Button>
    ),
  },
];
export const columnsAirdrop = [
  {
    title: 'Token',
    dataIndex: 'tokenName',
    key: 'tokenName',
    render: (record: Airdrop) => (
      <div className="flex items-center">
        <img src={record.icon} alt="" className="w-[84px] h-[84px] rounded-full mr-5" />
        <span className="font-404px font-bold text-lg mr-2">{record.tokenName}</span>
        <span className="font-404px font-normal text-sm ">{record.meMooScore}</span>
      </div>
    ),
  },
  {
    title: 'IDO Date',
    dataIndex: 'idoDate',
    key: 'idoDate',
    sorter: true,
    render: (idoDate: string) => <div className="font-404px font-semibold text-lg ">{idoDate}</div>,
  },
  {
    title: 'Participants',
    dataIndex: 'participants',
    key: 'participants',
    sorter: true,
    render: (participants: number) => <span className="font-404px font-semibold text-lg">{participants}E</span>,
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Button variant="default" className="w-[136px] h-[50px] uppercase font-404px font-bold text-lg">
        airdrop
      </Button>
    ),
  },
];
