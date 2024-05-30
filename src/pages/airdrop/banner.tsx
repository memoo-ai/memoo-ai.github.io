import { FC, useContext } from 'react';
import { AirdropContext } from '.';

const Banner: FC = () => {
  const { idoQueueDetail } = useContext(AirdropContext);

  return (
    <div className="banner w-full relative">
      <img className="w-full min-h-[200px] object-cover max-h-[307px]" src={idoQueueDetail?.banners?.[0]} />
      <img
        className="w-[131px] h-[131px] rounded-[50%] absolute bottom-0 left-5 translate-y-1/2"
        src={idoQueueDetail?.icon}
      />
    </div>
  );
};

Banner.displayName = Banner.name;

export default Banner;
