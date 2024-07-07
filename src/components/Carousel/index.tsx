import { useState, useEffect, useRef, useCallback } from 'react';
import './index.scss';
import { getRandomColor } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { getCrossDirection } from '@/api/common';

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

  const fetchData = useCallback(async () => {
    try {
      if (isHoverRef.current) return;
      const { data } = await getCrossDirection();

      setList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

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
        {list
          ? list.map((item: any, index: number) => (
              <div
                className="carousel-item mr-2 flex overflow items-center justify-between px-[10px] py-[5px]  cursor-pointer"
                key={index}
                onClick={() => navigate(`/airdrop/${item.ticker}`)}
              >
                <span className=" font-404px text-[12px] mr-[10px]">
                  {' '}
                  <span className="mr-[10px]" style={{ color: getRandomColor() }}>
                    {item.address.slice(0, 6)}...{item.address.slice(-4)}
                  </span>{' '}
                  created{' '}
                  <span className="mx-[10px]" style={{ color: getRandomColor() }}>
                    {item.ticker}
                  </span>
                </span>
                <img className="w-[30px] h-[30px] mr-2 rounded-[50%]" src={item.icon} alt="" />
              </div>
            ))
          : ''}
      </div>
    </div>
  );
};

export default Carousel;
