import './index.scss';
import CommonBanner from '@/components/Banner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { columns, IDO, IDOStatus } from './columns';
import SwipeCard from '@/components/SwipeCard';
import { Table } from 'antd';
import { ActiveIdoCard } from './card';
import type { GetProp, TableProps } from 'antd';
import IPagination from '@/components/IPagination';
import type { PaginationProps } from 'antd';

import { AirDrop } from './airDrop';
import { SectionListWithSeparator } from './sectionListWithSeparator';
type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
}
export type LuanchpadType = 'imo' | 'airdrop';
export default function LaunchPad() {
  const [tab, setTab] = useState<LuanchpadType>('imo');
  const [data, setData] = useState<IDO[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 30,
  });
  const [sorters, setSorters] = useState<any>([]);

  const fetchData = async () => {
    const list = new Array(20).fill(undefined).map((_, i) => ({
      id: 'dogwifhat',
      name: 'DogWifHat',
      symbol: 'WIF',
      logo: '',
      date: '04 Sep 2024',
      totalRaised: 2.3,
      status: IDOStatus.upcoming,
      target: 2,
      roi: 20.2,
    }));
    setData(list);
  };

  useEffect(() => {
    fetchData();
  }, [pagination, sorters]);

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setPagination(pagination);
    setSorters(sorter);
  };

  return (
    <div className="page pb-[70px]">
      <AirDrop />
      <div className="base-container">
        <div className="header-banner-bg">
          <div className="header-banner-content">
            <div className="header-banner-left flex  flex-col">
              <p className="left-text">
                <span> Memoo Launchpad.</span> <br />
                <span> Your Ticket to Memo Stardom.</span>
              </p>
              <p className="left-sub-text">Get in on the Action with the Hottest Meme Project Picks.</p>
            </div>
            <div>
              <img className="w-[363px] h-[392px]" src="./dashboard/img-banner-right.png" alt="" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between my-[70px]">
          <Tabs value={tab} onValueChange={(value) => setTab(value as LuanchpadType)}>
            <TabsList>
              <TabsTrigger value="imo" className="text-[38px]">
                Imo
              </TabsTrigger>
              <TabsTrigger value="airdrop" className="text-[38px]">
                Airdrop
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={loading}
          onChange={handleTableChange}
          className="mb-[58px]"
        />
        <IPagination
          currentPage={pagination.current ?? 0}
          total={pagination.total ?? 0}
          onChangePageNumber={(page) => {
            setPagination({ ...pagination, current: page });
          }}
        />
        <ActiveIdoCard />
        <CommonBanner
          title="Supercharge Your Meme Creation."
          desc="Create Your Very Own Meme Token Now."
          link="/"
          linkText="BE A CREATOR"
        />
      </div>
    </div>
  );
}
