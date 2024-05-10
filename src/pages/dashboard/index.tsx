import './index.scss';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import CommonBanner from '@/components/Banner';
export default () => {
  return (
    <div>
      <div className="dashboard">
        <div>
          <img className="dashboard_banner_img" src="./dashboard/dashboard_banner.png" alt="" />
        </div>
        <div className="dashboard_content"> 1231</div>
        <CommonBanner
          title="Exclusive ‘Proof of Creation’ Reward for Creators."
          desc="Exciting Rewards for Exceptional Talent in Meme Creation."
          link="/"
          linkText="BE A CREATOR"
        />
      </div>
    </div>
  );
};
