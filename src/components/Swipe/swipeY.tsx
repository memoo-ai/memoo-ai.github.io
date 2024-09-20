import { getRandomColor } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { CrowdSourcing } from '@/types';
import DefaultAvatar from '@/assets/imgs/default-avatar.png';
import { motion } from 'framer-motion';
interface SwipeXProps {
  item: CrowdSourcing;
  index?: number;
}

const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
const SwipeY = ({ item, index }: SwipeXProps) => {
  const navigate = useNavigate();
  const Animation = {
    x: [-10, 10, -8, 8, -6, 6, -4, 4, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
      // repeat: Infinity,
      // repeatType: 'loop',
    },
  };
  // const Animation = {
  //   rotateX: [0, -90, -180, -270, -360],
  //   transition: {
  //     duration: 1,
  //     ease: 'easeInOut',
  //     repeat: Infinity,
  //     repeatType: 'loop',
  //   },
  // };
  return (
    <motion.div key={index}>
      <div
        className="carousel-column-item w-[100%] bg-[#2B526E] rounded-sm mb-[2px] px-[9px] py-[6px] flex items-center  cursor-pointer"
        key={item.ticker}
        onClick={() => navigate(`/airdrop/${item.ticker !== '' ? item?.ticker : 'default'}`)}
      >
        <img
          className="w-[30px] h-[30px] rounded-[50%]"
          // src={item?.icon && item?.icon !== '' ? item?.icon : DefaultAvatar}
          src={item?.icon && item?.icon !== '' ? item?.icon : `/avatars/avatar${index ?? 0}.png`}
          alt=""
        />{' '}
        <span className="font-REV ml-[5px] text-[#fff] text-[12px]" style={{ color: getRandomColor() }}>
          {item.address.slice(0, 4)}...{item.address.slice(-4)}
        </span>
        <span className="font-REV ml-[5px] text-[#fff] text-[12px]" style={{ fontFamily: 'REV' }}>
          {item.tradeType === 'AIRDROP_CLAIM' ? 'participated' : 'contributed'}
        </span>
        <span className="font-REV ml-[5px] text-[#fff] text-[12px] whitespace-nowrap">
          {/* {item.tradeType === 'airdrop' ? 'in' : 'of'} */}
          {item.tradeType === 'IDO_BUY' && `${item.amout}${tokenSymbol}`} in
        </span>
        <span
          className="font-REV ml-[5px] text-[#fff] text-[12px]"
          style={{ color: item.tradeType === 'AIRDROP_CLAIM' ? '#F97F7F' : '#FECC2E' }}
        >
          {item.ticker}
        </span>
        <span className="font-REV ml-[5px] text-[#fff] text-[12px]">
          {/* {item.tradeType === 'airdrop' ? 'airdrop' : ''} */}
          {item.tradeType === 'AIRDROP_CLAIM' ? 'airdrop' : 'imo'}
        </span>
      </div>
    </motion.div>
  );
};
export default SwipeY;
