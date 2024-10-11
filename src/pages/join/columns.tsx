'use client';
import { SearchUserRanking } from '@/types';
import { formatAddress } from '@/utils';
import { IconJoin } from '@/components/icons';

export const columns = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
    width: 20,
    render: (_: any, __: any, index: number) => (
      <div className="flex items-center justify-center text-[#fff]">{index + 1}</div>
    ),
  },
  // {
  //   title: '',
  //   dataIndex: 'icon',
  //   key: 'icon',
  //   width: 20,
  //   render: (icon: string) => <img className="w-[30px] h-[30px] rounded-[50%]" src={record.icon} />,
  // },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 20,
    render: (address: string, record: SearchUserRanking) => (
      <div className="flex items-center justify-center gap-x-[15px]">
        <img className="w-[30px] h-[30px] rounded-[50%]" src={record.profileImage} />
        <span>{formatAddress(address ?? '')}</span>
      </div>
    ),
  },
  {
    title: 'Total Points',
    dataIndex: 'score',
    key: 'score',
    width: 20,
    render: (score: number | string) => (
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center gap-x-[7px] bg-[#2C1844] px-[10px] py-[11px] rounded-[50px] join-border w-[196px]">
          <IconJoin />
          <span className="text-[18px] text-[#B53BFF] leading-[20px] font-OCR">{Number(score).toLocaleString()}</span>
        </div>
      </div>
    ),
  },
];
