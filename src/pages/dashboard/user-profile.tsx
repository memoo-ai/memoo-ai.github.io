/* eslint-disable no-debugger */
import './user-profile.scss';
import { useEffect, useState, useCallback } from 'react';
import Profile from './profile';
import ProjectCreator from './project-creator';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MemeTop, ProfileDetail } from '@/types';
import { getMemeTop, getUserProfile } from '@/api/profile';
import { useParams } from 'react-router-dom';
const UserProfile = () => {
  const [searchParams] = useSearchParams();
  const [userAddress, setUserAddress] = useState<string>('');
  const [profile, setProfile] = useState<ProfileDetail>();
  const [memeTop, setMemeTop] = useState<MemeTop>();
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const address = searchParams.get('address');
    setUserAddress(address ?? '');
  }, [searchParams]);
  useEffect(() => {
    (async () => {
      const { data } = await getUserProfile(userAddress ?? '');
      console.log('profile data:', data);
      setProfile(data);
      debugger;
      const { data: memeTop } = await getMemeTop(userAddress ?? '');
      setMemeTop(memeTop);
    })();
  }, [userAddress, refresh]);
  const triggerRefresh = useCallback(() => {
    setRefresh((v) => v + 1);
  }, []);
  return (
    <div className="my-[70px] ">
      <div className="user-profile bg-[#131522]  rounded-[20px] px-[22px] pt-[22px] pb-[70px]">
        <Profile profile={profile} triggerRefresh={triggerRefresh} memeTop={memeTop} />
        <ProjectCreator userAddress={userAddress} refresh={refresh} />
      </div>
    </div>
  );
};

export default UserProfile;
