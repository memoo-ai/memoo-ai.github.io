import './profile.scss';
import { Button, Spin } from 'antd';
import { IconEdit } from '@/components/icons';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, createContext, useMemo, useCallback } from 'react';
import { getCreator, deleteToken } from '@/api/dashboard';
import { DashboardCreator } from '@/types';
import ProfileContent from './profile-content';
import ProfileBanner from './profile-banner';
import CreatorRanking from './creator-ranking';
import EditProfileModal from './edit-profile-modal';
import TopPerformingToken from './top-performing-token';
import NotCreated from './not-created';
import GoCreateCard from './go-create-card';
interface ProfileDetail {
  icon: string;
  banners: Array<string>;
  tokensCreated: number;
  collectiveMCap: string;
  collectiveATHMCap: string;
  totalHolders: string;
  totalHoldersGrowth: string;
  id: string;
  website: string;
  twitter: string;
  marketCap: string;
  athMarketCap: string;
  holders: string;
  holdersGrowth: string;
  ticker: string;
}
interface ProfileContext {
  profileDetail: ProfileDetail;
}
export const ProfileContext = createContext<ProfileContext>({
  profileDetail: {
    icon: 'https://memoo-res.s3.amazonaws.com/7b06d9d4-3b49-46d7-ba2b-f835e8341e0d?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZ5SIXM4BHIM2XBI5%2F20240618%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240618T060929Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=d869fae7ba01c58755f563066211607465175c6985d6a64907b86f8913517ece',
    banners: [''],
    tokensCreated: 21,
    collectiveMCap: '3,630,581,973',
    collectiveATHMCap: '150,495,392,846',
    totalHolders: '345,682',
    totalHoldersGrowth: '-1%',
    id: '123',
    website: 'website',
    twitter: 'twitter',
    marketCap: '630,581,973',
    athMarketCap: '1,495,392,846',
    holders: '684123135',
    holdersGrowth: '+21%',
    ticker: 'Tick',
  },
});
const Profile = ({ mine = false }) => {
  const navigate = useNavigate();
  const [profileDetail, setProfileDetail] = useState<ProfileDetail>();
  const iconRefs = useRef<any>({});
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefresh((v) => v + 1);
  }, []);

  useEffect(() => {
    setProfileDetail({
      icon: 'https://memoo-res.s3.amazonaws.com/7b06d9d4-3b49-46d7-ba2b-f835e8341e0d?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZ5SIXM4BHIM2XBI5%2F20240618%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240618T060929Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=d869fae7ba01c58755f563066211607465175c6985d6a64907b86f8913517ece',
      banners: [''],
      tokensCreated: 21,
      collectiveMCap: '3,630,581,973',
      collectiveATHMCap: '150,495,392,846',
      totalHolders: '345,682',
      totalHoldersGrowth: '-1%',
      id: '123',
      website: 'Memepower.org',
      twitter: 'twitter',
      marketCap: '630,581,973',
      athMarketCap: '1,495,392,846',
      holders: '684123135',
      holdersGrowth: '+21%',
      ticker: 'Tick',
    });
  }, []);
  // const context: ProfileContext = useMemo(
  //   () => ({
  //     profileDetail,
  //   }),
  //   [profileDetail],
  // );

  return (
    <div className="dashboard_items">
      {mine && (
        <div className="dashboard_top mb-[30px]">
          <div />
          <div>
            <EditProfileModal ticker="ticker" onSaveSuccess={triggerRefresh}>
              <Button type="link" className="flex items-center h-[40px] gap-x-[11px]">
                <span className="text-bluish-purple-light font-OCR leading-5 text-sm">Edit Profile</span>
                <IconEdit className="" color="#07E993" hoverColor="#B53BFF" bgColor="#B53BFF" hoverBgColor="#07E993" />
              </Button>
            </EditProfileModal>
          </div>
        </div>
      )}

      <Spin spinning={loading} fullscreen />
      <div className="profile-layout ">
        <div className="profile-layout-left">
          <CreatorRanking />
          <TopPerformingToken />
          <NotCreated />
          <GoCreateCard showTitle />
        </div>
        <div className="profile-layout-right">
          {/* <ProfileContext.Provider value={context}> */}
          <ProfileBanner />
          <ProfileContent />
          {/* </ProfileContext.Provider> */}
        </div>
      </div>
    </div>
  );
};
export default Profile;
