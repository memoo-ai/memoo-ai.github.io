import './index.scss';
import CommonBanner from '@/components/Banner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { columns, Token } from './columns';

import { Table } from 'antd';
import type { GetProp, TableProps } from 'antd';
type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
}
export default () => {
  const [data, setData] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 30,
    },
  });

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
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <div className="page pb-[70px]">
      <CommonBanner title="Welcom to MemeGecko. Hunt, Trade, Win." desc="Meme Mania Unleashed. Join the Madness!" />
      <div className="flex items-center justify-between my-[70px]">
        <p className="text-Montserrat font-bold text-[24px]">Token Listing</p>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
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
