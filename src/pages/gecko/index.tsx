import './index.scss';
import CommonBanner from '@/components/Banner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { columns, rankingSelectOptions } from './columns';
import IPagination from '@/components/IPagination';
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import type { GetProp, TableProps } from 'antd';
import type { PaginationProps } from 'antd';
import { SorterResult } from 'antd/es/table/interface';
import { getTrendingTokens, getTopTokens } from '@/api/gecko';
import { TrendingTokens } from '@/types';
import HeaderBannerBg from './assets/header-banner-bg.png';
import Empty from '@/components/Empty';
import ISelect from '@/components/ISelect';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  sortField?: string;
  sortOrder?: string;
}

export type GeckoType = 'trending' | 'top';
const Gecko = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<GeckoType>('trending');
  const [data, setData] = useState<TrendingTokens[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 30,
  });

  const [sorters, setSorters] = useState<any>([]);
  const fetchData = async () => {
    let params = {
      pageNumber: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
    };
    const { data } = tab === 'trending' ? await getTrendingTokens(params) : await getTopTokens(params);
    // console.log(data);
    if (data) {
      setData(data.records ?? []);
      setPagination({
        ...pagination,
        total: data.total_record ?? 0,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current, sorters, tab]);

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setPagination(pagination);
    setSorters(sorter);
  };

  return (
    <div className="page">
      <div
        className="gecko-header-banner-bg"
        style={{ background: `url(${HeaderBannerBg}) no-repeat`, backgroundSize: 'cover' }}
      >
        <div className="header-banner-content">
          <div className="header-banner-left flex  flex-col">
            <img className="mb-[49px] w-[680px] h-[144px]" src="./gecko/img-left-desc.png" alt="" />
            <img className="w-[304px] h-[80px]" src="./gecko/img-left-gecko.png" alt="" />
          </div>
          <div>
            <img className="w-[420px] h-[355px]" src="./gecko/img-right-gecko.png" alt="" />
          </div>
        </div>
      </div>
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
        onRow={(record) => {
          return {
            onClick: (event) => {
              navigate(`/airdrop/${record.ticker}`);
            },
          };
        }}
        locale={{
          emptyText: <Empty showBorder={false} />,
        }}
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
