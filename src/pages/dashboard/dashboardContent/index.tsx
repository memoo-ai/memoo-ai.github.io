import './index.scss';
import { Tabs as AntTabs } from 'antd';
import { useCallback, useState } from 'react';
import { Creator } from './Creator';
import { Degen } from './Degen';
import { Watchlist } from './Watchlist';
export const DashboardContent = () => {
  const [type, setType] = useState('All');
  const onChange = useCallback((e) => {
    setType(e);
    fetchData();
  }, []);
  const items = [
    {
      key: '1',
      label: 'Creator',
      children: <Creator />,
    },
    {
      key: '2',
      label: 'Degen',
      children: <Degen />,
    },
    {
      key: '3',
      label: 'Watchlist',
      children: <Watchlist />,
    },
  ];
  const fetchData = useCallback(() => {
    console.log(type);
  }, []);
  return (
    <div>
      <AntTabs onChange={onChange} type="card" items={items} />
    </div>
  );
};
