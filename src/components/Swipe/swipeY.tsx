import { getRandomColor } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { CrowdSourcing } from '@/types';
import DefaultAvatar from '@/assets/imgs/default-avatar.png';
interface SwipeXProps {
  item: CrowdSourcing;
}
const SwipeY = ({ item }: SwipeXProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="carousel-column-item w-[100%] bg-[#2B526E] rounded-sm mb-[2px] px-[9px] py-[6px] flex items-center  cursor-pointer"
      key={item.ticker}
      onClick={() => navigate(`/airdrop/${item.ticker !== '' ? item?.ticker : 'default'}`)}
    >
      <img
        className="w-[30px] h-[30px] rounded-[50%]"
        src={item?.icon && item?.icon !== '' ? item?.icon : DefaultAvatar}
        alt=""
      />{' '}
      <span className="font-REV ml-[5px] text-[#fff] text-[12px]" style={{ color: getRandomColor() }}>
        {item.address.slice(0, 4)}...{item.address.slice(-4)}
      </span>
      <span className="font-REV ml-[5px] text-[#fff] text-[12px]" style={{ fontFamily: 'REV' }}>
        {item.tradeType === 'airdrop' ? 'participated' : 'contributed'}
      </span>
      <span className="font-REV ml-[5px] text-[#fff] text-[12px]">
        {/* {item.tradeType === 'airdrop' ? 'in' : 'of'} */}
        {item.amout} in
      </span>
      <span className="font-REV ml-[5px] text-[#fff] text-[12px]" style={{ color: getRandomColor() }}>
        {item.ticker}
      </span>
      <span className="font-REV ml-[5px] text-[#fff] text-[12px]">
        {/* {item.tradeType === 'airdrop' ? 'airdrop' : ''} */}
        {item.tradeType === 'airdrop' ? 'airdrop' : 'imo'}
      </span>
    </div>
  );
};
export default SwipeY;
