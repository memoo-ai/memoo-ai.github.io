'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUp, ArrowDown } from 'lucide-react';
import IProgress from '@/components/IProgress';
import useFunctions from '@/hooks/useFunctions';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { TrendingTokens } from '@/types';
import { formatDecimals, formatRatioToPercentage } from '@/utils';
import { IconCollect } from '@/components/icons';
import Wallet from '@/components/SolanaWallet';
import IPopover from '@/components/IPopover';

const { collection } = useFunctions();

export const columns = (triggerRefresh: Function) => [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    width: 50,
    render: (_: any, __: any, index: number) => <div className="flex items-center text-[#fff]">{index + 1}</div>,
    fixed: true,
  },
  {
    title: 'Token',
    dataIndex: 'tokenName',
    key: 'tokenName',
    render: (tokenName: string, record: TrendingTokens) => (
      <div className="flex items-center">
        <img src={record.icon} alt="" className="w-[84px] h-[84px] rounded-full mr-5" />
        <span className="font-normal text-lg mr-2">{tokenName}</span>
        <span className="font-normal text-sm text-[#07E993] uppercase">{record.ticker}</span>
      </div>
    ),
    width: 423,
    fixed: true,
  },
  {
    title: '',
    dataIndex: 'collectionFlag',
    key: 'collectionFlag',
    sorter: false,
    render: (collectionFlag: boolean, record: TrendingTokens) => (
      <Wallet>
        <div
          onClick={async (e) => {
            // if (!address) {
            //   message.info('Please connect wallet first.', { key: 'Please connect wallet first.' });
            //   return;
            // }
            e.stopPropagation();
            await collection(record.ticker, collectionFlag, triggerRefresh?.(), 135);
          }}
        >
          <IconCollect
            color={collectionFlag ? '#B53BFF ' : '#3D255B'}
            hoverColor={collectionFlag ? '#3D255B' : '#B53BFF'}
          />
        </div>
      </Wallet>
    ),
    width: 50,
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    sorter: false,
    render: (price: number) => <div className="font-normal text-lg ">196d</div>,
    width: 120,
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
    key: 'marketCap',
    render: (marketCap: number) => <div className="font-normal text-lg ">${formatDecimals(marketCap)}</div>,
    width: 120,
  },
  {
    title: 'Liquidity',
    dataIndex: 'liquidity',
    key: 'liquidity',
    sorter: false,
    render: (price: number) => <div className="font-normal text-lg ">196d</div>,
    width: 120,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: false,
    render: (price: number) => <div className="font-normal text-lg ">${formatDecimals(price)}</div>,
    width: 120,
  },
  {
    title: 'Holders',
    dataIndex: 'holders',
    key: 'holders',
    sorter: false,
    render: (price: number) => <div className="font-normal text-lg ">196d</div>,
    width: 120,
  },
  {
    title: 'Memoo Score',
    dataIndex: 'memooScore',
    key: 'memooScore',
    sorter: false,
    render: (memooScore: number, record: TrendingTokens) => (
      <div className="flex flex-col justify-end items-end pt-5">
        <span>{formatRatioToPercentage(memooScore, record.totalScore)}</span>
        <IProgress percent={formatRatioToPercentage(memooScore, record.totalScore)} />
      </div>
    ),
    width: 200,
  },

  {
    title: '1h Vol',
    dataIndex: 'vol1h',
    key: 'vol1h',
    sorter: false,
    render: (vol1h: number) => (
      <span className={`font-normal text-lg ${vol1h < 0 ? 'text-red' : 'text-green'}`}>
        {vol1h}
        {/* {increase24H > 0 ? '+' : ''}
        {increase24H * 100}% */}
      </span>
    ),
    width: 120,
  },
  {
    title: '1h',
    dataIndex: 'increase1H',
    key: 'increase1H',
    sorter: false,
    render: (increase1H: number) => (
      <span className={`font-normal text-lg ${increase1H < 0 ? 'text-red' : 'text-green'}`}>
        {increase1H}
        {/* {increase1H > 0 ? '+' : ''}
        {increase1H * 100}% */}
      </span>
    ),
    width: 120,
  },
  {
    title: '24h Volume',
    dataIndex: 'volume24H',
    key: 'volume24H',
    sorter: false,
    render: (volume24H: number) => <div className="font-normal text-lg ">${volume24H}</div>,
    width: 120,
  },

  {
    title: 'Token Audit',
    dataIndex: 'tokenAudit',
    key: 'tokenAudit',
    sorter: false,
    render: (price: number, record: TrendingTokens) => (
      <div className="flex items-center gap-x-[22px]">
        <div className="flex flex-col gap-y-[14px]">
          <p
            className={`font-OCR text-[18px] leading-[20px]  ${Number(record.vol1h) > 0 ? 'text-green' : 'text-[#FE6D6D]'}`}
          >
            30.6%
          </p>
          <h5 className="font-OCR text-[18px] leading-[20px] text-[#7D83B5]">Top10 Hold</h5>
        </div>
        <div className="flex flex-col gap-y-[14px]">
          <p className="font-OCR text-[18px] leading-[20px] text-green">Yes</p>
          <h5 className="font-OCR text-[18px] leading-[20px] text-[#7D83B5]">No Mint</h5>
        </div>
        <div className="flex flex-col gap-y-[14px]">
          <p className="font-OCR text-[18px] leading-[20px] text-green">No</p>
          <h5 className="font-OCR text-[18px] leading-[20px] text-[#7D83B5]">Blacklist</h5>
        </div>
        <div className="flex flex-col gap-y-[14px]">
          <p className="font-OCR text-[18px] leading-[20px] text-green flex gap-x-[10px]">
            Yes{' '}
            <IPopover trigger="hover" content="X% Liquidity Burnt">
              <img className="w-[16px] h-[20px]" src="/gecko/fire.png" />
            </IPopover>
          </p>
          <h5 className="font-OCR text-[18px] leading-[20px] text-[#7D83B5]">Burnt</h5>
        </div>
      </div>
    ),
    width: 500,
  },
];
export const tokenSelectOptions = [
  // {
  //   key: 'Newest',
  //   label: 'Newest',
  // },
  // {
  //   key: 'IDODate',
  //   label: 'IMO Date',
  // },
  // {
  //   key: 'Participants',
  //   label: 'Participants',
  // },

  {
    key: 'price',
    label: 'price',
  },
  {
    key: '1h',
    label: '1h',
  },
  {
    key: '24h',
    label: '24h',
  },
  {
    key: '24hVolume',
    label: '24H Volume',
  },
  {
    key: 'marketCap',
    label: 'MarketCap',
  },
  // {
  //   key: 'memooScore',
  //   label: 'Memoo Score',
  // },
];
