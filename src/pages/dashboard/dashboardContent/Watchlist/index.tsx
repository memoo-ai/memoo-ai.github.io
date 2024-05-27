import './index.scss';
import { Card } from '../Card';
import IPagination from '@/components/IPagination';
import { IconCollect } from '@/components/icons';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import GoLaunchPadACard from '../goLaunchpadCard';
export const WatchList = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const iconRefs = useRef<any>({});
  const data = [
    {
      imgUrl: './temp/1.png',
      name: 'Doge Killer',
      tip: 'Saved Draft',
      chain: 'LEASH',
      totalRaised: '1.35/2.3E',
      launchDate: '06 Apr 2024',
      meMooScore: '70/100',
      type: 'All',
    },
    {
      imgUrl: '',
      name: '',
      tip: '',
      chain: '',
      totalRaised: '',
      launchDate: '',
      meMooScore: '',
      type: 'Draft',
    },
    {
      imgUrl: './temp/1.png',
      name: 'Doge Killer',
      tip: 'Saved Draft',
      chain: 'LEASH',
      totalRaised: '1.35/2.3E',
      launchDate: '06 Apr 2024',
      meMooScore: '70/100',
      type: 'Queue',
    },
    {
      imgUrl: './temp/1.png',
      name: 'Doge Killer',
      tip: 'Saved Draft',
      chain: 'LEASH',
      totalRaised: '1.35/2.3E',
      launchDate: '06 Apr 2024',
      meMooScore: '70/100',
      type: 'IMO',
    },
    {
      imgUrl: './temp/1.png',
      name: 'Doge Killer',
      tip: 'Saved Draft',
      chain: 'LEASH',
      totalRaised: '1.35/2.3E',
      launchDate: '06 Apr 2024',
      meMooScore: '70/100',
      type: 'Launched',
    },
  ];

  return (
    <div className="dashboard_items">
      <div className="dashboard_top">
        <div />
        <div />
      </div>
      <div className="dashboard_items_items">
        <GoLaunchPadACard />
        {data.map((item, index) => {
          return (
            <Card key={index} data={item}>
              <div className="flex justify-between items-center mt-[15px]">
                <IconCollect />
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
