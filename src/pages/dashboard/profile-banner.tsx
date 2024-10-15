import { FC, useContext } from 'react';
import { ProfileContext } from './profile';
import './profile-banner.scss';
import ProfileDefaultBannerBg from '@/assets/imgs/profile-default-banner-bg.png';
const ProfileBanner: FC = () => {
  const { profileDetail } = useContext(ProfileContext);

  return (
    <div className="banner w-full relative profile-banner-bg">
      <img
        className="w-full min-h-[200px] object-cover max-h-[307px]  rounded-tl-[15px] rounded-tr-[15px] border-1px border-[#5D64A2]"
        src={profileDetail?.profileBanner?.[0] ?? ProfileDefaultBannerBg}
      />
      <img
        className="w-[131px] h-[131px] rounded-[50%] absolute bottom-0 left-5 translate-y-1/2"
        src={profileDetail?.profileImage}
      />
    </div>
  );
};

ProfileBanner.displayName = ProfileBanner.name;

export default ProfileBanner;
