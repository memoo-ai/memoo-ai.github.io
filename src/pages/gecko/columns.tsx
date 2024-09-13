'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUp, ArrowDown } from 'lucide-react';
import IProgress from '@/components/IProgress';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { TrendingTokens } from '@/types';
import { formatDecimals } from '@/utils';

export const columnsOld: ColumnDef<TrendingTokens>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <div
          className="cursor-pointer flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'priceChangeHourly',
    header: 'priceChangeHourly',
  },
  {
    accessorKey: 'priceChangeDaily',
    header: 'priceChangeDaily',
  },
  {
    accessorKey: 'volumeDaily',
    header: 'volumeDaily',
  },
  {
    accessorKey: 'marketCap',
    header: 'marketCap',
  },
];

export const columns = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    width: 20,
    render: (_: any, __: any, index: number) => <div className="flex items-center text-[#fff]">{index + 1}</div>,
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
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: false,
    render: (price: number) => <div className="font-normal text-lg ">SOL {formatDecimals(price)}</div>,
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
    title: 'Market Cap',
    dataIndex: 'marketCap',
    key: 'marketCap',
    render: (marketCap: number) => <div className="font-normal text-lg ">${formatDecimals(marketCap)}</div>,
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
];
export const tokenSelectOptions = [
  {
    key: 'Newest',
    label: 'Newest',
  },
  {
    key: 'IDODate',
    label: 'IDO Date',
  },
  {
    key: 'Participants',
    label: 'Participants',
  },
  {
    key: 'memooScore',
    label: 'Memoo Score',
  },
  // {
  //   key: 'price',
  //   label: 'price',
  // },
  // {
  //   key: '1h',
  //   label: '1h',
  // },
  // {
  //   key: '24h',
  //   label: '24h',
  // },
  // {
  //   key: '24hVolume',
  //   label: '24H Volume',
  // },
  // {
  //   key: 'marketCap',
  //   label: 'MarketCap',
  // },
];
