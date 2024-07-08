import React, { useState, useRef, useCallback, useEffect, ReactNode, useMemo } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import SwipeX from './swipeX';
import SwipeY from './swipeY';
import { getCrossDirection, getCrowdSourcing } from '@/api/common';

interface SwipeProps {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  children?: ReactNode;
}

const SwipeItem = React.memo(({ item, isVertical }: { item: any; isVertical: boolean }) => {
  return isVertical ? <SwipeY item={item} /> : <SwipeX item={item} />;
});

const Swipe: React.FC<SwipeProps> = React.memo(({ children, speed = 50, direction = 'up' }) => {
  const [position, setPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isVertical = useMemo(() => direction === 'up' || direction === 'down', [direction]);
  const isReverse = useMemo(() => direction === 'down' || direction === 'right', [direction]);

  const fetchData = useCallback(async () => {
    try {
      const { data } = isVertical ? await getCrowdSourcing() : await getCrossDirection();
      setList((prevList) => {
        if (JSON.stringify(prevList) !== JSON.stringify(data)) {
          return data;
        }
        return prevList;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [isVertical]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 15000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  const updatePosition = useCallback(() => {
    if (isPaused || !containerRef.current || !contentRef.current) return;

    const contentSize = isVertical ? contentRef.current.offsetHeight : contentRef.current.offsetWidth;

    setPosition((prevPos) => {
      const newPos = prevPos + (isReverse ? speed / 60 : -speed / 60);
      return Math.abs(newPos) >= contentSize / 2 ? 0 : newPos;
    });
  }, [isPaused, isVertical, isReverse, speed]);

  useAnimationFrame(updatePosition);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  const containerStyle = useMemo(
    () => ({
      overflow: 'hidden' as const,
      position: 'relative' as const,
      ...(isVertical
        ? { height: '220px', width: '100%' }
        : {
            height: '40px',
            width: '100vw',
            position: 'relative' as const,
            marginLeft: '50%',
            transform: 'translateX(-50%)',
            background: '#312145',
            display: 'flex',
            alignItems: 'center',
          }),
    }),
    [isVertical],
  );

  const contentStyle = useMemo(
    () => ({
      position: 'absolute' as const,
      display: 'flex',
      flexDirection: isVertical ? ('column' as const) : ('row' as const),
      [isVertical ? 'top' : 'left']: position,
      ...(isVertical ? { width: '100%' } : { height: '100%' }),
    }),
    [isVertical, position],
  );

  const repeatedList = useMemo(() => [...list, ...list], [list]);

  return (
    <div ref={containerRef} style={containerStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <motion.div ref={contentRef} style={contentStyle}>
        {repeatedList.map((item, index) => (
          <SwipeItem key={`${item.ticker}-${index}`} item={item} isVertical={isVertical} />
        ))}
      </motion.div>
      {children}
    </div>
  );
});

export default Swipe;
