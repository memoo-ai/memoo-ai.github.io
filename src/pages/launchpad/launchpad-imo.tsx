import './launchpad-imo.scss';
import { useState, useEffect } from 'react';
import type { PaginationProps } from 'antd';
import Empty from '@/components/Empty';
import { Table } from 'antd';
import KingsCards from '@/components/KingsCards';
import IPagination from '@/components/IPagination';
import { columns, imoSelectOptions } from './columns';
import { useNavigate } from 'react-router-dom';
import { getLaunchpadImo, getImoPvCard } from '@/api/launchpad';
import { LaunchpadIMO, ImoPvCard } from '@/types';
import ISelect from '@/components/ISelect';

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

  const fetchData = async () => {
    let params = {
      pageNumber: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      sortField: activeKey,
      sortDirection: orderBy,
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
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current, activeKey, orderBy]);

  useEffect(() => {
    (async () => {
      const { data } = await getImoPvCard();
      setCardData(data);
    })();
  }, []);

  return (
    <div className="launchpad-imo">
      <KingsCards btnText="PARTICIPATE" btnType="reverse" data={cardData} />
      <div className="flex justify-between items-end">
        {/* <div /> */}
        <div className="flex items-center my-[42px]">
          <span className="font-404px text-green text-[24px] mr-[20px]">DISCOVER IMO</span>
          <img className="w-[105px] h-[96px]" src="/public/launchPad/table-logo.png" alt="" />
        </div>
        <ISelect
          options={imoSelectOptions}
          onSelectChange={(key, orderBy) => {
            setActiveKey(key);
            setOrderBy(orderBy);
          }}
        />
      </div>
      <div className={data.length === 0 ? 'table-no-data' : ''}>
        <Table
          columns={columns(navigate)}
          dataSource={data as LaunchpadIMO[]}
          pagination={false}
          loading={loading}
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
