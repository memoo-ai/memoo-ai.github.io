import { useState, useEffect, useRef, useCallback } from 'react';
import './index.scss';
import { getRandomColor } from '@/utils';
import { useNavigate } from 'react-router-dom';

export const Carousel = () => {
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
      const data = new Array(15).fill(undefined).map((_, i) => ({
        id: i,
        address: 'Rg7GG...kf9Lj7' + i,
        tokenName: generateRandomTokenName(),
        ticker: 'Tick',
      }));
      setList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // const fetchData = useCallback(async () => {
  //   try {
  //     if (isHoverRef.current) return;
  //     console.log('fetchData');
  //     const data = new Array(15).fill(undefined).map((_, i) => ({
  //       id: i,
  //       address: 'Rg7GG...kf9Lj7' + i,
  //       tokenName: generateRandomTokenName(),
  //       ticker: 'Tick',
  //     }));
  //     setList(data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }, []);

  const startInterval = () => {
    intervalIdRef.current = setInterval(() => {
      fetchData();
    }, 5000);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        ref={trackRef}
        onMouseMove={() => (isHoverRef.current = true)}
        onMouseLeave={() => (isHoverRef.current = false)}
      >
        {list.map((item: any, index: number) => (
          <div
            className="carousel-item mr-2 flex overflow items-center justify-between px-[10px] py-[5px] cursor-pointer"
            key={index}
            onClick={() => navigate(`/airdrop/${item.ticker}`)}
          >
            <span className=" font-404px text-[12px] mr-[10px]">
              {' '}
              <span className="mr-[10px]" style={{ color: getRandomColor() }}>
                {item.address}{' '}
              </span>{' '}
              created{' '}
              <span className="mx-[10px]" style={{ color: getRandomColor() }}>
                {item.tokenName}
              </span>
            </span>
            <img className="w-10 mr-2" src="./temp/cow.png" alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
