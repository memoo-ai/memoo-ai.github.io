import { FC, useContext } from 'react';
import { AirdropContext } from '.';
import ProfileDefaultBannerBg from '@/assets/imgs/profile-default-banner-bg.png';

const Banner: FC = () => {
  const { idoQueueDetail } = useContext(AirdropContext);

  return (
    <div className="banner w-full relative">
      <img
        className="w-full min-h-[200px]  max-h-[307px] rounded-tl-[15px] rounded-tr-[15px] border-1px border-[#5D64A2]"
        src={idoQueueDetail?.banners?.[0] ?? ProfileDefaultBannerBg}
      />
      <img
        className="w-[131px] h-[131px] rounded-[50%] absolute bottom-0 left-5 translate-y-1/2"
        src={idoQueueDetail?.icon}
      />
    </div>
  );
};

Banner.displayName = Banner.name;

export default Banner;
