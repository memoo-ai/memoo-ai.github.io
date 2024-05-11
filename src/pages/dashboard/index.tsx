import './index.scss';
// import { useCallback, useEffect, useState } from 'react';
import { DashboardContent } from './dashboardContent';
import CommonBanner from '@/components/Banner';
export default () => {
  return (
    <div>
      <div className="dashboard">
        <div>
          <img className="dashboard_banner_img" src="./dashboard/dashboard_banner.png" alt="" />
        </div>
        <div className="dashboard_content">
          <DashboardContent />
        </div>
        <div className="mb-[70px]">
          {' '}
          <CommonBanner
            title="Exclusive ‘Proof of Creation’ Reward for Creators."
            desc="Exciting Rewards for Exceptional Talent in Meme Creation."
            link="/"
            linkText="BE A CREATOR"
          />
        </div>
      </div>
    </div>
  );
};
