'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUp, ArrowDown } from 'lucide-react';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChangeHourly: number;
  priceChangeDaily: number;
  volumeDaily: number;
  marketCap: number;
}

export const columnsOld: ColumnDef<Token>[] = [
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
    title: 'Token',
    dataIndex: 'name',
    key: 'name',
    render: (name: string, record: Token) => (
      <div className="flex items-center">
        <img src="" alt="" className="w-[84px] h-[84px] rounded-full mr-5" />
        <span className="font-404px font-bold text-lg mr-2">{name}</span>
        <span className="font-404px font-normal text-sm ">{record.symbol}</span>
      </div>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
    render: (price: number) => <div className="font-404px font-semibold text-lg ">${price}</div>,
  },
  {
    title: '1h',
    dataIndex: 'priceChangeHourly',
    key: 'priceChangeHourly',
    sorter: true,
    render: (priceChangeHourly: number) => (
      <span className={`font-404px font-semibold text-lg ${priceChangeHourly < 0 ? 'text-red' : 'text-green'}`}>
        {priceChangeHourly > 0 ? '+' : ''}
        {priceChangeHourly * 100}%
      </span>
    ),
  },
  {
    title: '24h',
    dataIndex: 'priceChangeDaily',
    key: 'priceChangeDaily',
    sorter: true,
    render: (priceChangeDaily: number) => (
      <span className={`font-404px font-semibold text-lg ${priceChangeDaily < 0 ? 'text-red' : 'text-green'}`}>
        {priceChangeDaily > 0 ? '+' : ''}
        {priceChangeDaily * 100}%
      </span>
    ),
  },
  {
    title: '24h Volume',
    dataIndex: 'volumeDaily',
    key: 'volumeDaily',
    sorter: true,
    render: (volumeDaily: number) => <div className="font-404px font-semibold text-lg ">${volumeDaily}</div>,
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
    key: 'marketCap',
    render: (marketCap: number) => <div className="font-404px font-semibold text-lg ">${marketCap}</div>,
  },
];
