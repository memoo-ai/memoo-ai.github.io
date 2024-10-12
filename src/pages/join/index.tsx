import { useRef, useState, useEffect } from 'react';
import { IconCopy, IconSearch, IconTwitter, IconJoin, IconClose } from '@/components/icons';
import './index.scss';
import { Input, Button, Table, Spin } from 'antd';
import type { PaginationProps } from 'antd';
import { useCallback } from 'react';
import { handleCopy, popupSharing } from '@/utils';
import IPagination from '@/components/IPagination';
import Empty from '@/components/Empty';
import { columns } from './columns';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAccount } from '@/hooks/useWeb3';
import message from '@/components/IMessage';
import EnterReferralCodeModal from './enter-referral-code-modal';
import ResultModal, { ResultRef } from './result-modal';
import { InvitationList, SearchUserRanking } from '@/types';
import { formatAddress, isEven } from '@/utils';
import CurrentTotalPointsModal from './current-total-points-modal';
import { searchUserRanking, getInvitationCode, getInvitation, getUserRankingList, getInvitationTop } from '@/api/join';
const Join = () => {
  const [keyword, setKeyword] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [refInvitationCode, setRefInvitationCode] = useState('12');
  const [loading, setLoading] = useState(false);
  const [invitedAddress, setInvitedAddress] = useState('');
  const iconRefs = useRef<any>({});
  const [refresh, setRefresh] = useState(0);
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 20,
    total: 1,
  });
  const { address, useAddress } = useAccount();
  const resultRef = useRef<ResultRef>(null);
  const [data, setData] = useState<SearchUserRanking[]>([]);
  const [invitationList, setInvitationList] = useState<InvitationList[]>([]);
  const [searchList, setSearchList] = useState<SearchUserRanking[]>([]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await getUserRankingList({
          pageNumber: pagination.current ?? 1,
          pageSize: pagination.pageSize ?? 20,
        });

        setData(data?.records ?? []);
        setPagination(data?.total ?? 0);

        const { data: result } = await getInvitationTop(address?.toBase58() ?? '');
        setInvitationList(result);
        setLoading(false);
        const { data: invitation } = await getInvitation();
        setInvitedAddress(invitation ?? '');
      } catch (e) {
        console.log('getInvitationTop:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [address, refresh]);

  useEffect(() => {
    const ticker = searchParams.get('ref');
    setRefInvitationCode(ticker ?? '');
  }, [searchParams]);
  const generateCode = useCallback(async () => {
    const result = await useAddress('!mt-[130px]');
    // TODO
    if (result) {
      const { data } = await getInvitationCode();
      setInvitationCode(data);
    }
  }, [address]);

  const search = useCallback(async () => {
    // TODO
    try {
      console.log('keyword:', keyword);
      if (!keyword) {
        message.error('Please input address!', { className: '!mt-[130px]' });
        return;
      }
      setLoading(true);
      const { data } = await searchUserRanking(keyword);
      console.log('searchUserRanking:', data);
      if (data && data.length > 0) {
        setLoading(false);
        setSearchList(data);
        return true;
      } else {
        setLoading(false);
        message.error('address not found', { className: '!mt-[130px]' });
        return false;
      }
    } catch (e) {
      console.log('searchUserRanking:', e);
    } finally {
      setLoading(false);
    }
  }, [keyword]);
  const shareUrl = `I've joined Memoo. Join the Memevolution with us. Use my referral code for a 100 point bonus! https://${import.meta.env.VITE_SHARE_URI}join?ref=${invitationCode}`;
  const points = [
    {
      index: '01',
      title: 'Create a Token',
      points: '100 Points',
    },
    {
      index: '02',
      title: 'MeMoo Score of 70',
      points: '200 Points',
    },
    {
      index: '03',
      title: 'Participate in IMO',
      points: '5 Points',
    },
  ];

  return (
    <div className="page join flex flex-col items-center">
      <Spin spinning={loading} fullscreen />
      <div className="join-bg" />
      <div className="join-content flex flex-col items-center">
        <h3 className="mt-[37px] font-404px text-[16px] leading-[10px] text-white">Incentivized early access</h3>
        <h3 className="font-404px text-[38px] text-green">MEMOO REWARDS SCOREBOARD</h3>
        <h3 className="font-404px text-[16px] leading-[10px] text-green">SEASON 1</h3>
        <h5 className="mt-[25px] font-OCR text-[14px] leading-[14px] text-white">Check your points</h5>
        <div className="join-search flex items-center mt-[8px] bg-[#1F3B4F] rounded-[7px] ">
          <Input placeholder="Search by address" value={keyword} onChange={(e) => setKeyword(e.currentTarget.value)} />
          {keyword && <IconClose className="mr-[20px] cursor-pointer" onClick={() => setKeyword('')} />}
          <CurrentTotalPointsModal keyword={keyword} data={searchList}>
            <div
              className="w-[54px] flex items-center justify-center icon h-full cursor-pointer hover:bg-[#07E993]"
              onClick={search}
              onMouseOver={() => iconRefs.current[`IconSearch`].setHovered(true)}
              onMouseLeave={() => iconRefs.current[`IconSearch`].setHovered(false)}
            >
              <IconSearch color="#07E993" hoverColor="#B53BFF" ref={(ref) => (iconRefs.current[`IconSearch`] = ref)} />
            </div>
          </CurrentTotalPointsModal>
        </div>
        <div className="join-cards flex gap-x-[10px] mt-[30px]">
          <div className="join-cards-item flex flex-col items-center">
            <h3 className="font-404px text-[16px] text-green leading-[14px] mt-[16px]">MEMOO REWARDS SCOREBOARD</h3>
            <p className="font-OCR text-[10px] leading-[12px] text-white whitespace-pre-wrap">
              {`Complete these tasks daily to earn Early\nAccess Points and unlock future rewards.`}
            </p>
            <div className="w-[265px] rounded-[7px] bg-[#2C1843] flex flex-col gap-y-[5px] py-[21px] px-[27px] mt-[8px]">
              {points.map((item) => (
                <div className="flex justify-center items-center gap-x-[7px]" key={item.index}>
                  <div className="w-[22px] h-[22px] flex items-center justify-center bg-[#3B2059] rounded-[4px] points font-404px text-white text-[10px] leading-[14px]">
                    {item.index}
                  </div>
                  <p className="w-[120px] font-OCR text-white text-[10px] leading-[14px]">{item.title}</p>
                  <span className="points-btn w-[74px] h-[22px] flex items-center justify-center">{item.points}</span>
                </div>
              ))}
            </div>
            <p className="font-OCR text-[10px] leading-[12px] text-white whitespace-pre-wrap mt-[13px] mb-[10px]">
              {`Keep an eye out for updates on our twitter\nand telegram as the rewards continues.`}
            </p>
          </div>
          <div className="join-cards-item flex flex-col items-center">
            <h3 className="font-404px text-[16px] text-green leading-[14px] mt-[16px]">EARN FASTER WITH REFERRALS</h3>
            <p className="font-OCR text-[10px] leading-[12px] text-white whitespace-pre-wrap">
              Invite your friends to join and receive 30% of their points.
            </p>
            <div className="flex items-center justify-center gap-x-[10px] mt-[10px]">
              <div className="w-[183px] h-[139px] bg-[#2C1843] rounded-[7px] flex flex-col items-center">
                {invitationCode && invitationList && invitationList.length > 0 ? (
                  <div>
                    <div className="flex flex-col items-center top5-bonus p-[6px] mt-[5px] h-[79px]">
                      <h3 className="font-404px text-[10px] leading-[10px] text-white">TOP 5 BONUS CONTRIBUTORS</h3>
                      {invitationList.map((item, index) => (
                        <div className="w-full flex items-center gap-x-[5px] justify-between" key={item.address}>
                          <span className=" text-green font-OCR text-[8px] leading-[11px] text-nowrap">{`${index + 1}. ${formatAddress(item.address)}`}</span>
                          <span className=" text-green font-OCR text-[8px] leading-[11px] text-nowrap">
                            {item.score} pts
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="font-OCR text-[10px] leading-[14px] text-[#B53BFF] text-center">Invite now</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <img className="mt-[-11px]" src="/join/30starburst.png" alt="" />
                    <h5 className="font-404px text-[12px] leading-[12px] text-white whitespace-pre-wrap">{`EARN 30% FROM\nYOUR FRIENDS!`}</h5>
                    <p className="font-OCR text-[10px] leading-[14px] text-[#B53BFF]">Invite now</p>
                  </div>
                )}
                {invitationCode ? (
                  <div className="flex items-center justify-center gap-x-[6px] mt-[5px]">
                    <div className="invitation-box flex items-center gap-x-[4px] text-white">
                      {invitationCode}
                      <IconCopy
                        className="w-[10px] h-[11px]"
                        color="#FFFFFF"
                        onClick={() => {
                          handleCopy(invitationCode ?? '', '!mt-[135px]');
                        }}
                      />
                    </div>
                    <Button
                      className="memoo_button rounded-[4px] w-[80px] h-[30px] flex items-center gap-x-[4px]"
                      onMouseOver={() => iconRefs.current[`IconTwitter`].setHovered(true)}
                      onMouseLeave={() => iconRefs.current[`IconTwitter`].setHovered(false)}
                      onClick={() => popupSharing(`https://twitter.com/intent/tweet?url=${shareUrl}`)}
                    >
                      SHARE{' '}
                      <IconTwitter
                        color="#B53BFF"
                        hoverColor="#07E993"
                        ref={(ref) => (iconRefs.current[`IconTwitter`] = ref)}
                      />
                    </Button>
                  </div>
                ) : (
                  <Button className="memoo_button rounded-[4px] w-[153px] h-[30px] mt-[5px]" onClick={generateCode}>
                    GENERATE CODE
                  </Button>
                )}
              </div>
              <div className="w-[183px] h-[139px] bg-[#2C1843] rounded-[7px] flex flex-col items-center">
                {invitationCode && invitationList && invitationList.length > 0 ? (
                  <div>
                    <div className="flex gap-x-[18px]">
                      <div className="flex flex-col items-start">
                        <img className="mt-[-11px]" src="/join/30starburst.png" alt="" />
                        <h5 className="font-404px text-[10px] leading-[10px] text-left text-white whitespace-pre-wrap">{`EARN 30%\nFROM YOUR\nFRIENDS!`}</h5>
                      </div>
                      <div className="flex flex-col items-center">
                        <img className="mt-[-6px]" src="/join/coupon.png" alt="" />
                        <h5 className="font-404px text-[10px] leading-[10px] text-left text-white whitespace-pre-wrap mt-[7.47px]">{`USE CODE and\nGET 100 POINTS\nbonus.`}</h5>
                      </div>
                    </div>
                    <p className="font-OCR text-[10px] leading-[14px] text-[#B53BFF] text-center mt-[3px]">
                      Invited by a friend?
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <img className="mt-[-6px]" src="/join/coupon.png" alt="" />
                    <h5 className="font-404px text-[12px] leading-[12px] text-white whitespace-pre-wrap mt-[7.47px]">{`USE CODE and GET\n100 POINTS bonus.`}</h5>
                    <p className="font-OCR text-[10px] leading-[14px] text-[#B53BFF]">Invited by a friend?</p>
                  </div>
                )}

                <EnterReferralCodeModal
                  code={refInvitationCode}
                  onResult={(result) => {
                    setRefresh((v) => v + 1);
                    resultRef.current?.open(result);
                  }}
                >
                  {invitedAddress ? (
                    <div
                      className="rounded-[4px] w-[153px] h-[30px] mt-[5px] bg-[#452669] text-green font-404px text-[11px] leading-[16px] text-center flex items-center justify-center"
                      onClick={() => {
                        return;
                      }}
                    >
                      {formatAddress(invitedAddress)}
                    </div>
                  ) : (
                    <Button
                      className="memoo_button rounded-[4px] w-[153px] h-[30px] mt-[5px]"
                      onClick={() => useAddress('!mt-[130px]')}
                    >
                      ENTER REFERRAL CODE
                    </Button>
                  )}
                </EnterReferralCodeModal>
              </div>
            </div>
            <div className="flex items-center gap-x-[9px] mt-[10px]">
              <img src="/join/join-warning.png" alt="" />
              <p className="font-OCR text-[10px] leading-[12px] text-white whitespace-pre-wrap">
                Connect your wallet to access Referrals.
              </p>
            </div>
          </div>
        </div>
        <div className="join-table mt-[30px] py-[31px] ">
          {/* <div className="join-table mt-[30px]"> */}
          <div className="flex items-center justify-between px-[44px] mb-[10px]">
            <th className="font-OCR text-[#7D83B5] text-[12px] leading-[20px] text-left flex-1">Rank</th>
            <th className="font-OCR text-[#7D83B5] text-[12px] leading-[20px] text-left flex-1">Address</th>
            <th className="font-OCR text-[#7D83B5] text-[12px] leading-[20px] text-center flex-1">Total Points</th>
          </div>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <th
                key={index}
                className={`flex items-center justify-between py-[9px] px-[44px] ${isEven(index) ? 'bg-[#181A2B]' : 'bg-[#1D2034]'}`}
              >
                <tr className="font-OCR text-white text-[18px] leading-[20px]">{item.rank}</tr>
                <tr className="flex items-center gap-x-[18px] font-OCR text-white text-[18px] leading-[20px]">
                  <img className="w-[30px] h-[30px] rounded-[50%]" src={item.profileImage} />
                  {formatAddress(item.address)}
                </tr>
                <tr>
                  <div className="flex items-center justify-start gap-x-[7px] bg-[#2C1844] px-[10px] py-[11px] rounded-[50px] join-border w-[196px]">
                    <IconJoin />
                    <span className="text-[18px] text-[#EBCDFE] leading-[20px] font-OCR">
                      {Number(item.score).toLocaleString()}
                    </span>
                  </div>
                </tr>
              </th>
            ))
          ) : (
            <Empty showBorder={false} />
          )}
          {/* <Table
            className="common-table mb-10"
            columns={columns}
            dataSource={data}
            pagination={false}
            // loading={loading}
            // onChange={handleTableChange}
            // onRow={(record) => {
            //   return {
            //     onClick: (event) => {
            //       navigate(`/airdrop/${record.ticker}`);
            //     },
            //   };
            // }}
            locale={{
              emptyText: <Empty showBorder={false} />,
            }}
          /> */}
          <div className="px-[44px] my-[44px]">
            <IPagination
              currentPage={pagination.current ?? 0}
              total={pagination.total ?? 0}
              pageSize={pagination.pageSize}
              onChangePageNumber={(page) => {
                setPagination({ ...pagination, current: page });
              }}
            />
          </div>
        </div>
      </div>
      <ResultModal ref={resultRef} />
    </div>
  );
};
export default Join;
