import { Button } from '@/components/ui/button';
export enum IDOStatus {
  active = 'active',
  upcoming = 'upcoming',
  completed = 'completed',
}
export interface IDO {
  id: string;
  logo: string;
  name: string;
  symbol: string;
  date: string;
  totalRaised: number;
  status: IDOStatus;
}

export const columns = [
  {
    title: 'Token',
    dataIndex: 'name',
    key: 'name',
    render: (name: string, record: IDO) => (
      <div className="flex items-center">
        <img src="" alt="" className="w-[84px] h-[84px] rounded-full mr-5" />
        <span className="font-404px font-bold text-lg mr-2">{name}</span>
        <span className="font-404px font-normal text-sm ">{record.symbol}</span>
      </div>
    ),
  },
  {
    title: 'IDO Date',
    dataIndex: 'date',
    key: 'date',
    sorter: true,
    render: (date: string) => <div className="font-404px font-semibold text-lg ">{date}</div>,
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
