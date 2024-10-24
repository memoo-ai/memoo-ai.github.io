import './index.scss';
import CommonBanner from '@/components/Banner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SetStateAction, useCallback, useEffect, useState, useRef } from 'react';
import { columns, columnsOld, tokenSelectOptions } from './columns';
import IPagination from '@/components/IPagination';
import { useNavigate } from 'react-router-dom';
import { Table, Spin } from 'antd';
import type { GetProp, TableProps } from 'antd';
import type { PaginationProps } from 'antd';
import { getTrendingTokens, getTopTokens } from '@/api/gecko';
import { TrendingTokens } from '@/types';
import HeaderBannerBg from './assets/header-banner-bg.png';
import Empty from '@/components/Empty';
import ISelect from '@/components/ISelect';
import BannerRightBox from '@/components/BannerRightBox';
import BannerBox from '@/components/BannerBox';
import Swipe from '@/components/Swipe';
import LaunchpadAirdropBg from '@/assets/imgs/launchpad-airdrop-bg.png';
import memooGeckoIcon from '@/assets/imgs/memoogecko.png';
import createRankIcon from '@/assets/imgs/creatorrankcup .png';
import { IconHorn } from '@/components/icons';
import { useAccount } from '@/hooks/useWeb3';
import { isProd } from '@/utils';

export type GeckoType = 'trending' | 'top';
const Gecko = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('');
  const [orderBy, setOrderBy] = useState('desc');
  const [tab, setTab] = useState<GeckoType>('trending');
  const [data, setData] = useState<TrendingTokens[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 30,
  });
  const { address } = useAccount();
  const [refresh, setRefresh] = useState(0);
  const [reverseScroll, setReverseScroll] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let params = {
        pageNumber: pagination.current ?? 1,
        pageSize: pagination.pageSize ?? 10,
        sortField: activeKey,
        sortDirection: orderBy,
        address: address?.toBase58() ?? '',
      };
      const { data } = tab === 'trending' ? await getTrendingTokens(params) : await getTopTokens(params);
      // console.log(data);
      if (data) {
        setData(data.records ?? []);
        // setData([
        //   {
        //     icon: 'https://memoo-resource.s3.ap-southeast-2.amazonaws.com/test/26295ffe-612a-4147-8ece-437c31fcccbf.jpg',
        //     increase1H: 1,
        //     increase24H: 1,
        //     marketCap: 1,
        //     memooScore: 100,
        //     price: 1,
        //     ticker: '1',
        //     tokenName: 'string',
        //     volume24H: 1,
        //     totalScore: 1,
        //     created: '196d',
        //     liquidity: '6.5m',
        //     holders: '114k',

        //     vol1h: '235m',
        //   },
        //   {
        //     icon: 'https://memoo-resource.s3.ap-southeast-2.amazonaws.com/test/26295ffe-612a-4147-8ece-437c31fcccbf.jpg',
        //     increase1H: 1,
        //     increase24H: 1,
        //     marketCap: 1,
        //     memooScore: 100,
        //     price: 1,
        //     ticker: '1',
        //     tokenName: 'string',
        //     volume24H: 1,
        //     totalScore: 1,
        //     created: '196d',
        //     liquidity: '6.5m',
        //     holders: '114k',

        //     vol1h: '235m',
        //   },
        // ]);
        setPagination({
          ...pagination,
          total: data.total_record ?? 0,
        });
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [address, refresh, pagination]);
  const triggerRefresh = useCallback(async () => {
    await setRefresh((v) => v + 1);
    await fetchData();
  }, []);

  const handleWheel = (event: {
    currentTarget: { querySelector: (arg0: string) => any };
    preventDefault: () => void;
    deltaY: number;
  }) => {
    const tableBody = event.currentTarget.querySelector('.ant-table-body');
    if (tableBody) {
      event.preventDefault();
      const scrollDirection = reverseScroll ? -1 : 1;
      tableBody.scrollTop += event.deltaY * scrollDirection;
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current, activeKey, tab, orderBy]);

  const handleTableChange = (pagination: SetStateAction<PaginationProps>) => {
    setPagination(pagination);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!tableRef.current) return;

      e.preventDefault();

      const tableBody = tableRef.current.querySelector<HTMLDivElement>('.ant-table-body');
      if (tableBody) {
        tableBody.scrollTo({
          left: tableBody.scrollLeft + e.deltaY,
          behavior: 'smooth',
        });
      }
    };

    const tableContainer = tableRef.current;
    if (tableContainer) {
      const enableScroll = () => {
        tableContainer.addEventListener('wheel', handleWheel, { passive: false });
      };

      const disableScroll = () => {
        tableContainer.removeEventListener('wheel', handleWheel);
      };

      tableContainer.addEventListener('mouseenter', enableScroll);
      tableContainer.addEventListener('mouseleave', disableScroll);

      return () => {
        tableContainer.removeEventListener('mouseenter', enableScroll);
        tableContainer.removeEventListener('mouseleave', disableScroll);
        disableScroll();
      };
    }
  }, []);

  return (
    <div className="page">
      <Spin spinning={loading} fullscreen />
      {/* <div
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
      </div> */}
      {/* <Swipe direction="left" /> */}
      <div className="flex justify-center mt-[20px] gap-x-5">
        <div className="w-[835px] h-[469px]">
          <BannerBox background={LaunchpadAirdropBg} title="MEMOOGECKO">
            {/* {activeKey === 'imo' ? (
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
              </div> */}
            {/* ) : ( */}
            <div className=" flex items-start flex-col">
              <img className="w-[309px] h-[292px]" src={memooGeckoIcon} alt="" />
              <div className="ml-[52px]">
                <h3 className="font-Kitty mt-[13px] banner-title text-[40px]">Memoogecko. </h3>
                <h3 className="font-Kitty mt-[13px] banner-title text-[40px]">Your Ultimate Meme Archive.</h3>
                <p className="font-OCR text-[20px] text-[#FFFFFF]">Meme Mania Unleashed. Join the Madness!</p>
              </div>
            </div>
            {/* <div className=" flex items-start flex-col">
              <img className="w-[309px] h-[292px]" src={createRankIcon} alt="" />
              <div className="ml-[52px]">
                <h3 className="font-Kitty mt-[13px] banner-title text-[40px]">Creator RanKing. </h3>
                <h3 className="font-Kitty mt-[13px] banner-title text-[40px]">Earn Your Reputation.</h3>
                <p className="font-OCR text-[20px] text-[#FFFFFF]">Climb Ranks to Unlock Creator Rank Rewards.</p>
              </div>
            </div> */}
            {/* )} */}
          </BannerBox>
        </div>
        <div className="w-[406px] h-[470px]">
          <BannerRightBox title="POWERED ON">
            <div className="flex flex-col items-center w-[338px]">
              <div className="flex justify-center items-center w-[100%] mb-[11px]">
                <IconHorn className="mr-[7px]" />
                <span className="font-404px text-[16px] text-green">LIVE DEGEN ACTIVITY</span>
              </div>
              {/* <CarouselColumn /> */}
              <Swipe isScrolling={false} />
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
      <div className="flex items-center justify-between mt-[50px] mb-[30px]">
        <p className="font-404px text-green font-normal text-[38px]">Token Ranking</p>
        <Tabs value={tab} onValueChange={(value) => setTab(value as GeckoType)}>
          <TabsList>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="top">Top</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex justify-between">
        <div />
        <div className="flex  gap-x-[40px]">
          {isProd() ? (
            <div />
          ) : (
            <div className="flex items-center justify-center gap-x-[11px] scroll-more w-[231px] h-[46px]">
              <img className="w-[37px] h-[14.82px]" src="/gecko/scroll-more.png" alt="" />{' '}
              <span className="font-OCR text-[12px] leading-[20px] text-green">Scroll right for more</span>
            </div>
          )}
          <ISelect
            options={tokenSelectOptions}
            onSelectChange={(key, orderBy) => {
              setPagination({ ...pagination, current: 1 });
              setActiveKey(key);
              setOrderBy(orderBy);
            }}
          />
        </div>
      </div>
      <div
        className={data.length === 0 ? 'table-no-data' : ''}
        onMouseEnter={() => setReverseScroll(true)}
        onMouseLeave={() => setReverseScroll(false)}
        onWheel={handleWheel}
        // ref={tableRef}
      >
        <Table
          // className="common-table mb-10 hide-scrollbar"
          className="mb-10"
          // columns={isProd() ? columnsOld() : columns(triggerRefresh)}
          columns={columnsOld(triggerRefresh)}
          dataSource={data}
          pagination={false}
          // loading={loading}
          onChange={handleTableChange}
          onRow={(record) => {
            return {
              onClick: (event) => {
                navigate(`/airdrop/${record.ticker}`);
              },
            };
          }}
          // scroll={data.length !== 0 || isProd() ? { x: '100vw' } : {}}
          locale={{
            emptyText: <Empty showBorder={false} />,
          }}
        />
      </div>
      <IPagination
        currentPage={pagination.current ?? 0}
        total={pagination.total ?? 0}
        onChangePageNumber={(page) => {
          setPagination({ ...pagination, current: page });
        }}
      />
      <CommonBanner
        title={`Discover the Next Big Thing on \n MeMoo LaunchPad.`}
        desc="Get in on the Action with the Hottest Meme Project Picks."
        link="/"
        linkText="launchpad"
      />
    </div>
  );
};

export default Gecko;
