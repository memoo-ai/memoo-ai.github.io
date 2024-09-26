/* eslint-disable max-nested-callbacks */
import React, { useState, useRef, useCallback, useEffect, ReactNode, useMemo } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import SwipeX from './swipeX';
import SwipeY from './swipeY';
import { getCrossDirection, getCrowdSourcing } from '@/api/common';

interface SwipeProps {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  children?: ReactNode;
  isScrolling?: boolean;
}

const SwipeItem = React.memo(
  ({ item, isVertical, index }: { item: any; isVertical: boolean; index: number | string }) => {
    return isVertical ? <SwipeY item={item} index={Number(index)} /> : <SwipeX item={item} />;
  },
);

const Swipe: React.FC<SwipeProps> = React.memo(({ children, speed = 50, direction = 'up', isScrolling = true }) => {
  const [position, setPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // const prevItemsRef = useRef(list);

  const isVertical = useMemo(() => direction === 'up' || direction === 'down', [direction]);
  const isReverse = useMemo(() => direction === 'down' || direction === 'right', [direction]);

  const fetchData = useCallback(async () => {
    try {
      const { data } = isVertical ? await getCrowdSourcing() : await getCrossDirection();
      // setList(data ?? []);
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
    if (isPaused || !containerRef.current || !contentRef.current || !isScrolling) return;

    const contentSize = isVertical ? contentRef.current.offsetHeight : contentRef.current.offsetWidth;
    const containerSize = isVertical ? containerRef.current.offsetHeight : containerRef.current.offsetWidth;

    setPosition((prevPos) => {
      const newPos = prevPos - speed / 60;
      if (newPos <= -contentSize / 2) {
        return 0;
      } else {
        return newPos;
      }
    });
  }, [isPaused, isVertical, speed, isScrolling]);

  useAnimationFrame(() => {
    if (isScrolling) {
      updatePosition();
    }
  });

  const handleMouseEnter = useCallback(() => {
    if (isScrolling) {
      setIsPaused(true);
    }
  }, [isScrolling]);

  const handleMouseLeave = useCallback(() => {
    if (isScrolling) {
      setIsPaused(false);
    }
  }, [isScrolling]);

  const containerStyle = useMemo(
    () => ({
      overflow: 'hidden' as const,
      position: 'relative' as const,
      ...(isVertical
        ? { height: '220px', width: '100%' }
        : {
            height: '40px',
            width: '100vw',
            background: '#312145',
            display: 'flex',
            alignItems: 'center',
            zIndex: 9999,
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

  const repeatedList = useMemo(() => {
    if (list && list.length > 0) {
      const minItems = 15; // Minimum number of items, can be adjusted as needed
      let repeatedItems = [...list];
      while (repeatedItems.length < minItems) {
        repeatedItems = [...repeatedItems, ...list];
      }
      return repeatedItems;
    }
    return [];
  }, [list]);
  const shakeAnimation = {
    x: [-10, 10, -8, 8, -6, 6, -4, 4, 0],
    transition: {
      duration: 0.3,
    },
  };

  const pushDownAnimation = {
    y: [-20, 0],
    opacity: [0, 1],
    transition: { duration: 0.2 },
  };

  return (
    <div ref={containerRef} style={containerStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isVertical ? (
        repeatedList.map((item, index) => (
          <motion.div
            // key={`${item.ticker}`}
            key={`${item.ticker}-${Math.random()}`}
            layout
            initial={index === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            animate={index === 0 ? { ...shakeAnimation, opacity: 1 } : pushDownAnimation}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SwipeItem
              key={`${item.ticker}-${index}`}
              item={item}
              index={`${item.ticker}-${index}`}
              isVertical={isVertical}
            />
          </motion.div>
        ))
      ) : (
        <motion.div ref={contentRef} style={contentStyle}>
          {list.map((item, index) => (
            <SwipeItem
              key={`${item.ticker}-${index}`}
              item={item}
              index={`${item.ticker}-${index}`}
              isVertical={isVertical}
            />
          ))}
        </motion.div>
      )}

      {children}
    </div>
  );
});

export default Swipe;
