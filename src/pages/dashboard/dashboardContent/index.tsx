import './index.scss';
import { Tabs as AntTabs } from 'antd';
import { useCallback, useState, FC } from 'react';
import { Creator } from './Creator';
import { Collector } from './Collector';
import { WatchList } from './Watchlist';
export const DashboardContent: FC<{ onChangeType: (type: string) => void }> = ({ onChangeType, ...rest }) => {
  const [type, setType] = useState('All');
  const onChange = useCallback((e: any) => {
    setType(e);
    onChangeType(e);
    // fetchData();
  }, []);
  const items = [
    {
      key: 'Creator',
      label: 'Creator',
      children: <Creator />,
    },
    {
      key: 'Collector',
      label: 'Collector',
      children: <Collector />,
    },
    {
      key: 'WatchList',
      label: 'WatchList',
      children: <WatchList />,
    },
  ];
  const fetchData = useCallback(() => {
    console.log(type);
  }, []);
  return (
    <div>
      <AntTabs onChange={onChange} items={items} />
    </div>
  );
};
