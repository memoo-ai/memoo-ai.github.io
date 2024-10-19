import { Button } from 'antd';
import { LaunchpadIMO, LaunchpadAirdrop } from '@/types';
import { formatTs, formatRatioToPercentage } from '@/utils';
import IProgress from '@/components/IProgress';
import Countdown from '@/pages/airdrop/countdown';
import { IconCollect } from '@/components/icons';
import useFunctions from '@/hooks/useFunctions';
import IPopover from '@/components/IPopover';
// import { useAccount } from '@/hooks/useWeb3';
// import message from '@/components/IMessage';

export enum IDOStatus {
  active = 'active',
  upcoming = 'upcoming',
  completed = 'completed',
}
const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;

const { collection } = useFunctions();
// const { address } = useAccount();
export const columns = (navigate: (path: string) => void, triggerRefresh: Function, useAddress: Function) => [
  {
    title: 'Token',
    dataIndex: 'tokenName',
    key: 'tokenName',
    width: '387px',
    render: (tokenName: string, record: LaunchpadIMO) => (
      <div className="flex items-center">
        <img src={record.icon} alt="" className="w-[84px] h-[84px] rounded-full mr-5" />
        <span className="font-OCR font-normal text-lg mr-2 text-[#ffffff] h-[84px] flex items-center relative">
          {/* <Sample className="absolute left-0 top-0" /> */}
          {tokenName}
        </span>
        <span className="font-OCR font-normal text-[12px] text-[#07E993] mt-2">{record.ticker}</span>
      </div>
    ),
  },
  {
    title: '',
    dataIndex: 'creatorTotalRaisedNumerator',
    key: 'creatorTotalRaisedNumerator',
    sorter: false,
    render: (creatorTotalRaisedNumerator: string, record: LaunchpadIMO) => (
      <div className="w-[28px]">
        {Number(creatorTotalRaisedNumerator ?? 0) > 0 && (
          <IPopover
            trigger="hover"
            content={`${formatRatioToPercentage(creatorTotalRaisedNumerator, record.creatorTotalRaisedDenominator)}% Increased acquisition`}
          >
            <img className="w-[28px] h-[23px]" src="/create/topupicon.png" />
          </IPopover>
        )}
      </div>
    ),
  },
  {
    title: '',
    dataIndex: 'collectionFlag',
    key: 'collectionFlag',
    sorter: false,
    render: (collectionFlag: boolean, record: LaunchpadIMO) => (
      <div
        onClick={async () => {
          const result = await useAddress('!mt-[130px]');
          if (result) {
            await collection(record.ticker, collectionFlag, triggerRefresh?.(), 135);
          }
        }}
      >
        <IconCollect
          color={collectionFlag ? '#B53BFF ' : '#3D255B'}
          hoverColor={collectionFlag ? '#3D255B' : '#B53BFF'}
        />
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
        className=" flex gap-x-2 font-OCR text-[17px] text-[#fff] line-[13px]"
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
    // width: '140px',
  },
  {
    title: 'Memoo Score',
    dataIndex: 'memooScore',
    key: 'memooScore',
    sorter: false,
    render: (memooScore: number, record: LaunchpadIMO) => (
      <div className="flex flex-col justify-end items-start pt-5">
        <span className="font-OCR w-[130px] text-right font-norma text-lg">
          {formatRatioToPercentage(memooScore, record.totalScore)}
        </span>
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
        <span className="font-OCR font-normal text-lg w-[130px] text-right text-nowrap">
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
export const columnsAirdrop = (navigate: (path: string) => void, triggerRefresh: Function, useAddress: Function) => [
  {
    title: 'Token',
    dataIndex: 'tokenName',
    key: 'tokenName',
    width: '387px',
    render: (tokenName: string, record: LaunchpadAirdrop) => (
      <div className="flex items-center">
        <img src={record.icon} alt="" className="w-[84px] h-[84px] rounded-full mr-5" />
        <span className="font-OCR font-normal text-lg mr-2 text-[#ffffff] h-[84px] flex items-center relative">
          {/* <Sample className="absolute left-0 top-0" /> */}
          {tokenName}
        </span>
        <span className="font-OCR font-normal text-[12px] text-[#07E993] mt-2">{record.ticker}</span>
      </div>
    ),
  },
  {
    title: '',
    dataIndex: 'creatorTotalRaisedNumerator',
    key: 'creatorTotalRaisedNumerator',
    sorter: false,
    render: (creatorTotalRaisedNumerator: string, record: LaunchpadAirdrop) => (
      <div className="w-[28px]">
        {Number(creatorTotalRaisedNumerator ?? 0) > 0 && (
          <IPopover
            trigger="hover"
            content={`${formatRatioToPercentage(creatorTotalRaisedNumerator, record.creatorTotalRaisedDenominator)}% Increased acquisition`}
          >
            <img className="w-[28px] h-[23px]" src="/create/topupicon.png" />
          </IPopover>
        )}
      </div>
    ),
  },
  {
    title: '',
    dataIndex: 'collectionFlag',
    key: 'collectionFlag',
    sorter: false,
    render: (collectionFlag: boolean, record: LaunchpadAirdrop) => (
      <div
        onClick={async () => {
          const result = await useAddress('!mt-[130px]');
          if (result) {
            await collection(record.ticker, collectionFlag, triggerRefresh?.(), 135);
          }
        }}
      >
        <IconCollect
          color={collectionFlag ? '#B53BFF ' : '#3D255B'}
          hoverColor={collectionFlag ? '#3D255B' : '#B53BFF'}
        />
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
