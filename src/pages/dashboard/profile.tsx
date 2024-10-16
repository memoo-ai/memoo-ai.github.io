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
import { getUserProfile, getMemeTop } from '@/api/profile';
import { useAccount } from '@/hooks/useWeb3';
import { ProfileDetail, MemeTop } from '@/types';
import SpecialMedalsAndRanks from './special-medals-and-ranks';
import { useParams } from 'react-router-dom';
interface ProfileContext {
  profileDetail?: ProfileDetail;
  triggerRefresh?: Function;
  memeTop?: MemeTop;
  address?: string;
  mine?: boolean;
}
export const ProfileContext = createContext<ProfileContext>({});
interface ProfileProps {
  mine?: boolean;
}
const Profile = ({ mine = false }: ProfileProps) => {
  const navigate = useNavigate();
  // const [profileDetail, setProfileDetail] = useState<UserProfile>();
  const iconRefs = useRef<any>({});
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  // const [searchParams] = useSearchParams();
  // const [paramAddress, setparamAddress] = useState<string>('');
  const [profile, setProfile] = useState<ProfileDetail>();
  const [memeTop, setMemeTop] = useState<MemeTop>();
  const { address: paramAddress } = useParams<{ address: string }>();
  const { address } = useAccount();

  useEffect(() => {
    (async () => {
      const myAddress = address?.toBase58() ?? '';
      const userAddress = paramAddress ?? '';
      const { data } = await getUserProfile(mine ? myAddress : userAddress);
      console.log('profile data:', data);
      setProfile(data);
      const { data: memeTop } = await getMemeTop(mine ? myAddress : userAddress);
      setMemeTop(memeTop);
    })();
  }, [paramAddress, refresh, address]);
  const triggerRefresh = useCallback(() => {
    setRefresh((v) => v + 1);
  }, []);

  const context: ProfileContext = useMemo(
    () => ({
      profileDetail: profile,
      triggerRefresh,
      memeTop,
      address: mine ? address?.toBase58() : paramAddress,
      mine,
    }),
    [profile, triggerRefresh, memeTop, mine, address, paramAddress],
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
        <div className="profile-layout-left flex flex-col">
          <ProfileContext.Provider value={context}>
            <CreatorRanking />
            <SpecialMedalsAndRanks />
            {/* {memeTop ? (

            ) : mine ? (
              <GoCreateCard showTitle className="h-[383px]" />
            ) : (
              <NotCreated />
            )}  */}
            {/* <GoCreateCard showTitle className="h-[383px]" /> */}
          </ProfileContext.Provider>
        </div>
        <div>
          <div className="profile-layout-right">
            <ProfileContext.Provider value={context}>
              <ProfileBanner />
              <ProfileContent />
            </ProfileContext.Provider>
          </div>
          <ProfileContext.Provider value={context}>
            <div className="mt-[22px]">
              {memeTop ? <TopPerformingToken /> : mine ? <GoCreateCard showTitle /> : <NotCreated />}
            </div>
          </ProfileContext.Provider>
          {/* <NotCreated /> */}
          {/* <GoCreateCard showTitle showBg /> */}
        </div>
      </div>
    </div>
  );
};
export default Profile;
