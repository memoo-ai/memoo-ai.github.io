import './launchpad-airdrop.scss';
import { useState, useEffect } from 'react';
import type { PaginationProps } from 'antd';
import Empty from '@/components/Empty';
import { Table } from 'antd';
import KingsCards from '@/components/KingsCards';
import IPagination from '@/components/IPagination';
import { columnsAirdrop, airdropSelectOptions } from './columns';
import { useNavigate } from 'react-router-dom';
import { getLaunchpadAirdrop, getAirdropCard } from '@/api/launchpad';
import { LaunchpadAirdrop, AirdropCard } from '@/types';
import ISelect from '@/components/ISelect';
const LaunchPadAirdrop = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('');
  const [orderBy, setOrderBy] = useState('desc');
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 30,
  });
  const [data, setData] = useState<LaunchpadAirdrop[]>([]);
  const [cardData, setCardData] = useState<AirdropCard[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    let params = {
      pageNumber: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
    };
    const { data } = await getLaunchpadAirdrop(params);
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
  }, [pagination.current, activeKey, orderBy]);

  useEffect(() => {
    (async () => {
      const { data } = await getAirdropCard();
      setCardData(data);
    })();
  }, []);

  return (
    <div className="w-[100%] launchpad-airdrop">
      <KingsCards btnText="AIRDROP" btnType="" data={cardData} />
      <div className="flex justify-between">
        <div />
        <ISelect
          options={airdropSelectOptions}
          onSelectChange={(key, orderBy) => {
            setActiveKey(key);
            setOrderBy(orderBy);
          }}
        />
      </div>
      <Table
        columns={columnsAirdrop(navigate)}
        dataSource={data as LaunchpadAirdrop[]}
        pagination={false}
        loading={loading}
        className="mb-[58px]"
        locale={{
          emptyText: <Empty />,
        }}
      />
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

export default LaunchPadAirdrop;
