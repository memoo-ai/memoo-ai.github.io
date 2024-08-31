import { IconTwitter, IconTelegram, IconVector } from '@/components/icons';
import './mobile.scss';
export default () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#F5F5F5] flex flex-col items-center md:hidden ml-[-1.5rem] mobile-bg pt-8">
      <img src="./img-oops.png" alt="" className="w-[180px] mt-3" />
      <p className="font-404px text-[14px] text-[#ffffff] text-center leading-5 my-5">
        MeMoo currently doesn’t support mobile. This site is optimized for PC.
      </p>
      <img src="./img-face.png" alt="" className="w-[150px]" />
      <p className="font-404px text-[18px] text-[#ffffff] text-center leading-5 my-5 w-[327px]">Follow Us</p>
      <div className="flex items-center gap-6 mb-4">
        <IconTwitter className="cursor-pointer w-8" />
        <IconTelegram className="cursor-pointer w-8" />
      </div>
      <img src="./img-logo-vertical.png" alt="" className="w-[150px] mb-5" />
      <img src="./img-powered-base.png" className="w-[168px] ml-2" />
    </div>
  );
};
