import './index.scss';
import { useCallback, useState } from 'react';
import { DashboardContent } from './dashboardContent';
import CommonBanner from '@/components/Banner';
import DashboardBannerImg1 from './assets/dashboard_banner.png';
import DashboardBannerImg2 from './assets/dashboard_banner2.png';
import DashboardBannerImg3 from './assets/dashboard_banner3.png';
export default function Dashboard() {
  const [dashboardBannerImg, setDashboardBannerImg] = useState(DashboardBannerImg1);
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
        case 'Degen':
          setDashboardBannerImg(DashboardBannerImg2);
          setCommonBanner({
            title: 'Don’t Miss Out on Airdrops.',
            desc: 'Your Chance to Score Free Meme Treasures.',
            link: '/',
            linkText: 'LAUNCHPAD',
          });
          break;
        case 'WATCHLIST':
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
    <div>
      <div className="dashboard">
        <div>
          <img className="dashboard_banner_img" src={dashboardBannerImg} alt="" />
        </div>
        <div className="dashboard_content">
          <DashboardContent
            onChangeType={(e) => {
              changeType(e);
            }}
          />
        </div>
        <div className="mb-[70px]">
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
}
