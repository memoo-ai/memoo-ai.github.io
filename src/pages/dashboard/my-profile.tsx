/* eslint-disable no-debugger */
import { useEffect, useState, useCallback } from 'react';
import Profile from './profile';
import { useAccount } from '@/hooks/useWeb3';
import { getOtherProfile, getMemeTop } from '@/api/profile';
import { MemeTop, ProfileDetail } from '@/types';
const MyProfile = () => {
  const { address } = useAccount();
  const [profile, setProfile] = useState<ProfileDetail>();
  const [refresh, setRefresh] = useState(0);
  const [memeTop, setMemeTop] = useState<MemeTop>();

  useEffect(() => {
    (async () => {
      const { data } = await getOtherProfile(address?.toBase58() ?? '');
      console.log('profile data:', data);
      setProfile(data);

      const { data: memeTop } = await getMemeTop(address?.toBase58() ?? '');
      setMemeTop(memeTop ?? []);
    })();
  }, [address, refresh]);

  const triggerRefresh = useCallback(() => {
    setRefresh((v) => v + 1);
  }, []);
  return <Profile mine={true} profile={profile} triggerRefresh={triggerRefresh} memeTop={memeTop} />;
};

export default MyProfile;
