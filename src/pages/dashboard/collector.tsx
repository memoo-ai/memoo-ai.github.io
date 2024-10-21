import './collector.scss';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from './card';
import { Button, Spin } from 'antd';
import IPagination from '@/components/IPagination';
import {
  IconAwaiting,
  IconAirdropBtn,
  // IconAddress,
  // IconETH,
} from '@/components/icons';
import AirdropModal from './airdrop-modal';
import GoLaunchPadACard from './go-launchpad-card';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, createContext, useMemo } from 'react';
import { getCollectorAirdrop, getCollectorParticipated } from '@/api/dashboard';
import { CollectorType } from './type';
import {
  IDOLaunchedDetail,
  DashboardCollectorParticipated,
  DashboardCollectorAirdrop,
  SolanaMemeConfig,
} from '@/types';
import { getIDOQueueDetail, getIDOLaunchedDetail } from '@/api/airdrop';
// import { useAccount } from 'wagmi';
import { useAccount, MemeUserIdoData, MemooConfig } from '@/hooks/useWeb3';
import ClaimImoTokensModal from './claim-imo-tokens-modal';
import { PublicKey, RpcResponseAndContext, SignatureResult } from '@solana/web3.js';
import { getMemeConfigId } from '@/api/base';

interface CollectorContext {
  idoLaunchedDetail?: IDOLaunchedDetail;
  ticker?: string;
  solanaMemeConfig?: SolanaMemeConfig;
  airdropClaim?: (
    memeId: string,
    mintAPublicKey: string,
    msg: any,
    signature: any,
    signerPublicKey: PublicKey,
  ) => Promise<RpcResponseAndContext<SignatureResult> | undefined>;
  idoClaim?: (memeId: string, mintAPublicKey: string) => Promise<string | undefined>;
  memeUserData?: MemeUserIdoData;
  memooConfig?: MemooConfig;
}
export const CollectorContext = createContext<CollectorContext>({
  ticker: '',
});

const pageSize = 11;
export const Collector = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<CollectorType>('Airdrop');
  const [currentPage, setCurrentPage] = useState(1);
  const iconRefs = useRef<any>({});
  // const [list, setList] = useState<DashboardCollectorItem[]>([]);
  const [list, setList] = useState<DashboardCollectorParticipated[] | DashboardCollectorAirdrop[]>([]);
  const [idoLaunchedDetail, setIdoLaunchedDetail] = useState<IDOLaunchedDetail>();
  const { address, airdropClaim, idoClaim, getMemeUserData, memooConfig } = useAccount();
  const [memeUserData, setMemeUserData] = useState<MemeUserIdoData>();
  const [solanaMemeConfig, setSolanaMemeConfig] = useState<SolanaMemeConfig>();

  const context: CollectorContext = useMemo(
    () => ({
      idoLaunchedDetail,
      solanaMemeConfig,
      airdropClaim,
      idoClaim,
      memeUserData,
      memooConfig,
    }),
    [idoLaunchedDetail, solanaMemeConfig, airdropClaim, idoClaim, memeUserData, memooConfig],
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let params = {
          pageNumber: currentPage,
          pageSize,
        };
        const { data } = tab === 'Airdrop' ? await getCollectorAirdrop(params) : await getCollectorParticipated(params);
        setList(data.records ?? []);
        setTotal(data.total_record);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [tab, currentPage]);

  const getLaunchedDetail = async (ticker: string) => {
    try {
      setLoading(true);
      const { data } = await getIDOLaunchedDetail(ticker, address ?? 'default');
      setIdoLaunchedDetail(data);
      const { data: config } = await getMemeConfigId(ticker);
      setSolanaMemeConfig(config);
      const memeUser = await getMemeUserData(config?.memeConfigId);
      console.log('memeUser:', memeUser);
      const memeUserIdoClaimCount = Number(memeUser?.memeUserIdoClaimedCount);
      const memeUserIdoCount = Number(memeUser?.memeUserIdoCount);
      console.log('memeUserIdoClaimCount:', memeUserIdoClaimCount);
      console.log('memeUserIdoCount:', memeUserIdoCount);
      setMemeUserData(memeUser!);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
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
        <Spin spinning={loading} fullscreen />
        <CollectorContext.Provider value={context}>
          {list.map((item, index) => {
            return (
              <Card key={index} data={item} participated={tab === 'Participated'}>
                <div className="flex justify-between items-end mt-[15px]">
                  {tab === 'Airdrop' && (
                    // <div>
                    //   {item?.claimFlag === '0' && (
                    //     <div className="flex">
                    //       <IconAwaiting className="IconAwaiting" />{' '}
                    //       <span className="font-404px text-[#07E993] ml-[11px]">PENDING</span>
                    //     </div>
                    //     // <div className="flex">
                    //     //   <img src="/dashboard/claimed.png" alt="" />
                    //     //   <span className="font-404px text-[#07E993] ml-[11px]">Claimed</span>
                    //     // </div>
                    //   )}
                    //   {item?.claimFlag === '1' && (
                    //     <AirdropModal ticker={item.ticker}>
                    //       {' '}
                    //       <Button
                    //         className="flex items-center justify-between collector-btn"
                    //         key="increase"
                    //         onMouseOver={() => iconRefs.current[`AirdropBtn${index}`].setHovered(true)}
                    //         onMouseLeave={() => iconRefs.current[`AirdropBtn${index}`].setHovered(false)}
                    //         disabled={!item.claimFlag}
                    //         onClick={() => {
                    //           getLaunchedDetail(item.ticker);
                    //         }}
                    //       >
                    //         <IconAirdropBtn
                    //           className="IconAirdropBtn"
                    //           color="#07E993"
                    //           ref={(ref) => (iconRefs.current[`AirdropBtn${index}`] = ref)}
                    //         />
                    //         <span className="ml-[9px]">CLAIM AIRDROP</span>
                    //       </Button>
                    //     </AirdropModal>
                    //   )}
                    //   {item?.claimFlag === '2' && (
                    //     <div className="flex">
                    //       <img src="/dashboard/claimed.png" alt="" />
                    //       <span className="font-404px text-[#07E993] ml-[11px]">Claimed</span>
                    //     </div>
                    //   )}
                    // </div>
                    <div>
                      {item && 'claimFlag' in item && item?.claimFlag ? (
                        <AirdropModal ticker={item.ticker}>
                          {' '}
                          <Button
                            className="flex items-center justify-between collector-btn"
                            key="increase"
                            onMouseOver={() => iconRefs.current[`AirdropBtn${index}`].setHovered(true)}
                            onMouseLeave={() => iconRefs.current[`AirdropBtn${index}`].setHovered(false)}
                            disabled={!item.claimFlag}
                            onClick={() => {
                              getLaunchedDetail(item.ticker);
                            }}
                          >
                            <IconAirdropBtn
                              className="IconAirdropBtn"
                              color="#07E993"
                              ref={(ref) => (iconRefs.current[`AirdropBtn${index}`] = ref)}
                            />
                            <span className="ml-[9px]">CLAIM AIRDROP</span>
                          </Button>
                        </AirdropModal>
                      ) : (
                        <div className="flex">
                          <IconAwaiting className="IconAwaiting" />{' '}
                          <span className="font-404px text-[#07E993] ml-[11px]">PENDING</span>
                        </div>
                      )}
                    </div>
                  )}
                  {/* <ClaimImoTokensModal>
                    <div className="font-OCR text-[#7D83B5]">Contributed</div>
                  </ClaimImoTokensModal> */}
                  {item?.claimedFlag === '0' && (
                    <div className="flex">
                      <IconAwaiting className="IconAwaiting" />{' '}
                      <span className="font-404px text-[#07E993] ml-[11px]">PENDING</span>
                    </div>
                  )}
                  {item?.claimedFlag === '1' && (
                    <ClaimImoTokensModal ticker={item.ticker}>
                      {' '}
                      <Button
                        className="flex items-center justify-between collector-btn"
                        key="increase"
                        onMouseOver={() => iconRefs.current[`AirdropBtn${index}`].setHovered(true)}
                        onMouseLeave={() => iconRefs.current[`AirdropBtn${index}`].setHovered(false)}
                        onClick={() => {
                          getLaunchedDetail(item.ticker);
                        }}
                      >
                        <IconAirdropBtn
                          className="IconAirdropBtn"
                          color="#07E993"
                          ref={(ref) => (iconRefs.current[`AirdropBtn${index}`] = ref)}
                        />
                        <span className="ml-[9px]">CLAIM IMO TOKENS</span>
                      </Button>
                    </ClaimImoTokensModal>
                  )}
                  {item?.claimedFlag === '2' && (
                    <div className="flex">
                      <img src="/dashboard/claimed.png" alt="" />
                      <span className="font-404px text-[#07E993] ml-[11px]">Claimed</span>
                    </div>
                  )}
                  {/* {tab === 'Participated' && (
                    <div>
                      {item && 'participatedFlag' in item && item?.participatedFlag ? (
                        <ClaimImoTokensModal ticker={item.ticker}>
                          {' '}
                          <Button
                            className="flex items-center justify-between collector-btn"
                            key="increase"
                            onMouseOver={() => iconRefs.current[`AirdropBtn${index}`].setHovered(true)}
                            onMouseLeave={() => iconRefs.current[`AirdropBtn${index}`].setHovered(false)}
                            onClick={() => {
                              getLaunchedDetail(item.ticker);
                            }}
                          >
                            <IconAirdropBtn
                              className="IconAirdropBtn"
                              color="#07E993"
                              ref={(ref) => (iconRefs.current[`AirdropBtn${index}`] = ref)}
                            />
                            <span className="ml-[9px]">CLAIM IMO TOKENS</span>
                          </Button>
                        </ClaimImoTokensModal>
                      ) : (
                        <div className="flex">
                          <IconAwaiting className="IconAwaiting" />{' '}
                          <span className="font-404px text-[#07E993] ml-[11px]">PENDING</span>
                        </div>
                      )}
                    </div>
                  )} */}
                </div>
              </Card>
            );
          })}
        </CollectorContext.Provider>
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
