import { useEffect } from 'react';
import Profile from './profile';
import { useAccount } from '@/hooks/useWeb3';
import { getProfile } from '@/api/profile';
import { UserInfo } from '@/types';
const MyProfile = () => {
  const { address } = useAccount();

  useEffect(() => {
    (async () => {
      const { data } = await getProfile();
      console.log('profile data:', data);
    })();
  }, []);
  return <Profile mine={true} />;
};

export default MyProfile;
