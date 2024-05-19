import './index.scss';
import { useCallback, useState } from 'react';
import { DashboardContent } from './dashboardContent';
import CommonBanner from '@/components/Banner';
import DashboardBannerImg1 from './assets/dashboard_banner1.png';
import DashboardBannerBgImg1 from './assets/dashboard_banner_bg1.png';
import DashboardBannerImg2 from './assets/dashboard_banner2.png';
import DashboardBannerImg3 from './assets/dashboard_banner3.png';
const Dashboard = () => {
  const [dashboardBannerImg, setDashboardBannerImg] = useState(DashboardBannerImg1);
  const [dashboardBannerBgImg, setDashboardBannerBgImg] = useState(DashboardBannerBgImg1);
  const [commonBanner, setCommonBanner] = useState({
    title: 'Exclusive ‘Proof of Creation’ Reward for Creators.',
    desc: 'Exciting Rewards for Exceptional Talent in Meme Creation.',
    link: '/',
    linkText: 'BE A CREATOR',
  });
  const changeType = useCallback(
    (type: string) => {
      console.log(type);
      switch (type) {
        case 'Creator':
          setDashboardBannerImg(DashboardBannerImg1);
          setCommonBanner({
            title: 'Exclusive ‘Proof of Creation’ Reward for Creators.',
            desc: 'Exciting Rewards for Exceptional Talent in Meme Creation.',
            link: '/',
            linkText: 'BE A CREATOR',
          });
          break;
        case 'Collector':
          setDashboardBannerImg(DashboardBannerImg2);
          setCommonBanner({
            title: 'Don’t Miss Out on Airdrops.',
            desc: 'Your Chance to Score Free Meme Treasures.',
            link: '/',
            linkText: 'LAUNCHPAD',
          });
          break;
        case 'WatchList':
          setDashboardBannerImg(DashboardBannerImg3);
          setCommonBanner({
            title: 'Let MeMoo Score do the Work for You.',
            desc: 'The Key to Informed Meme Token Decision Making.',
            link: '/',
            linkText: 'MEMOOGECKO',
          });
          break;
        default:
          setCommonBanner({
            title: 'Exclusive ‘Proof of Creation’ Reward for Creators.',
            desc: 'Exciting Rewards for Exceptional Talent in Meme Creation.',
            link: '/',
            linkText: 'BE A CREATOR',
          });
          break;
      }
    },
    [dashboardBannerImg, commonBanner],
  );
  return (
    <div className="page">
      <div className="header_banner_bg" style={{ backgroundImage: `url(${dashboardBannerImg})` }}>
        {/* <div className="header_banner_text">
          <div className="header_banner_text_title">1</div>
          <div className="header_banner_text_description">2</div>
        </div>
        <img className="w-[100px] h-[200px]" src={dashboardBannerImg} alt="" /> */}
      </div>
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
            title={commonBanner.title}
            desc={commonBanner.desc}
            link={commonBanner.link}
            linkText={commonBanner.linkText}
            bgType={2}
          />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
