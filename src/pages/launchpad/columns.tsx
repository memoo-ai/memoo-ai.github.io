import { Button } from '@/components/ui/button';
import { LaunchpadIMO, LaunchpadAirdrop } from '@/types';
import { formatTs } from '@/utils';
import Wallet from '@/components/Wallet';
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
        <span className="font-OCR font-bold text-lg mr-2 text-[#ffffff]">{tokenName}</span>
        <span className="font-OCR font-normal text-sm text-[#07E993]">{record.ticker}</span>
      </div>
    ),
  },
  {
    title: 'Ends In',
    dataIndex: 'endsIn',
    key: 'endsIn',
    sorter: true,
    render: (endsIn: number) => (
      <div className="font-OCR font-semibold text-lg ">{endsIn ? formatTs(endsIn ?? 0) : ''}</div>
    ),
  },
  {
    title: 'Total Raissed',
    dataIndex: 'totalRaised',
    key: 'totalRaised',
    sorter: true,
    render: (totalRaised: number) => <span className="font-OCR font-semibold text-lg">{totalRaised}E</span>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (record: LaunchpadIMO) => (
      // <Wallet>

      // </Wallet>
      <Button
        variant="secondary"
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
    render: (tokenName: string, record: LaunchpadAirdrop) => (
      <div className="flex items-center">
        <img src={record.icon} alt="" className="w-[84px] h-[84px] rounded-full mr-5" />
        <span className="font-OCR font-bold text-lg mr-2">{tokenName}</span>
        <span className="font-OCR font-normal text-sm ">{record.ticker}</span>
      </div>
    ),
  },
  {
    title: 'IDO Date',
    dataIndex: 'idoDate',
    key: 'idoDate',
    sorter: true,
    render: (idoDate: number) => (
      <div className="font-OCR font-semibold text-lg ">{idoDate ? formatTs(idoDate ?? 0) : ''}</div>
    ),
  },
  {
    title: 'Participants',
    dataIndex: 'participants',
    key: 'participants',
    sorter: true,
    render: (participants: number) => <span className="font-OCR font-semibold text-lg">{participants}E</span>,
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
