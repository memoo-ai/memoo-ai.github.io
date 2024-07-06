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
import Carousel from '@/components/Carousel';
import CarouselColumn from '@/components/CarouselColumn';
import { SectionListWithSeparator } from './sectionListWithSeparator';
import { getLaunchpadAirdrop, getLaunchpadImo } from '@/api/launchpad';
import { useNavigate } from 'react-router-dom';
import { LaunchpadAirdrop, LaunchpadIMO } from '@/types';
import HeaderBannerBg from './assets/header-banner-bg.png';
import BannerRightBox from '@/components/BannerRightBox';
import BannerBox from '@/components/BannerBox';
import GeckoBannerBg from '@/assets/imgs/gecko-banner-bg.png';
import MemooGeckoIcon from '@/assets/imgs/memoogecko.png';
import AirdropsIcon from '@/assets/imgs/airdrops.png';
import CreateTokensIcon from '@/assets/imgs/create-token.png';
import LaunchpadIcon from '@/assets/imgs/launchpad.png';
import { IconHorn } from '@/components/icons';
import KingsCards from '@/components/KingsCards';
import ISelect from '@/components/ISelect';
import Empty from '@/components/Empty';

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
  const banners = [
    {
      icon: MemooGeckoIcon,
      text: 'Memoogecko',
    },
    {
      icon: AirdropsIcon,
      text: 'Airdrops',
    },
    {
      icon: CreateTokensIcon,
      text: 'Create Tokens',
    },
    {
      icon: LaunchpadIcon,
      text: 'Launchpad',
    },
  ];
  const generateRandomTokenName = () => {
    const tokenNames = ['BTC', 'ETH', 'XRP', 'LTC', 'ADA'];
    return tokenNames[Math.floor(Math.random() * tokenNames.length)];
  };

  const list = new Array(5).fill(undefined).map((_, i) => ({
    id: i,
    address: 'Rg7GG...kf9Lj7' + i,
    tokenName: generateRandomTokenName(),
    ticker: 'Tick',
  }));

  const options = [
    {
      value: '1',
      label: 'Not Identified',
    },
    {
      value: '2',
      label: 'Closed',
    },
    {
      value: '3',
      label: 'Communicated',
    },
    {
      value: '4',
      label: 'Identified',
    },
    {
      value: '5',
      label: 'Resolved',
    },
    {
      value: '6',
      label: 'Cancelled',
    },
  ];

  return (
    <div className="page">
      <div className="base-container">
        <Carousel />
        <div className="flex justify-between mt-[21px]">
          <div className="w-[835px] h-[469px]">
            <BannerBox background={GeckoBannerBg} title="MEMOOGECKO">
              <div className="pt-[60px] flex items-center flex-col">
                <img className="w-[159px] h-[159px]" src="/logo.svg" alt="" />
                <h3 className="font-Kitty mt-[13px] banner-title text-[40px]">Welcome to Memoo.</h3>
                <h3 className="font-Kitty mt-[13px] banner-title text-[40px]">Trade, Hunt, Create, Launch.</h3>
                <div className="flex items-center justify-center gap-[41px]">
                  {banners.map((banner) => {
                    return (
                      <div className="flex flex-col font-404px items-center justify-center" key={banner.text}>
                        <img className="w-[106px] h-[100px]" src={banner.icon} alt="" />
                        <p className="text-[16px] text-[#fff] font-OCR">{banner.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </BannerBox>
          </div>
          <div className="w-[406px] h-[470px]">
            <BannerRightBox title="POWERED ON">
              <div className="flex flex-col items-center w-[338px]">
                <div className="flex justify-center items-center w-[100%] mb-[11px]">
                  <IconHorn className="mr-[7px]" />
                  <span className="font-404px text-[16px] text-green">LIVE DEGEN ACTIVITY</span>
                </div>
                <CarouselColumn />
                {/* {list.map((item) => {
                  return (
                    <div
                      className="w-[100%] bg-[#2B526E] rounded-sm mb-[2px] px-[9px] py-[6px] flex items-center  cursor-pointer"
                      key={item.id}
                      onClick={() => navigate(`/airdrop/${item.ticker}`)}
                    >
                      <img className="w-[30px]" src="./temp/1.png" alt="" />{' '}
                      <span className="font-404px ml-[5px] text-[#fff] text-[12px]" style={{ color: getRandomColor() }}>
                        {item.address}
                      </span>
                    </div>
                  );
                })} */}
              </div>
            </BannerRightBox>
          </div>
        </div>
        {/* <div
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
        </div> */}

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
        <KingsCards />
        {/* <div className="flex justify-between">
          <ISelect options={options} />
        </div> */}
        {tab === 'imo' ? (
          <Table
            columns={columns(navigate)}
            dataSource={data as LaunchpadIMO[]}
            pagination={false}
            loading={loading}
            onChange={handleTableChange}
            className="mb-[58px]"
            locale={{
              emptyText: <Empty />,
            }}
          />
        ) : (
          <Table
            columns={columnsAirdrop(navigate)}
            dataSource={data as LaunchpadAirdrop[]}
            pagination={false}
            loading={loading}
            onChange={handleTableChange}
            className="mb-[58px]"
            locale={{
              emptyText: <Empty />,
            }}
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
          link="/create_token"
          linkText="BE A CREATOR"
        />
      </div>
    </div>
  );
}
