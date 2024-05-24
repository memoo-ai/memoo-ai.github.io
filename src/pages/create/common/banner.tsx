import { FC } from 'react';

const Banner: FC = () => {
  return (
    <div className="banner w-full relative">
      <img className="w-full" src="/public/create/img-banner-demo.png" />
      <img className="w-30 absolute bottom-0 left-5 translate-y-1/2" src="/public/create/img-logo-demo.png" />
    </div>
  );
};

Banner.displayName = Banner.name;

export default Banner;
