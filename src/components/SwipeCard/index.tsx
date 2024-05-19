import { ReactNode, useState, useMemo } from 'react';
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

  const handleSwipeLeft = () => {
    // observe the last one in screen to stop swipe left;
    setTranslateX(translateX - step);
  };

  const handleSwipeRight = () => {
    if (translateX === 0) return;
    setTranslateX(translateX + step);
  };

  const IconSwipe = useMemo(() => {
    return type === 'dark' ? IconSwipeDark : IconSwipeLight;
  }, [type]);

  return (
    <div className={classnames('swipe-card', type === 'light' ? 'swipe-card-light' : 'swipe-card-dark')}>
      <div className="swipe-header w-full flex items-center justify-between">
        <p className="title">{title}</p>
        <div className="swipe-icons flex items-center">
          <IconSwipe className="w-10 h-10 curose-pointer mr-3" onClick={handleSwipeLeft} />
          <IconSwipe className="w-10 h-10 rotate-180 cursor-pointer" onClick={handleSwipeRight} />
        </div>
      </div>
      <div className="swipe-content">
        <div
          className="swipe-container"
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
