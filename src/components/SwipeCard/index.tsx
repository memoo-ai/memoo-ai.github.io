import { ReactNode, useState, useMemo, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { IconSwipeLight, IconSwipeDark } from '@/components/icons';
import './index.scss';
interface IProps {
  type?: 'dark' | 'light';
  title: string;
  step: number;
  children: any;
}

export default function SwipeCard({ type = 'light', title, step, children }: IProps) {
  const [translateX, setTranslateX] = useState(0);
  const swipeContainerWidth = useRef(0);
  const swipeCardWidth = useRef(0);
  useEffect(() => {
    if (children) {
      swipeCardWidth.current = document.querySelector('.swipe-card')?.clientWidth || 0;
      swipeContainerWidth.current = document.querySelector('.swipe-container')?.clientWidth || 0;
    }
  }, [children]);
  const handleSwipeRight = () => {
    // observe the last one in screen to stop swipe left;
    if (leftDisabled) return;
    setTranslateX(translateX - step);
  };

  const rightDisabled = useMemo(() => {
    return translateX === 0;
  }, [translateX]);

  const leftDisabled = useMemo(() => {
    return swipeCardWidth.current - translateX > swipeContainerWidth.current;
  }, [translateX]);

  const handleSwipeLeft = () => {
    if (translateX === 0) return;
    setTranslateX(translateX + step);
  };

  const IconSwipe = useMemo(() => {
    // return type === 'dark' ? IconSwipeDark : IconSwipeLight;
    return type === 'dark' ? IconSwipeDark : IconSwipeDark;
  }, [type]);

  return (
    <div className={classnames('swipe-card', type === 'light' ? 'swipe-card-light' : 'swipe-card-dark')}>
      <div className="swipe-header w-full flex items-center justify-between mb-[58px]">
        <p className="title font-404px">{title}</p>
        <div className="swipe-icons flex items-center">
          <IconSwipe
            className={`w-10 h-10 curose-pointer mr-3  ${leftDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} `}
            onClick={handleSwipeLeft}
          />
          <IconSwipe
            className={`w-10 h-10 rotate-180 ${rightDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} `}
            onClick={handleSwipeRight}
          />
        </div>
      </div>
      <div className="swipe-content">
        <div
          className="swipe-container "
          style={{
            transform: `translateX(${translateX}px)`,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
