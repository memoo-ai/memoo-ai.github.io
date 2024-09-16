import './index.scss';
import { useCallback, useEffect, useState } from 'react';
import DashboardContent from './dashboard-content';
import CommonBanner from '@/components/Banner';
import DashboardBottomImg1 from './assets/dashboard_banner1.png';
import DashboardBottomImg2 from './assets/dashboard_banner2.png';
import DashboardBottomImg3 from './assets/dashboard_banner3.png';
import DashboardBottomImg4 from './assets/dashboard_banner4.png';
import DashboardBottomBgImg1 from './assets/dashboard_banner_bg1.png';
import DashboardBottomBgImg2 from './assets/dashboard_banner_bg2.png';
import DashboardBottomBgImg3 from './assets/dashboard_banner_bg3.png';
import DashboardBottomBgImg4 from './assets/dashboard_banner_bg4.png';
import HeaderBannerBg from './assets/header-banner-bg.png';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { REQUEST_FOLLOWING_STORAGE, UPDATE_PROJECT_TWITTER_STORAGE } from '@/constants';
import MemeRecords from './meme-records';

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tabType, setTabType] = useState('creator');
  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    let followingParams = null;
    let updateParams = null;
    try {
      followingParams = JSON.parse(localStorage.getItem(REQUEST_FOLLOWING_STORAGE) ?? '');
    } catch (e) {}
    try {
      updateParams = JSON.parse(localStorage.getItem(UPDATE_PROJECT_TWITTER_STORAGE) ?? '');
    } catch (e) {}
    console.log('updateParams: ', updateParams, localStorage.getItem(UPDATE_PROJECT_TWITTER_STORAGE));
    if (!followingParams && !updateParams) {
      return;
    }
    if (state === 'twitter' && code && followingParams) {
      navigate(`/airdrop/${followingParams.ticker}?code=${code}&state=${state}`);
    } else if (state === 'twitter' && code && updateParams) {
      navigate(`/airdrop/${updateParams.ticker}?code=${code}&state=${state}&edit=true`);
    }
  }, [searchParams]);

  const [commonBottom, setCommonBottom] = useState({
    title: 'Exclusive ‘Proof of Creation’ Reward for Creators.',
    desc: 'Exciting Rewards for Exceptional Talent in Meme Creation.',
    link: '/',
    linkText: 'BE A CREATOR',
  });
  const [commonBanner, setCommonBanner] = useState({
    title: 'Exclusive ‘Proof of Creation’ Reward for Creators.',
    title1: '',
    desc: 'Exciting Rewards for Exceptional Talent in Meme Creation.',
    rightImg: DashboardBottomImg1,
    bg: DashboardBottomBgImg1,
  });

  const changeType = useCallback(
    (type: string) => {
      console.log(type);
      setTabType(type);
      switch (type) {
        case 'Profile':
          setCommonBanner({
            title: 'Unleash the Degen in You',
            title1: 'and get Rewarded.',
            desc: 'Build Your Creator Reputation to Unlock Rewards.',
            rightImg: DashboardBottomImg4,
            bg: DashboardBottomBgImg4,
          });
          setCommonBottom({
            title: 'Exclusive ‘Proof of Creation’ Reward for Creators.',
            desc: 'Exciting Rewards for Exceptional Talent in Meme Creation.',
            link: '/gecko?type=CREATOR Ranking',
            linkText: 'BE A CREATOR',
          });
          break;
        case 'Creator':
          setCommonBanner({
            title: 'Begin Your Meme',
            title1: 'Token Empire Today.',
            desc: 'Ignite Your Memes, Ignite Your Success.',
            rightImg: DashboardBottomImg1,
            bg: DashboardBottomBgImg1,
          });
          setCommonBottom({
            title: `Exclusive ‘Proof of Creation’\nReward For Creators.`,
            desc: 'Exciting Rewards for Exception Talent in Meme Creation.',
            link: '/create_token',
            linkText: 'BE A CREATOR',
          });
          break;
        case 'Collector':
          setCommonBanner({
            title: 'Begin Your Meme',
            title1: 'Token Empire Today.',
            desc: 'Ignite Your Memes, Ignite Your Success.',
            rightImg: DashboardBottomImg2,
            bg: DashboardBottomBgImg2,
          });
          setCommonBottom({
            title: 'Don’t Miss Out on Airdrops.',
            desc: 'Your Chance to Score Free Meme Treasures.',
            link: '/',
            linkText: 'LAUNCHPAD',
          });
          break;
        case 'WatchList':
          setCommonBanner({
            title: 'Begin Your Meme',
            title1: 'Token Empire Today.',
            desc: 'Ignite Your Memes, Ignite Your Success.',
            rightImg: DashboardBottomImg3,
            bg: DashboardBottomBgImg3,
          });
          setCommonBottom({
            title: 'Let MeMoo Score do the Work for You.',
            desc: 'The Key to Informed Meme Token Decision Making.',
            link: '/gecko',
            linkText: 'MEMOOGECKO',
          });
          break;
        default:
          setCommonBottom({
            title: 'Exclusive ‘Proof of Creation’ Reward for Creators.',
            desc: 'Ignite Your Memes, Ignite Your Success.',
            link: '/create_token',
            linkText: 'BE A CREATOR',
          });
          break;
      }
    },
    [commonBottom, commonBanner],
  );
  return (
    <div className="dashboard-page">
      <div
        className="dashboard-header-banner-bg"
        style={{ background: `url(${HeaderBannerBg}) no-repeat`, backgroundSize: 'cover' }}
      >
        {/* <div className="header-banner-bg" style={{ background: `url(${commonBottom.bg})` }}> */}
        <div className="dashboard-header-banner-content">
          <div className="dashboard-header-banner-left flex  flex-col">
            <p className="dashboard-left-text">
              <span> {commonBanner.title}</span> <br />
              <span className="mt-[15px]"> {commonBanner.title1}</span>
            </p>
            <p className="dashboard-left-sub-text">{commonBanner.desc}</p>
          </div>
          <div style={{ height: tabType === 'Collector' ? '100%' : 'auto' }}>
            <img className="w-[497px] h-[370px] img-pointer-events" src={commonBanner.rightImg} alt="" />
          </div>
        </div>
      </div>
      {/* <div className="header_banner_bg" style={{ backgroundImage: `url(${dashboardBannerImg})` }}>
      </div> */}
      {/* <MemeRecords /> */}
      <div className="dashboard">
        <div className="dashboard_content">
          <DashboardContent
            onChangeType={(e) => {
              changeType(e);
            }}
          />
        </div>
        <div>
          {' '}
          <CommonBanner
            title={commonBottom.title}
            desc={commonBottom.desc}
            link={commonBottom.link}
            linkText={commonBottom.linkText}
            bgType={2}
          />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
