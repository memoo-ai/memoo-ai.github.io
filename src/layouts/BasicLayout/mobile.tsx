import { IconTwitter, IconTelegram, IconBook, IconCoin } from '@/components/icons';
import MobileBg from '@/assets/imgs/kings-bg.png';
import './mobile.scss';
const gitBook = import.meta.env.VITE_LINK_GIT_BOOK;
const Mobile = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#090A10] flex flex-col items-center md:hidden ml-[-1.5rem] mobile-bg pt-8 relative z-10">
      <img
        className="top-[14px] left-0 absolute z-[-1] h-[256px] mx-auto object-cover"
        src="/create/mobile-bg1.png"
        alt=""
      />
      <img
        className="top-[270px] left-0 absolute z-[-1] h-[256px] mx-auto object-cover"
        src="/create/mobile-bg2.png"
        alt=""
      />
      {/* <div className="mobile-bg1" />
      <div className="mobile-bg2" /> */}
      <div className="flex items-center">
        <span className="beta-btn">BETA</span>
      </div>
      <img src="/img-logo-vertical.png" alt="" className="w-[191.07px] mb-14 mt-10" />
      <div className="w-[271px] flex flex-col mobile-version">
        <h3 className="text-[#07E993] text-[20px] font-404px leading-5 text-center">Mobile Version is coming soon</h3>
        <p className="font-OCR text-[12px] leading-3 text-white text-center mt-[13px]">
          Please access Memoo from a PC at the moment.
        </p>
      </div>
      <div className="flex items-center gap-6 mt-16">
        <IconBook
          className="cursor-pointer w-[47.24px] h-[34px]"
          color="#B53BFF"
          onClick={() => {
            window.open(gitBook, '_blank');
          }}
        />
        <IconTelegram
          className="cursor-pointer w-[36.06px] h-[33.75px]"
          color="#B53BFF"
          onClick={() => {
            window.open('https://t.me/memooai_official', '_blank');
          }}
        />
        <IconTwitter
          className="cursor-pointer w-[40.24px] h-[33.92px]"
          color="#B53BFF"
          onClick={() => {
            window.open('https://x.com/MemooAI', '_blank');
          }}
        />
      </div>
      <div className="flex items-center mt-[18px]">
        <span className="font-REV text-white text-[12px] mr-[9px]">POWERED ON</span> <IconCoin />{' '}
      </div>
    </div>
  );
};
export default Mobile;
