import './index.scss';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '../Card';
import { Button } from 'antd';
import IPagination from '@/components/IPagination';
import {
  IconDraftBtn,
  IconQueueBtn,
  IconLaunchedBtn,
  IconEdit,
  IconAdd,
  IconAirdropBtn,
  // IconAddress,
  // IconETH,
} from '@/components/icons';
import { ClaimConfirm } from '../Confirms/ClaimConfirm';
import { AirdropConfirm } from '../Confirms/AirdropConfirm';
import { IncreaseConfirm } from '../Confirms/IncreaseConfirm';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
export const Creator = () => {
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
  const renderButton = (type: string) => {
    let button;
    switch (type) {
      case 'Draft':
        button = (
          <IconDraftBtn
            className="draft"
            color={type === 'Draft' ? '#7D83B5' : '#242842'}
            hoverColor={type === 'Draft' ? '#07E993' : '#242842'}
            bgColor={type === 'Draft' ? '#383C61' : '#242842'}
            hoverBgColor={type === 'Draft' ? '#1F3B4F' : '#242842'}
            style={{ border: type === 'Draft' ? 'none' : '1px solid #07E993' }}
          />
        );
        break;
      case 'Queue':
        button = (
          <IncreaseConfirm>
            <Button
              className="flex items-center justify-between"
              onMouseOver={() => iconRefs.current['increase'].setHovered(true)}
              onMouseLeave={() => iconRefs.current['increase'].setHovered(false)}
            >
              <IconQueueBtn className="QueueBtn" ref={(ref) => (iconRefs.current['increase'] = ref)} />
              <span className="ml-[9px]">INCREASE</span>
            </Button>
          </IncreaseConfirm>
        );
        break;
      case 'IMO':
        button = '';
        break;
      case 'Launched':
        button = (
          <ClaimConfirm>
            {' '}
            <Button
              className="flex items-center justify-between"
              key="increase"
              onMouseOver={() => iconRefs.current['LaunchedBtn'].setHovered(true)}
              onMouseLeave={() => iconRefs.current['LaunchedBtn'].setHovered(false)}
            >
              <IconLaunchedBtn
                className="LaunchedBtn"
                color="#07E993"
                ref={(ref) => (iconRefs.current['LaunchedBtn'] = ref)}
              />
              <span className="ml-[9px]">CLAIM</span>
            </Button>
          </ClaimConfirm>
        );
        break;
      default:
        button = (
          <AirdropConfirm>
            {' '}
            <Button
              className="flex items-center justify-between"
              key="increase"
              onMouseOver={() => iconRefs.current['AirdropBtn'].setHovered(true)}
              onMouseLeave={() => iconRefs.current['AirdropBtn'].setHovered(false)}
            >
              <IconAirdropBtn
                className="IconAirdropBtn"
                color="#07E993"
                ref={(ref) => (iconRefs.current['AirdropBtn'] = ref)}
              />
              <span className="ml-[9px]">CLAIM AIRDROP</span>
            </Button>
          </AirdropConfirm>
        );
        break;
    }

    return button;
  };
  return (
    <div className="dashboard_items">
      <div className="dashboard_top">
        {/* <div className="dashboard_top_left">
          <IconAddress className="address" />
          <span className="dashboard_top_left_text">0x4GDD...123e</span>
          <IconETH className="eth" />
          <span className="dashboard_top_left_text">8.2905 E</span>
        </div> */}
        <div />
        <div>
          <Tabs defaultValue="All">
            <TabsList>
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Draft">Draft</TabsTrigger>
              <TabsTrigger value="Queue">Queue</TabsTrigger>
              <TabsTrigger value="IMO">IMO</TabsTrigger>
              <TabsTrigger value="Launched">Launched</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="dashboard_items_items">
        <div
          className="dashboard_item_create"
          onClick={() => {
            navigate('/create');
          }}
        >
          <IconAdd className="dashboard_item_create_add" />

          <p>Create Token</p>
        </div>
        <div className="dashboard_item_create" onClick={() => navigate('/create')}>
          <div className="dashboard_item_create_item" onClick={() => navigate('/launchpad')}>
            <IconAdd className="dashboard_item_create_add" />

            <p>Hunt for Airdrops</p>
          </div>
          <div className="dashboard_item_create_item" onClick={() => navigate('/launchpad')}>
            <IconAdd className="dashboard_item_create_add" />

            <p>Participate in IMOs</p>
          </div>
        </div>

        {data.map((item, index) => {
          return (
            <Card key={index} data={item}>
              <div className="flex justify-between items-center mt-[15px]">
                <div>{renderButton(item.type)}</div>
                <div className={item.type === 'Draft' ? 'draft' : ''}>
                  <IconEdit
                    className="dashboard_item_create_edit"
                    color={item.type === 'Draft' ? '#7D83B5' : '#07E993'}
                    hoverColor={item.type === 'Draft' ? '#07E993' : '#000'}
                    bgColor={item.type === 'Draft' ? '#383C61' : '#242842'}
                    hoverBgColor={item.type === 'Draft' ? '#1F3B4F' : '#07E993'}
                    style={{ border: item.type === 'Draft' ? 'none' : '1px solid #07E993' }}
                  />
                </div>
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
