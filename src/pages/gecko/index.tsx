import './index.scss';
import CommonBanner from '@/components/Banner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { columns } from './columns';
import IPagination from '@/components/IPagination';
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import type { GetProp, TableProps } from 'antd';
import type { PaginationProps } from 'antd';
import { SorterResult } from 'antd/es/table/interface';
import { getTrendingTokens, getTopTokens } from '@/api/gecko';
import { TrendingTokens } from '@/types';
import HeaderBannerBg from './assets/header-banner-bg.png';
import BannerBox from '@/components/BannerBox';
import GeckoBannerBg from '@/assets/imgs/gecko-banner-bg.png';
import MemooGeckoIcon from '@/assets/imgs/memoogecko.png';
import AirdropsIcon from '@/assets/imgs/airdrops.png';
import CreateTokensIcon from '@/assets/imgs/create-token.png';
import LaunchpadIcon from '@/assets/imgs/launchpad.png';
import BannerRightBox from '@/components/BannerRightBox';
import { IconHorn } from '@/components/icons';
type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  sortField?: string;
  sortOrder?: string;
}

export type GeckoType = 'trending' | 'top';

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
              <div className="flex justify-center items-center w-[100%]">
                <IconHorn className="mr-[7px]" />
                <span className="font-404px text-[16px] text-green">LIVE DEGEN ACTIVITY</span>
              </div>
            </div>
          </BannerRightBox>
        </div>
      </div>

      <div className="flex items-center justify-between mt-[70px]">
        <p className="font-404px text-green font-normal text-[38px]">Token Ranking</p>
      </div>
      <div className="flex items-center justify-between mb-[70px]">
        <div />
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
