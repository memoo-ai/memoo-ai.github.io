import { ReactNode, useState } from 'react';
import classnames from 'classnames';
import { IconSwipeLight, IconSwipeDark } from '@/components/icons';
interface IProps {
  type: 'dark' | 'light';
  title: string;
  step: number;
  children: any;
}

export default function SwipeCard({ type, title, step, children }: IProps) {
  const [translateX, setTranslateX] = useState(0);

  const handleSwipeLeft = () => {
    setTranslateX(translateX - step);
  };

  const handleSwipeRight = () => {
    setTranslateX(translateX + step);
  };

  const IconSwipe = type === 'dark' ? IconSwipeDark : IconSwipeLight;

  return (
    <div className={classnames('swipe-card', type === 'light' ? 'swipe-card-light' : 'swipe-card-dark')}>
      <div className="swipe-header w-full flex items-center justify-between">
        <p className="title size-6">{title}</p>
        <div className="swipe-icons flex items-center">
          <IconSwipe className="w-10 h-10" onClick={handleSwipeLeft} />
          <IconSwipe className="w-10 h-10 rotate-180" onClick={handleSwipeRight} />
        </div>
      </div>
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
  );
}
