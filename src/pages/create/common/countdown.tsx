import { FC, Fragment, useEffect, useMemo, useState } from 'react';

const Countdown: FC<{ instant: number; onEnded?: (ended: boolean) => void }> = ({ instant, onEnded }) => {
  const [update, setUpdate] = useState(0);

  const remainingTime = useMemo(() => {
    if (!instant) return [];

    const now = Date.now();
    const remainingTime = instant - now;

    if (remainingTime <= 0) {
      onEnded?.(true);
      return [0, 0, 0, 0]; // 时间已过或无剩余时间
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return [
      // `${days}D`,
      // `${String(hours).padStart(2, '0')}H`,
      // `${String(minutes).padStart(2, '0')}M`,
      // `${String(seconds).padStart(2, '0')}S`,
      `${String(hours).padStart(2, '0')}`,
      `${String(minutes).padStart(2, '0')}`,
      `${String(seconds).padStart(2, '0')}`,
    ];
  }, [instant, update, onEnded]);

  useEffect(() => {
    const now = Date.now();
    const remainingTime = instant - now;

    if (remainingTime > 0) {
      onEnded?.(false);

      const task = setInterval(() => {
        setUpdate((count) => count + 1);
      }, 1000);

      return () => {
        clearInterval(task);
      };
    }
  }, [instant, onEnded]);

  return (
    <div className="countdown">
      {remainingTime.map((time, index) => (
        <Fragment key={index}>
          <span className="timefragments text-lg text-white font-404px">{time}</span>
          {index < remainingTime.length - 1 && <span className="splitor text-lg text-white font-404px">:</span>}
        </Fragment>
      ))}
    </div>
  );
};

Countdown.displayName = Countdown.name;

export default Countdown;
