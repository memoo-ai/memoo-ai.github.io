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

const { collection } = useFunctions();

export const columns = (triggerRefresh: Function) => [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    width: 20,
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
    fixed: true,
  },
  {
    title: '',
    dataIndex: 'collectionFlag',
    key: 'collectionFlag',
    sorter: false,
    render: (collectionFlag: boolean, record: TrendingTokens) => (
      <div
        onClick={async () => {
          // if (!address) {
          //   message.info('Please connect wallet first.', { key: 'Please connect wallet first.' });
          //   return;
          // }
          await collection(record.ticker, collectionFlag, triggerRefresh?.(), 135);
        }}
      >
        <IconCollect
          color={collectionFlag ? '#B53BFF ' : '#3D255B'}
          hoverColor={collectionFlag ? '#3D255B' : '#B53BFF'}
        />
      </div>
    ),
  },
  // {
  //   title: 'Created',
  //   dataIndex: 'created',
  //   key: 'created',
  //   sorter: false,
  //   render: (price: number) => <div className="font-normal text-lg ">196d</div>,
  // },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
    key: 'marketCap',
    render: (marketCap: number) => <div className="font-normal text-lg ">${formatDecimals(marketCap)}</div>,
  },
  // {
  //   title: 'Liquidity',
  //   dataIndex: 'liquidity',
  //   key: 'liquidity',
  //   sorter: false,
  //   render: (price: number) => <div className="font-normal text-lg ">196d</div>,
  // },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: false,
    render: (price: number) => <div className="font-normal text-lg ">${formatDecimals(price)}</div>,
  },
  // {
  //   title: 'Holders',
  //   dataIndex: 'holders',
  //   key: 'holders',
  //   sorter: false,
  //   render: (price: number) => <div className="font-normal text-lg ">196d</div>,
  // },
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
  },
  {
    title: '24h',
    dataIndex: 'increase24H',
    key: 'increase24H',
    sorter: false,
    render: (increase24H: number) => (
      <span className={`font-normal text-lg ${increase24H < 0 ? 'text-red' : 'text-green'}`}>
        {increase24H}
        {/* {increase24H > 0 ? '+' : ''}
        {increase24H * 100}% */}
      </span>
    ),
  },
  {
    title: '24h Volume',
    dataIndex: 'volume24H',
    key: 'volume24H',
    sorter: false,
    render: (volume24H: number) => <div className="font-normal text-lg ">${volume24H}</div>,
  },

  {
    title: 'Token Audit',
    dataIndex: 'tokenAudit',
    key: 'tokenAudit',
    sorter: false,
    render: (price: number, record: TrendingTokens) => (
      <div className="flex items-center">
        <div>
          <p className="font-OCR text-[18px] leading-[20px] text-[#FE6D6D]">30.6%</p>
          <h5>Top10 Hold</h5>
        </div>
        <div>
          <p>Yes</p>
          <h5>No Mint</h5>
        </div>
        <div>
          <p>No</p>
          <h5>Blacklist</h5>
        </div>
        <div>
          <p>Yes</p>
          <h5>Burnt</h5>
        </div>
      </div>
    ),
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