import './watchlist.scss';
import { Card } from './card';
import IPagination from '@/components/IPagination';
import { IconCollect } from '@/components/icons';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import GoLaunchPadACard from './go-launchpad-card';
import { getWatchList } from '@/api/dashboard';
import { DashboardWatchList } from '@/types';
import { Spin } from 'antd';
import { cancelCollect } from '@/api/dashboard';
export const WatchList = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [update, setUpdate] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState<DashboardWatchList[]>([]);
  const iconRefs = useRef<any>({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await getWatchList({
          pageNumber: currentPage,
          pageSize: 10,
        });
        setList(data.records ?? []);
        setTotal(data.total_record ?? 0);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage, update]);

  const cancelCollectTicker = async (ticker: string) => {
    await cancelCollect(ticker);
  };

  return (
    <div className="dashboard_items">
      <div className="dashboard_top">
        <div />
        <div />
      </div>
      <div className="dashboard_items_items">
        <GoLaunchPadACard />
        <Spin spinning={loading} fullscreen />
        {list.map((item, index) => {
          return (
            <Card key={index} data={item}>
              <div className="flex justify-between items-center mt-[15px]">
                <IconCollect
                  className="watchList_collect"
                  onClick={() => {
                    cancelCollectTicker(item.ticker);
                    setTimeout(() => setUpdate((count) => count + 1), 200);
                  }}
                />
              </div>
            </Card>
          );
        })}
      </div>
      <div className="mt-[60px]">
        <IPagination
          currentPage={currentPage}
          total={total}
          onChangePageNumber={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
      <div className="flex justify-center">
        <img className="w-[172.66px] has-[101.46px] mt-[53px]" src="./dashboard/dashboard_bottom_icon.png" alt="" />
      </div>
    </div>
  );
};
