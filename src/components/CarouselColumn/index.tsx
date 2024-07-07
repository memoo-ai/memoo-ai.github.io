import { useState, useEffect, useRef } from 'react';
import './index.scss';
import { getRandomColor } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { getCrowdsourcing } from '@/api/common';

export const CarouselColumn = () => {
  const [list, setList] = useState<any>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const isHoverRef = useRef(false);
  const intervalIdRef = useRef<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    startInterval();

    return () => {
      clearInterval(intervalIdRef.current!);
    };
  }, []);

  const generateRandomTokenName = () => {
    const tokenNames = ['BTC', 'ETH', 'XRP', 'LTC', 'ADA'];
    return tokenNames[Math.floor(Math.random() * tokenNames.length)];
  };

  const fetchData = async () => {
    try {
      if (isHoverRef.current) return;
      console.log('fetchData');
      const { data } = await getCrowdsourcing();
      setList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const startInterval = () => {
    intervalIdRef.current = setInterval(() => {
      fetchData();
    }, 5000);
  };

  return (
    <div className="carousel-column-container">
      <div
        className="carousel-column-track"
        ref={trackRef}
        onMouseMove={() => (isHoverRef.current = true)}
        onMouseLeave={() => (isHoverRef.current = false)}
      >
        {list.map((item: any, index: number) => (
          <div
            className="carousel-column-item w-[100%] bg-[#2B526E] rounded-sm mb-[2px] px-[9px] py-[6px] flex items-center  cursor-pointer"
            key={item.id}
            onClick={() => navigate(`/airdrop/${item.ticker}`)}
          >
            <img className="w-[30px]" src={item.icon} alt="" />{' '}
            <span className="font-404px ml-[5px] text-[#fff] text-[12px]" style={{ color: getRandomColor() }}>
              {item.address.slice(0, 6)}...{item.address.slice(-4)}
            </span>
            <span className="font-404px ml-[5px] text-[#fff] text-[12px]">{item.tradeType}</span>
            <span className="font-404px ml-[5px] text-[#fff] text-[12px]">
              {item.tradeType === 'airdrop' ? 'in' : 'of'}
            </span>
            <span className="font-404px ml-[5px] text-[#fff] text-[12px]" style={{ color: getRandomColor() }}>
              {item.ticker}
            </span>
            <span className="font-404px ml-[5px] text-[#fff] text-[12px]">
              {item.tradeType === 'airdrop' ? 'airdrop' : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselColumn;
