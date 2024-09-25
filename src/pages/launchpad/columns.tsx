import { Button } from 'antd';
import { LaunchpadIMO, LaunchpadAirdrop } from '@/types';
import { formatTs, formatRatioToPercentage } from '@/utils';
import IProgress from '@/components/IProgress';
import Countdown from '@/pages/airdrop/countdown';
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
      // <div className="font-OCR font-normal text-lg ">{endsIn ? formatTs(endsIn ?? 0) : ''}</div>
      <Countdown
        className=" flex gap-x-2 mt-5 font-OCR text-[17px] text-[#fff] line-[13px]"
        timefragments="timefragments-kings"
        format={([days, hours, minutes, seconds]) => [
          // <div key="days">
          //   <time>{days}</time>
          //   <span>D</span>
          // </div>,
          <div key="hours">
            <time>{hours}</time>
            <span>H</span>
          </div>,
          <div key="minutes">
            <time>{minutes}</time>
            <span>M</span>
          </div>,
          <div key="seconds">
            <time>{seconds}</time>
            <span>S</span>
          </div>,
        ]}
        instant={endsIn * 1000}
        // instant={1720510654000}
        onEnded={(ended) => {
          // setEnded(ended);
        }}
        symbol=""
      />
    ),
  },
  {
    title: 'Memoo Score',
    dataIndex: 'memooScore',
    key: 'memooScore',
    sorter: false,
    render: (memooScore: number, record: LaunchpadIMO) => (
      <div className="flex flex-col justify-end items-start pt-5">
        <span className="font-OCR font-norma text-lg">{formatRatioToPercentage(memooScore, record.totalScore)}</span>
        <IProgress className="w-[130px]" percent={formatRatioToPercentage(memooScore, record.totalScore)} />
      </div>
    ),
    // width: '140px',
  },
  {
    title: 'Total Raised',
    dataIndex: 'totalRaised',
    key: 'totalRaised',
    sorter: false,
    render: (totalRaised: string, record: LaunchpadIMO) => (
      <div className="flex flex-col justify-end items-start pt-5">
        <span className="font-OCR font-norma text-lg">
          {totalRaised}&nbsp;
          {tokenSymbol}
        </span>
        <IProgress
          className="w-[130px]"
          percent={formatRatioToPercentage(Number(record.totalRaisedNumerator), Number(record.totalRaisedDenominator))}
        />
      </div>
    ),
    // width: '140px',
  },
  {
    title: 'Action',
    key: 'action',
    width: '150px',
    render: (record: LaunchpadIMO) => (
      <Button
        className="memoo_button w-[136px] h-[50px] rounded-[7px] reverse"
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
    title: 'IMO Date',
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
    render: (memooScore: number, record: LaunchpadAirdrop) => (
      <div className="flex flex-col justify-end items-end pt-5">
        <span>{formatRatioToPercentage(memooScore, record.totalScore)}</span>
        <IProgress percent={formatRatioToPercentage(memooScore, record.totalScore)} />
      </div>
    ),
  },
  {
    title: 'Participants',
    dataIndex: 'participants',
    key: 'participants',
    sorter: false,
    render: (participants: number) => (
      <div className="flex justify-center">
        <span className="font-OCR font-normal text-lg">
          {participants}
          {/* {tokenSymbol} */}
        </span>
      </div>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    width: '150px',
    render: (record: LaunchpadAirdrop) => (
      <Button
        className="memoo_button w-[136px] h-[50px] rounded-[7px]"
        onClick={() => navigate(`/airdrop/${record.ticker}`)}
      >
        airdrop
      </Button>
    ),
  },
];

export const imoSelectOptions = [
  {
    key: 'Newest',
    label: 'Newest',
  },
  {
    key: 'EndsIn',
    label: 'Ends in',
  },

  {
    key: 'TotalRaised',
    label: 'Total Raised',
  },
  {
    key: 'MemooScore',
    label: 'Memoo Score',
  },
];
export const airdropSelectOptions = [
  {
    key: 'Newest',
    label: 'Newest',
  },
  {
    key: 'IDODate',
    label: 'IMO Date',
  },
  {
    key: 'Participants',
    label: 'Participants',
  },
  {
    key: 'MemooScore',
    label: 'Memoo Score',
  },
];
