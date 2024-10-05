import { useRef, useState, useEffect } from 'react';
import { IconCopy, IconSearch, IconTwitter } from '@/components/icons';
import './index.scss';
import { Input, Button, Table, Spin } from 'antd';
import type { PaginationProps } from 'antd';
import { useCallback } from 'react';
import { handleCopy, popupSharing } from '@/utils';
import IPagination from '@/components/IPagination';
import Empty from '@/components/Empty';
import { columns } from './columns';
import { useSearchParams, useNavigate } from 'react-router-dom';
const Join = () => {
  const [keyword, setKeyword] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [refInvitationCode, setRefInvitationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const iconRefs = useRef<any>({});
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 30,
  });
  const [data, setData] = useState([
    {
      address: '0x0000000000000000000000000000000000000000',
      icon: '/join/icon.png',
      totalPoints: '23256461531',
    },
  ]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const ticker = searchParams.get('ref');
    setRefInvitationCode(ticker ?? '');
  }, [searchParams]);
  const search = useCallback(async () => {
    // TODO
    console.log('keyword:', keyword);
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
          <Input placeholder="Search by address" onChange={(e) => setKeyword(e.currentTarget.value)} />
          <div className="w-[54px] flex items-center justify-center icon h-full cursor-pointer" onClick={search}>
            <IconSearch />
          </div>
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
                <img className="mt-[-11px]" src="/join/30starburst.png" alt="" />
                <h5 className="font-404px text-[12px] leading-[12px] text-white whitespace-pre-wrap">{`EARN 30% FROM\nYOUR FRIENDS!`}</h5>
                <p className="font-OCR text-[10px] leading-[14px] text-[#B53BFF]">Invite now</p>
                {invitationCode ? (
                  <div className="flex items-center justify-center gap-x-[6px] mt-[5px]">
                    <div className="invitation-box flex items-center gap-x-[4px] text-white">
                      {invitationCode}{' '}
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
                  <Button className="memoo_button rounded-[4px] w-[153px] h-[30px] mt-[5px]">GENERATE CODE</Button>
                )}
              </div>
              <div className="w-[183px] h-[139px] bg-[#2C1843] rounded-[7px] flex flex-col items-center">
                <img className="mt-[-6px]" src="/join/coupon.png" alt="" />
                <h5 className="font-404px text-[12px] leading-[12px] text-white whitespace-pre-wrap mt-[7.47px]">{`USE CODE and GET\n100 POINTS bonus.`}</h5>
                <p className="font-OCR text-[10px] leading-[14px] text-[#B53BFF]">Invited by a friend?</p>
                <Button className="memoo_button rounded-[4px] w-[153px] h-[30px] mt-[5px]">ENTER REFERRAL CODE</Button>
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
        <div className="join-table mt-[30px]">
          <Table
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
          />
          <div className="px-[44px] mb-[44px]">
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
    </div>
  );
};
export default Join;
