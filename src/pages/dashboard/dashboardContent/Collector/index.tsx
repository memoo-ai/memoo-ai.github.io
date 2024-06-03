import './index.scss';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '../Card';
import { Button } from 'antd';
import IPagination from '@/components/IPagination';
import {
  IconAwaiting,
  IconAirdropBtn,
  // IconAddress,
  // IconETH,
} from '@/components/icons';
import { AirdropConfirm } from '../Confirms/AirdropConfirm';
import GoLaunchPadACard from '../goLaunchpadCard';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { getCollectorAirdrop, getCollectorParticipated } from '@/api/dashboard';
import { CollectorType } from '../type';
import { DashboardCreator } from '@/types';

const pageSize = 11;
export const Collector = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [tab, setTab] = useState<CollectorType>('Airdrop');
  const [currentPage, setCurrentPage] = useState(1);
  const iconRefs = useRef<any>({});
  const [list, setList] = useState<DashboardCreator[]>([]);
  useEffect(() => {
    (async () => {
      try {
        let params = {
          pageNumber: currentPage,
          pageSize,
        };
        const { data } = tab === 'Airdrop' ? await getCollectorAirdrop(params) : await getCollectorParticipated(params);
        setList(data.records ?? []);
        setTotal(data.total_record);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [tab, currentPage]);

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
                {tab === 'Airdrop' ? (
                  <div>
                    {!item.claimFalg ? (
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
                    ) : (
                      <div className="flex">
                        <IconAwaiting className="IconAwaiting" />{' '}
                        <span className="font-404px text-[#07E993] ml-[11px]">AWAITING</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="font-OCR text-[#7D83B5]">Contributed</div>
                )}
                <div className="font-OCR text-[#ffffff]">{item.contributed ? item.contributed : ''}</div>
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
