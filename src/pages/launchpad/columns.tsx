import { Button } from '@/components/ui/button';
import { LaunchpadIMO, LaunchpadAirdrop } from '@/types';
export enum IDOStatus {
  active = 'active',
  upcoming = 'upcoming',
  completed = 'completed',
}

export const columns = (navigate: (path: string) => void) => [
  {
    title: 'Token',
    dataIndex: 'tokenName',
    key: 'tokenName',
    render: (tokenName: string, record: LaunchpadIMO) => (
      <div className="flex items-center">
        <img src={record.icon} alt="" className="w-[84px] h-[84px] rounded-full mr-5" />
        <span className="font-404px font-bold text-lg mr-2 text-[#ffffff]">{tokenName}</span>
        <span className="font-404px font-normal text-sm text-[#07E993]">{record.ticker}</span>
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
    render: (record: LaunchpadIMO) => (
      <Button
        variant="default"
        className=" h-[50px] uppercase font-404px font-bold text-lg px-2"
        onClick={() => navigate(`/airdrop/${record.ticker}`)}
      >
        PARTICIPATE
      </Button>
    ),
  },
];
export const columnsAirdrop = (navigate: (path: string) => void) => [
  {
    title: 'Token',
    dataIndex: 'tokenName',
    key: 'tokenName',
    render: (record: LaunchpadAirdrop) => (
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
    render: (record: LaunchpadAirdrop) => (
      <Button
        variant="default"
        className="w-[136px] h-[50px] uppercase font-404px font-bold text-lg"
        onClick={() => navigate(`/airdrop/${record.ticker}`)}
      >
        airdrop
      </Button>
    ),
  },
];
