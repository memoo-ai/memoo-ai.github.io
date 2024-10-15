import './launchpad-imo.scss';
import { useState, useEffect, useCallback } from 'react';
import type { PaginationProps } from 'antd';
import Empty from '@/components/Empty';
import { Table, Spin } from 'antd';
import KingsCards from '@/components/KingsCards';
import IPagination from '@/components/IPagination';
import { columns, imoSelectOptions } from './columns';
import { useNavigate } from 'react-router-dom';
import { getLaunchpadImo, getImoPvCard } from '@/api/launchpad';
import { LaunchpadIMO, ImoPvCard } from '@/types';
import ISelect from '@/components/ISelect';
import { useAccount } from '@/hooks/useWeb3';

const LaunchPadImo = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('');
  const [orderBy, setOrderBy] = useState('desc');
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 30,
  });
  const [data, setData] = useState<LaunchpadIMO[]>([]);
  const [cardData, setCardData] = useState<ImoPvCard[]>([]);
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const [refresh, setRefresh] = useState(0);

  const triggerRefresh = useCallback(async () => {
    await setRefresh((v) => v + 1);
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

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
      const { data } = await getLaunchpadImo(params);
      // console.log(data);
      if (data) {
        setData(data.records ?? []);
        // setData([]);
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
  }, [address, refresh]);

  useEffect(() => {
    fetchData();
  }, [pagination.current, activeKey, orderBy]);

  useEffect(() => {
    (async () => {
      const { data } = await getImoPvCard(address?.toBase58() ?? '');
      setCardData(data);
    })();
  }, [address, refresh]);

  return (
    <div className="launchpad-imo">
      <Spin spinning={loading} fullscreen />
      <KingsCards btnText="PARTICIPATE" btnType="reverse" data={cardData} type="IMO" triggerRefresh={triggerRefresh} />
      <div className="flex justify-between items-end">
        {/* <div /> */}
        <div className="flex items-center my-[42px]">
          <span className="font-404px text-green text-[24px] mr-[20px]">DISCOVER IMO</span>
          <img className="w-[105px] h-[96px]" src="/launchPad/table-logo.png" alt="" />
        </div>
        <ISelect
          options={imoSelectOptions}
          onSelectChange={(key, orderBy) => {
            setPagination({ ...pagination, current: 1 });
            setActiveKey(key);
            setOrderBy(orderBy);
          }}
        />
      </div>
      <div className={data.length === 0 ? 'table-no-data' : ''}>
        <Table
          columns={columns(navigate, triggerRefresh)}
          dataSource={data as LaunchpadIMO[]}
          pagination={false}
          // loading={loading}
          className="mb-[58px]"
          locale={{
            emptyText: <Empty showBorder={false} />,
          }}
        />
      </div>
      <IPagination
        currentPage={pagination.current ?? 0}
        total={pagination.total ?? 0}
        pageSize={pagination.pageSize}
        onChangePageNumber={(page) => {
          setPagination({ ...pagination, current: page });
        }}
      />
    </div>
  );
};

export default LaunchPadImo;
