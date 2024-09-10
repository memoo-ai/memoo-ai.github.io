import { Button } from '@/components/ui/button';
import { LaunchpadIMO, LaunchpadAirdrop } from '@/types';
import { formatTs } from '@/utils';
import IProgress from '@/components/IProgress';
export enum IDOStatus {
  active = 'active',
  upcoming = 'upcoming',
  completed = 'completed',
}
const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
export const columns = (navigate: (path: string) => void) => [
  {
    title: 'Token',
    dataIndex: 'tokenName',
    key: 'tokenName',
    width: '387px',
    render: (tokenName: string, record: LaunchpadIMO) => (
      <div className="flex items-center">
        <img src={record.icon} alt="" className="w-[84px] h-[84px] rounded-full mr-5" />
        <span className="font-OCR font-normal text-lg mr-2 text-[#ffffff]">{tokenName}</span>
        <span className="font-OCR font-normal text-[12px] text-[#07E993] mt-2">{record.ticker}</span>
      </div>
    ),
  },
  {
    title: 'Ends In',
    dataIndex: 'endsIn',
    key: 'endsIn',
    sorter: false,
    render: (endsIn: number) => (
      <div className="font-OCR font-normal text-lg ">{endsIn ? formatTs(endsIn ?? 0) : ''}</div>
    ),
  },
  {
    title: 'Memoo Score',
    dataIndex: 'memooScore',
    key: 'memooScore',
    sorter: false,
    render: (memooScore: number) => (
      <div className="flex flex-col justify-end items-end pt-5">
        <span>{memooScore ?? 0}</span>
        <IProgress percent={memooScore} />
      </div>
    ),
  },
  {
    title: 'Total Raised',
    dataIndex: 'totalRaised',
    key: 'totalRaised',
    sorter: false,
    render: (totalRaised: number) => (
      <span className="font-OCR font-norma text-lg">
        {totalRaised}&nbsp;
        {tokenSymbol}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    width: '150px',
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
        <span className="font-OCR font-normal text-[12px] text-[#07E993] mt-2">{record.ticker}</span>
      </div>
    ),
  },
  {
    title: 'IDO Date',
    dataIndex: 'idoDate',
    key: 'idoDate',
    sorter: false,
    render: (idoDate: number) => (
      <div className="font-OCR font-normal text-lg ">{idoDate ? formatTs(idoDate ?? 0) : ''}</div>
    ),
  },
  {
    title: 'Memoo Score',
    dataIndex: 'memooScore',
    key: 'memooScore',
    sorter: false,
    render: (memooScore: number) => (
      <div className="flex flex-col justify-end items-end pt-5">
        <span>{memooScore ?? 0}</span>
        <IProgress percent={memooScore} />
      </div>
    ),
  },
  {
    title: 'Participants',
    dataIndex: 'participants',
    key: 'participants',
    sorter: false,
    render: (participants: number) => (
      <span className="font-OCR font-normal text-lg">
        {participants} &nbsp;
        {tokenSymbol}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    width: '150px',
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

export const imoSelectOptions = [
  {
    key: 'EndsIn',
    label: 'Ends in',
  },
  {
    key: 'TotalRaised',
    label: 'Total Raised',
  },
];
export const airdropSelectOptions = [
  {
    key: 'IDODate',
    label: 'IDO Date',
  },
  {
    key: 'Participants',
    label: 'Participants',
  },
];
