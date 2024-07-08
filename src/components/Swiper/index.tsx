import React, {
  Children,
  useState,
  useRef,
  useCallback,
  isValidElement,
  cloneElement,
  ReactElement,
  ReactNode,
} from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

interface SwipeProps {
  list: any[];
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  children: ReactNode;
}
const Swipe = ({ children, list, speed = 50, direction = 'up' }: SwipeProps) => {
  const [position, setPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isVertical = direction === 'up' || direction === 'down';
  const isReverse = direction === 'down' || direction === 'right';

  useAnimationFrame(() => {
    if (isPaused || !containerRef.current || !contentRef.current) return;

    const contentSize = isVertical ? contentRef.current.offsetHeight : contentRef.current.offsetWidth;

    setPosition((prevPos) => {
      const newPos = prevPos + (isReverse ? speed / 60 : -speed / 60);
      return Math.abs(newPos) >= contentSize / 2 ? 0 : newPos;
    });
  });

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ overflow: 'hidden', height: '200px', position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div>{children}</motion.div>
      {Children.map(children, (Child) => {
        return Child;
      })}
    </div>
  );
};

export default Swipe;
