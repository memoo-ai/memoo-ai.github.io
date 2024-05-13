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
  IconAddress,
  IconETH,
} from '@/components/icons';
import { ClaimConfirm } from './ClaimConfirm';
import { IncreaseConfirm } from './IncreaseConfirm';
import { useNavigate } from 'react-router-dom';
export const Creator = () => {
  const navigate = useNavigate();
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
      type: 'IDO',
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
            className="DraftBtn draft_hover"
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
            <Button className="flex items-center justify-between">
              <IconQueueBtn className="QueueBtn" />
              <span className="ml-[9px]">INCREASE</span>
            </Button>
          </IncreaseConfirm>
        );
        break;
      case 'IDO':
        button = '';
        break;
      case 'Launched':
        button = (
          <ClaimConfirm>
            {' '}
            <Button className="flex items-center justify-between">
              <IconLaunchedBtn className="LaunchedBtn" />
              <span className="ml-[9px]">CLAIM</span>
            </Button>
          </ClaimConfirm>
        );
        break;
      default:
        button = '';
        break;
    }

    return button;
  };
  return (
    <div className="dashboard_items">
      <div className="dashboard_top">
        <div className="dashboard_top_left">
          <IconAddress className="address" />
          <span className="dashboard_top_left_text">0x4GDD...123e</span>
          <IconETH className="eth" />
          <span className="dashboard_top_left_text">8.2905 E</span>
        </div>
        <div>
          <Tabs defaultValue="All">
            <TabsList>
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Draft">Draft</TabsTrigger>
              <TabsTrigger value="Queue">Queue</TabsTrigger>
              <TabsTrigger value="IDO">IDO</TabsTrigger>
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

        {data.map((item, index) => {
          return (
            <Card key={index} data={item}>
              <div className="flex justify-between items-center mt-[15px]">
                <div>{renderButton(item.type)}</div>
                <IconEdit
                  className="dashboard_item_create_edit"
                  color={item.type === 'Draft' ? '#7D83B5' : '#07E993'}
                  hoverColor={item.type === 'Draft' ? '#07E993' : '#000'}
                  bgColor={item.type === 'Draft' ? '#383C61' : '#242842'}
                  hoverBgColor={item.type === 'Draft' ? '#1F3B4F' : '#000'}
                  style={{ border: item.type === 'Draft' ? 'none' : '1px solid #07E993' }}
                />
              </div>
            </Card>
          );
        })}
      </div>
      <IPagination />
    </div>
  );
};
