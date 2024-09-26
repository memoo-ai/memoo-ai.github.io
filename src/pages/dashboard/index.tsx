import './index.scss';
import { useCallback, useEffect, useState } from 'react';
import DashboardContent from './dashboard-content';
import CommonBanner from '@/components/Banner';
import DashboardBottomImg1 from './assets/dashboard_banner1.png';
import DashboardBottomImg2 from './assets/dashboard_banner2.png';
import DashboardBottomImg3 from './assets/dashboard_banner3.png';
import DashboardBottomImg4 from './assets/dashboard_banner4.png';
import DashboardBanner from './dashboard-banner';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MemeRecords from './meme-records';
export type TabType = 'Profile' | 'Creator' | 'Collector' | 'WatchList';
const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tabType, setTabType] = useState<TabType>('Creator');

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (state === 'twitter' && code) {
      const params = {
        code,
        state,
        type: 'airdrop',
      };
      if (window.opener) {
        window.opener.postMessage(params, '*');
      }
      window.close();
    }
  }, [searchParams]);
  // useEffect(() => {
  //   const code = searchParams.get('code');
  //   const state = searchParams.get('state');
  //   let followingParams = null;
  //   let updateParams = null;
  //   try {
  //     followingParams = JSON.parse(localStorage.getItem(REQUEST_FOLLOWING_STORAGE) ?? '');
  //   } catch (e) {}
  //   try {
  //     updateParams = JSON.parse(localStorage.getItem(UPDATE_PROJECT_TWITTER_STORAGE) ?? '');
  //   } catch (e) {}
  //   console.log('updateParams: ', updateParams, localStorage.getItem(UPDATE_PROJECT_TWITTER_STORAGE));
  //   if (!followingParams && !updateParams) {
  //     return;
  //   }
  //   if (state === 'twitter' && code && followingParams) {
  //     navigate(`/airdrop/${followingParams.ticker}?code=${code}&state=${state}`);
  //   } else if (state === 'twitter' && code && updateParams) {
  //     navigate(`/airdrop/${updateParams.ticker}?code=${code}&state=${state}&edit=true`);
  //   }
  // }, [searchParams]);

  const [commonBottom, setCommonBottom] = useState({
    title: 'Exclusive ‘Proof of Creation’ Reward for Creators.',
    desc: 'Exciting Rewards for Exceptional Meme Creation Talent.',
    link: '/',
    linkText: 'BE A CREATOR',
  });
  const [commonBanner, setCommonBanner] = useState({
    title: 'Begin Your Meme\nToken Empire Today.',
    desc: 'Exciting Rewards for Exceptional Talent in Meme Creation.',
    rightImg: DashboardBottomImg1,
  });

  const changeType = useCallback(
    (type: TabType) => {
      console.log(type);
      setTabType(type);
      switch (type) {
        case 'Profile':
          setCommonBanner({
            title: `Unleash the Degen in You\nand get Rewarded.`,
            desc: 'Build Your Creator Reputation to Unlock Rewards.',
            rightImg: DashboardBottomImg4,
          });
          setCommonBottom({
            title: 'Exclusive ‘Proof of Creation’ Reward for Creators.',
            desc: 'Exciting Rewards for Exceptional Meme Creation Talent.',
            link: '/gecko?type=CREATOR Ranking',
            linkText: 'BE A CREATOR',
          });
          break;
        case 'Creator':
          setCommonBanner({
            title: 'Begin Your Meme\nToken Empire Today.',
            desc: 'Ignite Your Memes, Ignite Your Success.',
            rightImg: DashboardBottomImg1,
          });
          setCommonBottom({
            title: `Exclusive ‘Proof of Creation’\nReward For Creators.`,
            desc: 'Exciting Rewards for Exceptional Meme Creation Talent.',
            link: '/create_token',
            linkText: 'BE A CREATOR',
          });
          break;
        case 'Collector':
          setCommonBanner({
            title: 'Empower Your Degen Journey.',
            desc: 'Navigate, Discover, and Conquer the Meme Token Landscape.',
            rightImg: DashboardBottomImg2,
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
            title: 'Begin Your Meme\nToken Empire Today.',
            desc: 'Ignite Your Memes, Ignite Your Success.',
            rightImg: DashboardBottomImg3,
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
      <DashboardBanner
        title={commonBanner.title}
        desc={commonBanner.desc}
        img={commonBanner.rightImg}
        tabType={tabType}
      />
      {/* <div
        className="dashboard-header-banner-bg"
        style={{ background: `url(${commonBanner.bg}) no-repeat`, backgroundSize: 'cover' }}
      >
        <div className="dashboard-header-banner-content">
          <div className="dashboard-header-banner-left flex  flex-col">
            <p className="dashboard-left-text">{commonBanner.title}</p>
            <p className="dashboard-left-sub-text">{commonBanner.desc}</p>
          </div>
          <div>
            <img className={`img-right-${tabType} img-pointer-events`} src={commonBanner.rightImg} alt="" />
          </div>
        </div>
      </div> */}
      {/* <div className="header_banner_bg" style={{ backgroundImage: `url(${dashboardBannerImg})` }}>
      </div> */}
      {/* <MemeRecords /> */}
      <div className="dashboard">
        <div className="dashboard_content">
          <DashboardContent
            onChangeType={(e) => {
              changeType(e as TabType);
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
