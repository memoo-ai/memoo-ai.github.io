import './index.scss';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
const Revolutions = [
  {
    title: 'Fair Launch & Standardize Smart Contract Rails',
    desc: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: '/SVG/img-revolution-1.svg',
    width: 280,
  },
  {
    title: 'Robust Token ValueCapture Flywheel',
    desc: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: '/SVG/img-revolution-2.svg',
    width: 280,
  },
  {
    title: 'Organic Growth Loop',
    desc: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: '/SVG/img-revolution-3.svg',
    width: 150,
  },
  {
    title: 'Tools to Stay Updated with the Latest Memecoins',
    desc: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: '/SVG/img-revolution-4.svg',
    width: 280,
  },
  {
    title: 'Memecoin Metrics',
    desc: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: '/SVG/img-revolution-5.svg',
    width: 150,
  },
  {
    title: 'AI Powered Infrastructure for Creators',
    desc: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: '/SVG/img-revolution-6.svg',
    width: 280,
  },
];
export default () => {
  return (
    <div className="mx-[auto] max-w-[94.5rem]">
      <div className="content-banner-bg" />
      <div className="content-banner flex justify-between ">
        <div className="content-banner-left items pt-[6rem]">
          <img src="/img-powered-base.png" className="w-[168px] ml-2" />
          <p className="text-ultimate">The Ultimate Memecoin Infrastructure.</p>
          <p className="text-sub">Enabling the memecoin industry with a wide range of resources, tools & launchpad.</p>
          <div className="flex items-center gap-6 mt-6">
            <Button variant="default" className="text-[#FF0000] text-lg  w-[298px] h-[60px] uppercase rounded-lg">
              Memecoin Creator
            </Button>
            <Button variant="default" className="bg-[#FF0000] text-lg text-[#FFFFFF] w-[298px] h-[60px] uppercase">
              Memecoin Design
            </Button>
          </div>
          <div className="flex items-center gap-6 mt-6">
            <img src="/SVG/icon-twitter.svg" className="w-8 cursor-pointer" alt="" />
            <img src="/SVG/icon-tg.svg" alt="" className="w-8 cursor-pointer" />
          </div>
        </div>
        <div className="content-banner-right items pt-[3rem]">
          <img src="/img-content-banner-right.png" alt="" className="w-[510px]" />
        </div>
      </div>
      <div className="content-data py-[100px]">
        <div className="mx-[auto] max-w-[94.5rem] flex  jusitfy-between">
          <div className="flex flex-col text-[#000000] w-[150px]">
            <p className="font-Montserrat font-bold ">Memecoins are fun, but the risks are not.</p>
          </div>
          <div className="flex flex-col mx-auto">
            <div className="flex items-center">
              <div className="flex flex-col items-center mr-[120px]">
                <img src="/SVG/img-security.svg" className="w-[262px] h-[130px] mb-[30px]" />
                <p>of memecoins on Base chain have security threats.</p>
              </div>
              <div className="flex flex-col items-center">
                <img src="/SVG/img-malicious.svg" className="w-[313px] h-[130px] mb-[30px]" />
                <p>of memecoins on Base chain have security threats.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-[auto] max-w-[94.5rem] flex  jusitfy-between mt-[80px] ">
          <div className="flex flex-col text-[#000000] w-[150px]">
            <p className="font-Montserrat font-bold ">Memecoins are fun, but the risks are not.</p>
          </div>
          <div className="flex flex-col mx-auto">
            <img src="/SVG/img-data-desc.svg" className="w-[825px]" />
          </div>
        </div>
      </div>
      <div className="content-issues mx-auto flex items-center justify-center gap-[100px] py-[100px]">
        <img src="/img-issues.png" alt="" className="w-[483px]" />
        <img src="/img-challenges.png" alt="" className="w-[483px]" />
      </div>
      <div className="content-revolution flex flex-col items-center py-[100px]">
        <img src="/img-revolution.png" alt="" className="w-[540px]" />
        <p className="font-Montserrat font-400 text-[36px] mt-5 mb-8">Revolutionizing the future of memecoins </p>
        <div className="grid grid-cols-3 gap-5">
          {Revolutions.map((item) => (
            <div key={item.title} className="revolution-item flex flex-col items-center justify-end pt-5">
              <img src={item.img} alt="" className="h-[87px]" />
              <p className={`p-title w-[${item.width}px]`}>{item.title}</p>
              <p className="p-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="content-moo">
        <p>$MOO isn’t minted and traded at the moment. Community rewards may be announced soon.</p>
      </div>
      <Footer />
    </div>
  );
};
