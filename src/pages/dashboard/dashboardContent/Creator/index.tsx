import './index.scss';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '../Card';
import { Button, Spin } from 'antd';
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
import { useRef, useState, useEffect } from 'react';
import { getCreator, deleteToken } from '@/api/dashboard';
import { CreatorStatus, CreatorList } from '../type';
import { DashboardCreator } from '@/types';

const pageSize = 11;
export const Creator = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<CreatorStatus>('');
  const [list, setList] = useState<DashboardCreator[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const iconRefs = useRef<any>({});

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await getCreator({
          pageNumber: currentPage,
          pageSize,
          status: tab,
        });
        setList(data.records);
        setTotal(data.total_record);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [tab, currentPage, update]);
  const deleteDraft = async (id: string) => {
    await deleteToken(id);
  };
  const renderButton = (item: CreatorList) => {
    let button;
    switch (item.status) {
      case 'Draft':
        button = (
          <IconDraftBtn
            className="draft"
            color={item.status === 'Draft' ? '#7D83B5' : '#242842'}
            hoverColor={item.status === 'Draft' ? '#07E993' : '#242842'}
            bgColor={item.status === 'Draft' ? '#383C61' : '#242842'}
            hoverBgColor={item.status === 'Draft' ? '#1F3B4F' : '#242842'}
            style={{ border: item.status === 'Draft' ? 'none' : '1px solid #07E993' }}
            onClick={() => {
              deleteDraft(item.ticker);
              setTimeout(() => setUpdate((count) => count + 1), 200);
            }}
          />
        );
        break;
      case 'QUEUE':
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
      case 'IDO':
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
            defaultValue=""
            onValueChange={(value) => {
              setTab(value as CreatorStatus);
              setCurrentPage(1);
              // setPagination({ ...pagination, current: 1 });
            }}
          >
            <TabsList>
              <TabsTrigger value="">ALL</TabsTrigger>
              <TabsTrigger value="Draft">Draft</TabsTrigger>
              <TabsTrigger value="QUEUE">Queue</TabsTrigger>
              <TabsTrigger value="IDO">IMO</TabsTrigger>
              <TabsTrigger value="Launched">LAUNCHED</TabsTrigger>
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
        <Spin spinning={loading} />
        {list.map((item, index) => {
          return (
            <Card key={index} data={item}>
              <div className="flex justify-between items-center mt-[15px]">
                <div>{renderButton(item)}</div>
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
          pageSize={pageSize}
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
