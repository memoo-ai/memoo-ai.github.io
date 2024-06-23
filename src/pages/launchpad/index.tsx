import './index.scss';
import CommonBanner from '@/components/Banner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { columns, columnsAirdrop, IDOStatus } from './columns';
import SwipeCard from '@/components/SwipeCard';
import { Table } from 'antd';

import { ActiveIdoCard } from './card';
import type { GetProp, TableProps } from 'antd';
import IPagination from '@/components/IPagination';
import type { PaginationProps } from 'antd';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { AirDrop } from './airDrop';
import { SectionListWithSeparator } from './sectionListWithSeparator';
import { getLaunchpadAirdrop, getLaunchpadImo } from '@/api/launchpad';
import { useNavigate } from 'react-router-dom';
import { LaunchpadAirdrop, LaunchpadIMO } from '@/types';
import HeaderBannerBg from './assets/header-banner-bg.png';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
type LaunchpadData = LaunchpadIMO | LaunchpadAirdrop;
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
}
export type LaunchpadType = 'imo' | 'airdrop';
const pageSize = 10;
export default function LaunchPad() {
  const [tab, setTab] = useState<any>('imo');
  const [data, setData] = useState<LaunchpadIMO[] | LaunchpadAirdrop[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 30,
  });
  const [sorters, setSorters] = useState<any>([]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const type = query.get('type');
    if (type) {
      setTab(type);
    }
  }, [location.search]);

  const fetchData = async () => {
    let params = {
      pageNumber: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
    };
    const { data } = tab === 'imo' ? await getLaunchpadImo(params) : await getLaunchpadAirdrop(params);
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
    setSorters(sorter);
  };

  return (
    <div className="page">
      {/* <AirDrop /> */}
      <div className="base-container">
        <div
          className="header-banner-bg"
          style={{ background: `url(${HeaderBannerBg}) no-repeat`, backgroundSize: 'cover' }}
        >
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
          <Tabs
            value={tab}
            onValueChange={(value) => {
              setTab(value as LaunchpadType);
              setCurrentPage(1);
            }}
          >
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
        {tab === 'imo' ? (
          <Table
            columns={columns(navigate)}
            dataSource={data as LaunchpadIMO[]}
            pagination={false}
            loading={loading}
            onChange={handleTableChange}
            className="mb-[58px]"
          />
        ) : (
          <Table
            columns={columnsAirdrop(navigate)}
            dataSource={data as LaunchpadAirdrop[]}
            pagination={false}
            loading={loading}
            onChange={handleTableChange}
            className="mb-[58px]"
          />
        )}

        <IPagination
          currentPage={pagination.current ?? 0}
          total={pagination.total ?? 0}
          pageSize={pagination.pageSize}
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
