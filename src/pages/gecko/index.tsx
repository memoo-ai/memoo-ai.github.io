import './index.scss';
import CommonBanner from '@/components/Banner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { columns, Token } from './columns';
import IPagination from '@/components/IPagination';

import { Table } from 'antd';
import type { GetProp, TableProps } from 'antd';
import type { PaginationProps } from 'antd';
import { SorterResult } from 'antd/es/table/interface';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  sortField?: string;
  sortOrder?: string;
}

export type GeckoType = 'trending' | 'top';
const Gecko = () => {
  const [tab, setTab] = useState<GeckoType>('trending');
  const [data, setData] = useState<Token[]>([]);
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
      price: 0.778,
      priceChangeHourly: 3400,
      priceChangeDaily: 100,
      volumeDaily: 10000000,
      marketCap: 24000000,
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
      <div className="header-banner-bg" />
      <div className="flex items-center justify-between my-[70px]">
        <p className="font-404px text-green font-normal text-[38px]">Token Ranking</p>
        <Tabs value={tab} onValueChange={(value) => setTab(value as GeckoType)}>
          <TabsList>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="top">Top</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Table
        className="common-table mb-10"
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
        onChange={handleTableChange}
      />
      <IPagination
        currentPage={pagination.current ?? 0}
        total={pagination.total ?? 0}
        onChangePageNumber={(page) => {
          setPagination({ ...pagination, current: page });
        }}
      />
      <CommonBanner
        title="Discover the Next Big Thing on MeMoo LaunchPad."
        desc="Get in on the Action with the Hottest Meme Project Picks."
        link="/"
        linkText="launchpad"
      />
    </div>
  );
};

export default Gecko;
