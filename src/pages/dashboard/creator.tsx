import './creator.scss';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from './card';
import { Button, Spin } from 'antd';
import IPagination from '@/components/IPagination';
import { IconDraftBtn, IconQueueBtn, IconLaunchedBtn, IconEdit, IconAdd } from '@/components/icons';
import ClaimModal from './claim-modal';
import AirdropModal from './airdrop-modal';
import IncreaseModal from './increase-modal';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useMemo, useCallback, createContext } from 'react';
import { getCreator, deleteToken } from '@/api/dashboard';
import { CreatorStatus } from './type';
import { DashboardCreator } from '@/types';
import { getMeMemo } from '@/api/common';
import { DefaultMemooConfig, MemooConfig, useManageContract } from '@/hooks/useManageContract';
import { formatDecimals } from '@/utils';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'viem';
import { getIDOQueueDetail, getIDOLaunchedDetail } from '@/api/airdrop';
import { IDOQueueDetail, IDOLaunchedDetail, UnlockPeriod } from '@/types';
import { useAccount } from 'wagmi';

interface CreatorContext {
  memooConfig?: MemooConfig;
  defaultConfig?: DefaultMemooConfig;
  idoQueueDetail?: IDOQueueDetail;
  idoLaunchedDetail?: IDOLaunchedDetail;
  idoBuy?: (project: `0x${string}`, amount: BigNumber) => Promise<TransactionReceipt | undefined>;
  unlockMeme?: (project: `0x${string}`, index: number) => Promise<TransactionReceipt | undefined>;
  airdropClaim?: (
    project: `0x${string}`,
    claimCount: BigNumber,
    proof: string,
    signature: string,
  ) => Promise<TransactionReceipt | undefined>;
  _1stStage?: {
    unlockCount: BigNumber;
    unlockInfo: UnlockPeriod;
  };
  _2ndStage?: {
    unlockCount: BigNumber;
    unlockInfo: UnlockPeriod;
  };
  stage?: '1st' | '2nd';
  totalPurchased?: string;
  rate?: number;
}
export const CreatorContext = createContext<CreatorContext>({
  totalPurchased: '',
});

const pageSize = 11;
export const Creator = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [update, setUpdate] = useState(0);
  const [totalPurchased, setTotalPurchased] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<CreatorStatus>('');
  const [list, setList] = useState<DashboardCreator[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const iconRefs = useRef<any>({});
  const [idoQueueDetail, setIDOQueueDetail] = useState<IDOQueueDetail>();

  const [stage, setStage] = useState<'1st' | '2nd'>('1st');

  const [_1stStage, set1stStage] = useState<{
    unlockCount: BigNumber;
    unlockInfo: UnlockPeriod;
  }>();
  const [_2ndStage, set2ndStage] = useState<{
    unlockCount: BigNumber;
    unlockInfo: UnlockPeriod;
  }>();
  const { address } = useAccount();
  const {
    config: memooConfig,
    idoBuy,
    defaultConfig,
    airdropClaim,
    unlockMeme,
    getCanUnlockCount,
    memeUnlockPeriods,
  } = useManageContract();

  const firstProportion = useMemo(() => Number(memooConfig?.allocation.creator) / 10000, [memooConfig]);
  const purchased = useMemo(() => {
    if (!memooConfig || !defaultConfig) return 0;
    const totalPurchasedBN = new BigNumber(Number(totalPurchased));
    const idoPriceBN = new BigNumber(Number(defaultConfig?.idoPrice)).dividedBy(10 ** defaultConfig?.defaultDecimals);
    return parseFloat(formatDecimals(totalPurchasedBN.multipliedBy(idoPriceBN)));
  }, [memooConfig, defaultConfig, totalPurchased]);
  const maxProportion = useMemo(
    () => (Number(memooConfig?.idoCreatorBuyLimit) + Number(memooConfig?.allocation.creator)) / 10000,
    [memooConfig],
  );
  const firstIncrease = useMemo(() => {
    if (!memooConfig || !defaultConfig) return 0;
    const totalSupplyBN = new BigNumber(Number(defaultConfig?.totalSupply)).dividedBy(
      10 ** defaultConfig?.defaultDecimals,
    );
    const idoPriceBN = new BigNumber(Number(defaultConfig?.idoPrice)).dividedBy(10 ** defaultConfig?.defaultDecimals);
    const result = totalSupplyBN.multipliedBy(idoPriceBN).multipliedBy(firstProportion);
    return parseFloat(formatDecimals(result));
  }, [memooConfig, firstProportion, defaultConfig]);
  const maxIncrease = useMemo(
    () => parseFloat(formatDecimals(firstIncrease * (maxProportion / firstProportion))),
    [firstProportion, maxProportion, firstIncrease],
  );

  const context: CreatorContext = useMemo(
    () => ({
      idoQueueDetail,
      idoBuy,
      memooConfig,
      airdropClaim,
      _1stStage,
      _2ndStage,
      defaultConfig,
      totalPurchased,
      stage,
      unlockMeme,
    }),
    [idoQueueDetail, idoBuy, airdropClaim, unlockMeme, memooConfig, defaultConfig, totalPurchased, stage],
  );

  const getIDOAndPurchased = async (ticker: string) => {
    try {
      setLoading(true);
      const { data } = await getIDOQueueDetail(ticker, address ? address : 'default');
      setIDOQueueDetail(data);
      const { data: meme } = await getMeMemo(ticker);
      setTotalPurchased(meme[0].balance);
      setLoading(false);
      if (data.stageTwoClaim && address) {
        setStage('2nd');
      } else if (data.stageOneClaim && address) {
        setStage('1st');
      }
      if (!address) return;
      const [unlockCount, unlockInfo] = await Promise.all([
        getCanUnlockCount(data.contractAddress, address, 1) as Promise<BigNumber>,
        memeUnlockPeriods(1) as Promise<UnlockPeriod>,
      ]);
      console.log('2nd stage', unlockCount, unlockInfo);

      set2ndStage({ unlockCount, unlockInfo });
      const [unlockCount1, unlockInfo1] = await Promise.all([
        getCanUnlockCount(data.contractAddress, address, 0) as Promise<BigNumber>,
        memeUnlockPeriods(0) as Promise<UnlockPeriod>,
      ]);
      console.log('1st stage', unlockCount1, unlockInfo1);
      set1stStage({ unlockCount, unlockInfo });
      // if()
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await getCreator({
          pageNumber: currentPage,
          pageSize,
          status: tab,
        });
        setList(data.records ?? []);
        setTotal(data.total_record ?? 0);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [tab, currentPage, update]);

  const deleteDraft = async (id: string) => {
    try {
      setLoading(true);
      await deleteToken(id);
      setTimeout(() => setUpdate((count) => count + 1), 200);
      setLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const renderButton = (item: DashboardCreator, index: number) => {
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
          <IncreaseModal
            maxIncrease={maxIncrease}
            firstProportion={firstProportion}
            maxProportion={maxProportion}
            firstIncrease={firstIncrease}
            purchased={purchased}
          >
            <Button
              className="flex items-center justify-between creator-btn"
              onMouseOver={() => iconRefs.current[`increase${index}`].setHovered(true)}
              onMouseLeave={() => iconRefs.current[`increase${index}`].setHovered(false)}
              onClick={() => {
                getIDOAndPurchased(item.ticker);
              }}
            >
              <IconQueueBtn className="QueueBtn" ref={(ref) => (iconRefs.current[`increase${index}`] = ref)} />
              <span className="ml-[9px]">INCREASE</span>
            </Button>
          </IncreaseModal>
        );
        break;
      case 'IDO':
        button = (
          <IncreaseModal
            maxIncrease={maxIncrease}
            firstProportion={firstProportion}
            maxProportion={maxProportion}
            firstIncrease={firstIncrease}
            purchased={purchased}
          >
            <Button
              className="flex items-center justify-between creator-btn"
              onMouseOver={() => iconRefs.current[`increase${index}`].setHovered(true)}
              onMouseLeave={() => iconRefs.current[`increase${index}`].setHovered(false)}
              onClick={() => {
                getIDOAndPurchased(item.ticker);
              }}
            >
              <IconQueueBtn className="QueueBtn" ref={(ref) => (iconRefs.current[`increase${index}`] = ref)} />
              <span className="ml-[9px]">INCREASE</span>
            </Button>
          </IncreaseModal>
          // <IncreaseModal creator={item}>
          //   <Button
          //     className="flex items-center justify-between"
          //     onMouseOver={() => iconRefs.current['increase'].setHovered(true)}
          //     onMouseLeave={() => iconRefs.current['increase'].setHovered(false)}
          //   >
          //     <IconQueueBtn className="QueueBtn" ref={(ref) => (iconRefs.current['increase'] = ref)} />
          //     <span className="ml-[9px]">INCREASE</span>
          //   </Button>
          // </IncreaseModal>
        );
        break;
      case 'Launched':
        button = (
          <ClaimModal ticker={item.ticker}>
            {' '}
            <Button
              className="flex items-center justify-between creator-btn"
              key="increase"
              onMouseOver={() => iconRefs.current[`LaunchedBtn${index}`].setHovered(true)}
              onMouseLeave={() => iconRefs.current[`LaunchedBtn${index}`].setHovered(false)}
              disabled={!item.stageOneClaim}
              onClick={() => {
                getIDOAndPurchased(item.ticker);
              }}
            >
              <IconLaunchedBtn
                className="LaunchedBtn"
                color="#07E993"
                ref={(ref) => (iconRefs.current[`LaunchedBtn${index}`] = ref)}
              />
              <span className="ml-[9px]">CLAIM</span>
            </Button>
          </ClaimModal>
        );
        break;
      default:
        button = '';
        // button = (
        //   <AirdropModal creator={item}>
        //     {' '}
        //     <Button
        //       className="flex items-center justify-between"
        //       key="increase"
        //       onMouseOver={() => iconRefs.current['AirdropBtn'].setHovered(true)}
        //       onMouseLeave={() => iconRefs.current['AirdropBtn'].setHovered(false)}
        //     >
        //       <IconAirdropBtn
        //         className="IconAirdropBtn"
        //         color="#07E993"
        //         ref={(ref) => (iconRefs.current['AirdropBtn'] = ref)}
        //       />
        //       <span className="ml-[9px]">CLAIM AIRDROP</span>
        //     </Button>
        //   </AirdropModal>
        // );
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
            navigate('/create_token');
          }}
        >
          <IconAdd className="dashboard_item_create_add" />

          <p>Create Token</p>
        </div>
        <Spin spinning={loading} fullscreen />
        <CreatorContext.Provider value={context}>
          {list.map((item, index) => {
            return (
              <Card key={index} data={item}>
                <div className="flex justify-between items-center mt-[15px]">
                  <div>{renderButton(item, index)}</div>
                  <div
                    className={item.status === 'Draft' ? 'draft' : ''}
                    onClick={() => {
                      navigate(
                        item.status === 'Draft' || item.status === 'Waiting_for_pay'
                          ? `/create_token?ticker=${item.ticker}`
                          : `/airdrop/${item.ticker}`,
                      );
                    }}
                  >
                    <IconEdit
                      className="dashboard_item_create_edit"
                      color={item.status === 'Draft' ? '#7D83B5' : '#07E993'}
                      hoverColor={item.status === 'Draft' ? '#07E993' : '#000'}
                      bgColor={item.status === 'Draft' ? '#383C61' : '#242842'}
                      hoverBgColor={item.status === 'Draft' ? '#1F3B4F' : '#07E993'}
                      style={{ border: item.status === 'Draft' ? 'none' : '1px solid #07E993' }}
                      // onClick={navigate(`/airdrop/${item.ticker}`)}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </CreatorContext.Provider>
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
