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
import { getOtherProfile } from '@/api/profile';
import { useAccount } from '@/hooks/useWeb3';
import { ProfileDetail, MemeTop } from '@/types';
interface ProfileContext {
  profileDetail?: ProfileDetail;
  triggerRefresh?: Function;
  memeTop?: MemeTop;
}
export const ProfileContext = createContext<ProfileContext>({});
interface ProfileProps {
  mine?: boolean;
  profile?: ProfileDetail;
  triggerRefresh?: Function;
  memeTop?: MemeTop;
}
const Profile = ({ mine = false, profile, triggerRefresh, memeTop }: ProfileProps) => {
  const navigate = useNavigate();
  // const [profileDetail, setProfileDetail] = useState<UserProfile>();
  const iconRefs = useRef<any>({});
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const { address } = useAccount();
  const context: ProfileContext = useMemo(
    () => ({
      profileDetail: profile,
      triggerRefresh,
      memeTop: memeTop ?? undefined,
    }),
    [profile],
  );

  return (
    <div className="dashboard_items">
      {mine && (
        <div className="dashboard_top mb-[30px]">
          <div />
          <div>
            <EditProfileModal ticker="ticker" onSaveSuccess={() => triggerRefresh?.()}>
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
          <ProfileContext.Provider value={context}>
            <CreatorRanking />
            {memeTop ? (
              <TopPerformingToken />
            ) : mine ? (
              <GoCreateCard showTitle className="h-[383px]" />
            ) : (
              <NotCreated />
            )}
          </ProfileContext.Provider>
        </div>
        <div className="profile-layout-right">
          <ProfileContext.Provider value={context}>
            <ProfileBanner />
            <ProfileContent />
          </ProfileContext.Provider>
        </div>
      </div>
    </div>
  );
};
export default Profile;
