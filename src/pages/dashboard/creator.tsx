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
import { useManageContract } from '@/hooks/useManageContract';
import { formatDecimals, formatRestTime } from '@/utils';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'viem';
import { getIDOQueueDetail, getUnlockTimestamp } from '@/api/airdrop';
import { IDOQueueDetail, IDOLaunchedDetail, UnlockPeriod, SolanaMemeConfig } from '@/types';
// import { useAccount } from 'wagmi';
import { useAccount, MemooConfig, MemeUserIdoData } from '@/hooks/useWeb3';
import { useProportion } from '@/hooks/useProportion';
import { getMemeConfigId } from '@/api/base';
import { BN } from '@coral-xyz/anchor';
import { PublicKey, RpcResponseAndContext, SignatureResult } from '@solana/web3.js';

interface CreatorContext {
  memooConfig?: MemooConfig;
  // defaultConfig?: DefaultMemooConfig;
  idoQueueDetail?: IDOQueueDetail;
  idoLaunchedDetail?: IDOLaunchedDetail;
  idoBuy?: (memeId: string, amount: BigNumber, isCreate: boolean, proportion: number) => Promise<string | undefined>;
  // idoBuy?: (project: `0x${string}`, amount: BigNumber) => Promise<TransactionReceipt | undefined>;
  // unlockMeme?: (project: `0x${string}`, index: number) => Promise<TransactionReceipt | undefined>;
  airdropClaim?: (
    memeId: string,
    mintAPublicKey: string,
    msg: any,
    signature: any,
    signerPublicKey: PublicKey,
  ) => Promise<RpcResponseAndContext<SignatureResult> | undefined>;
  stage?: '1st' | '2nd';
  totalPurchased?: string;
  rate?: number;
  memeUserData?: MemeUserIdoData;
  creatorClaim?: (memeId: string, mintAPublicKey: string) => Promise<string | undefined>;
  idoClaim?: (memeId: string, mintAPublicKey: string) => Promise<string | undefined>;
  // mintAPublickey?: PublicKey;
  solanaMemeConfig?: SolanaMemeConfig;
  unlockTimestamp?: number;
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
  const [memeConfigId, setMemeConfigId] = useState();
  const [idoQueueDetail, setIDOQueueDetail] = useState<IDOQueueDetail>();
  const [solanaMemeConfig, setSolanaMemeConfig] = useState<SolanaMemeConfig>();
  const [memeUserData, setMemeUserData] = useState<MemeUserIdoData>();
  const [stage, setStage] = useState<'1st' | '2nd'>('1st');
  const [unlockTimestamp, setUnlockTimestamp] = useState();

  const { address, memooConfig, idoBuy, getMemeUserData, airdropClaim, creatorClaim, idoClaim } = useAccount();

  const { firstProportion, maxProportion, firstIncrease, maxIncrease, platformCreateMeme } = useProportion();

  // const firstProportion = useMemo(() => Number(memooConfig?.allocation.creator) / 10000, [memooConfig]);
  const purchased = useMemo(() => {
    if (!memooConfig || !memeUserData || !platformCreateMeme) return 0;

    const creatorLockCountBN = new BigNumber(Number(memeUserData?.creatorLockCount)).dividedBy(10 ** 9);
    const memeUserIdoCountBN = new BigNumber(Number(memeUserData?.memeUserIdoCount)).dividedBy(10 ** 9);
    const idoPriceBN = new BigNumber(Number(memooConfig?.idoPrice)).dividedBy(10 ** 9);
    const totalCountBN = creatorLockCountBN.plus(memeUserIdoCountBN);
    const totalPurchasedBN = totalCountBN.multipliedBy(idoPriceBN);
    const formattedResult = parseFloat(formatDecimals(totalPurchasedBN));
    const result = platformCreateMeme + formattedResult;
    console.log('purchased: ', parseFloat(formatDecimals(result)));
    return parseFloat(formatDecimals(result));
  }, [memooConfig, memeUserData, platformCreateMeme]);

  const context: CreatorContext = useMemo(
    () => ({
      idoQueueDetail,
      idoBuy,
      memooConfig,
      airdropClaim,
      totalPurchased,
      stage,
      solanaMemeConfig,
      creatorClaim,
      idoClaim,
      unlockTimestamp,
      memeUserData,
    }),
    [
      idoQueueDetail,
      idoBuy,
      airdropClaim,
      memooConfig,
      totalPurchased,
      stage,
      solanaMemeConfig,
      creatorClaim,
      idoClaim,
      unlockTimestamp,
      memeUserData,
    ],
  );

  const getIDOAndPurchased = async (ticker: string) => {
    try {
      setLoading(true);
      const { data } = await getIDOQueueDetail(ticker, address ?? 'default');
      setIDOQueueDetail(data);
      const { data: config } = await getMemeConfigId(ticker);
      setSolanaMemeConfig(config);
      const memeUser = await getMemeUserData(config?.memeConfigId);
      console.log('memeUser:', memeUser);
      setMemeUserData(memeUser!);
      // const { data: meme } = await getMeMemo(ticker);
      // setTotalPurchased(meme[0].balance ?? 0);
      const { data: time } = await getUnlockTimestamp(ticker);
      setUnlockTimestamp(time);
      setLoading(false);
      if (data.stageTwoClaim && address) {
        setStage('2nd');
      } else if (data.stageOneClaim && address) {
        setStage('1st');
      }
      if (!address) return;
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
      case 'Waiting_for_pay':
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
              disabled
            >
              <IconQueueBtn className="QueueBtn" ref={(ref) => (iconRefs.current[`increase${index}`] = ref)} />
              <span className="ml-[9px]">INCREASE</span>
            </Button>
          </IncreaseModal>
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
