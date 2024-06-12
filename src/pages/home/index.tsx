import './index.scss';
import { Button } from '@/components/ui/button';
import { IconTwitter, IconTelegram, IconVector } from '@/components/icons';
import { useNavigate } from 'react-router-dom';
const Revolutions = [
  {
    title: (
      <>
        <span>Fair Launch & Standardize</span>
        <br /> <span>Smart Contract Rails</span>
      </>
    ),
    desc: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: './SVG/img-revolution-1.svg',
    width: 280,
  },
  {
    title: (
      <>
        <span>Robust Token Value</span>
        <br /> <span>Capture Flywheel</span>
      </>
    ),
    desc: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: './SVG/img-revolution-2.svg',
    width: 280,
  },
  {
    title: (
      <>
        <span>Organic</span> <br /> <span>Growth Loop</span>
      </>
    ),
    desc: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: './SVG/img-revolution-3.svg',
    width: 350,
  },
  {
    title: (
      <>
        <span>Tools to Stay Updated with</span> <br /> <span>the Latest Memecoins</span>
      </>
    ),
    desc: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: './SVG/img-revolution-4.svg',
    width: 280,
  },
  {
    title: (
      <>
        <span>Memecoin</span> <br /> <span>Metrics</span>
      </>
    ),
    desc: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: './SVG/img-revolution-5.svg',
    width: 150,
  },
  {
    title: (
      <>
        <span>AI Powered Infrastructure</span> <br /> <span>for Creators</span>
      </>
    ),
    desc: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: './SVG/img-revolution-6.svg',
    width: 280,
  },
];
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="block mx-[auto] max-w-[94.5rem]">
        <div className="content-banner-bg" />
        <div className="content-banner flex justify-between ">
          <div className="content-banner-left items pt-[6rem]">
            <img src="./img-powered-base.png" className="w-[168px] ml-2" />
            <p className="text-ultimate">The Ultimate Memecoin Infrastructure.</p>
            <p className="text-sub">
              Enabling the memecoin industry with a wide range of resources, tools & launchpad.
            </p>
            <div className="flex items-center gap-3 mt-[50px]">
              <Button
                variant="default"
                className="font-404px text-lg  w-[298px] h-[53px] uppercase rounded-lg"
                onClick={() => {
                  navigate('/create_token');
                }}
              >
                Create your meme
              </Button>
              <Button
                variant="secondary"
                className="font-404px text-lg  w-[298px] h-[53px] uppercase"
                onClick={() => navigate('/launchpad?type=airdrop')}
              >
                Hunt for airdrops
              </Button>
            </div>
            <div className="flex items-center gap-12 mt-[50px]">
              {/* <img src="./SVG/icon-twitter.svg" className="w-8 cursor-pointer" alt="" /> */}
              <IconVector className="cursor-pointer w-8" />
              <IconTwitter className="cursor-pointer w-8" />
              <IconTelegram className="cursor-pointer w-8" />
            </div>
          </div>
          <div className="content-banner-right items pt-[3rem]">
            <img src="./img-content-banner-right.png" alt="" className="w-[510px]" />
          </div>
        </div>
        {/* <div className="flex sections ">
          <div className="sections-item flex flex-col">
            <img className="sections-item-img" src="./launchPad/img-ranked.png" alt="" />
            <p className="sections-item-text">View Creator Ranking</p>
          </div>
          <div className="sections-item flex column">
            <img className="sections-item-img" src="./launchPad/img-vector.png" alt="" />
            <p className="sections-item-text">Participate in IDO</p>
          </div>
          <div className="sections-item flex column">
            <img className="sections-item-img" src="./launchPad/img-star.png" alt="" />
            <p className="sections-item-text">Find Your Favourite</p>
          </div>
        </div> */}
        <div className="content-data py-[100px] pl-[90px]">
          <div className="mx-[auto] max-w-[94.5rem] flex  jusitfy-between">
            <div className="flex flex-col text-[#000000] w-[150px]">
              <p className="content-data-title">
                Memecoins {'\n'}are fun,{'\n'} but the risks{'\n'} are not.
              </p>
            </div>
            <div className="flex flex-col mx-auto">
              <div className="flex items-center">
                <div className="flex flex-col items-center mr-[120px]">
                  <img src="./SVG/img-security.svg" className="w-[262px] h-[130px] mb-[30px]" />
                  <p className="content-data-security">of memecoins on Base chain{'\n'} have security threats.</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="./SVG/img-malicious.svg" className="w-[313px] h-[130px] mb-[30px]" />
                  <p className="content-data-security">of memecoins on {'\n'}Base chain are malicious.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-[auto] max-w-[94.5rem] flex  jusitfy-between mt-[80px] ">
            <div className="flex flex-col text-[#000000] w-[150px]">
              <p className="content-data-title">
                Love & hate{'\n'} with meme {'\n'}projects.
              </p>
            </div>
            <div className="flex flex-col mx-auto">
              <img src="./SVG/img-data-desc.svg" className="w-[825px]" />
            </div>
          </div>
        </div>
        <div className="content-issues mx-auto flex items-start justify-center gap-[100px] py-[75px]">
          <div className="flex flex-col">
            <p className="content-issue-text mb-[47px]">
              <span> Memecoin Buyer </span> <br /> <span>Issues</span>
            </p>
            <img src="./img-issues.png" alt="" className="w-[483px]" />
          </div>
          <div className="flex flex-col">
            <p className="content-issue-text mb-[59px]">
              <span>Memecoin Creator </span> <br /> <span>Challenges</span>{' '}
            </p>
            <img src="./img-challenges.png" alt="" className="w-[483px]" />
          </div>
        </div>
        <div className="content-revolution flex flex-col items-center py-[50px]">
          <img src="./img-revolution.png" alt="" className="w-[540px]" />
          <p className="font-OCR font-bold text-[28px] leading-[30px] mt-5 mb-8">
            Revolutionizing the future of memecoins{' '}
          </p>
          <div className="grid grid-cols-3 gap-5">
            {Revolutions.map((item, index) => (
              <div key={index} className="revolution-item flex flex-col items-center justify-end pt-5">
                <img src={item.img} alt="" className="h-[87px]" />
                <p className={`p-title w-[${item.width}px]`}>{item.title}</p>
                <p className="p-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="content-moo">
          <p>
            <span>$MOO</span> isn’t minted and traded at the moment. Community rewards may be announced soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
