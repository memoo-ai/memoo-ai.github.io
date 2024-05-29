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
import GoLaunchPadACard from '../goLaunchpadCard';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { getCollectorAirdrop, getCollectorParticipated } from '@/api/dashboard';
import { CollectorType, CreatorList } from '../type';
export const Collector = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(50);
  const [tab, setTab] = useState<CollectorType>('Airdrop');
  const [currentPage, setCurrentPage] = useState(1);
  const iconRefs = useRef<any>({});
  const [list, setList] = useState<CreatorList[]>([]);
  useEffect(() => {
    (async () => {
      try {
        let params = {
          pageNumber: currentPage,
          pageSize: 10,
        };
        const { data } = tab === 'Airdrop' ? await getCollectorAirdrop(params) : await getCollectorParticipated(params);
        setList(data.records);
        setTotal(data.total_record);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [tab, currentPage]);
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
          <Tabs
            defaultValue="Airdrop"
            onValueChange={(value) => {
              setTab(value as CollectorType);
              // setPagination({ ...pagination, current: 1 });
            }}
          >
            <TabsList>
              <TabsTrigger value="Airdrop">Airdrop</TabsTrigger>
              <TabsTrigger value="Participated">Participated</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="dashboard_items_items">
        <GoLaunchPadACard />

        {list.map((item, index) => {
          return (
            <Card key={index} data={item}>
              <div className="flex justify-between items-center mt-[15px]">
                <div>{renderButton(item.status)}</div>
                <div className={item.status === 'Draft' ? 'draft' : ''}>
                  <IconEdit
                    className="dashboard_item_create_edit"
                    color={item.status === 'Draft' ? '#7D83B5' : '#07E993'}
                    hoverColor={item.status === 'Draft' ? '#07E993' : '#000'}
                    bgColor={item.status === 'Draft' ? '#383C61' : '#242842'}
                    hoverBgColor={item.status === 'Draft' ? '#1F3B4F' : '#07E993'}
                    style={{ border: item.status === 'Draft' ? 'none' : '1px solid #07E993' }}
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
