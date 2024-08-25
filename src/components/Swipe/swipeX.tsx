import { getRandomColor } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { CrossDirection } from '@/types';
interface SwipeXProps {
  item: CrossDirection;
}
const SwipeX = ({ item }: SwipeXProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-[max-content]  mr-2 flex overflow items-center justify-between px-[10px] py-[5px]  cursor-pointer"
      key={item.ticker}
      onClick={() => navigate(`/airdrop/${item.ticker !== '' ? item?.ticker : 'default'}`)}
    >
      <span className=" font-REV text-[12px]">
        {' '}
        <span style={{ color: getRandomColor() }}>
          {item.address.slice(0, 6)}...{item.address.slice(-4)}
        </span>{' '}
        <span className="text-[#fff]"> &nbsp; created </span>
        <span className="mx-[10px]" style={{ color: getRandomColor() }}>
          {item.ticker}
        </span>
      </span>
      <img className="w-[30px] h-[30px]  rounded-[50%]" src={item.icon} alt="" />
    </div>
  );
};
export default SwipeX;
