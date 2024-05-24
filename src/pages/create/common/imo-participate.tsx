import { FC, useMemo } from 'react';
import './imo-participate.scss';
import Countdown from './countdown';
import { Button, Popover } from 'antd';
import classNames from 'classnames';

const IMOParticipate: FC = () => {
  const params = useMemo(
    () => [
      { key: 'Price', value: '$0.00003', tip: null },
      { key: 'Total Raised', value: '1.82/2.3 ETH', tip: '1' },
      { key: 'Contributed', value: '0.066 ETH', tip: '1' },
    ],
    [],
  );

  return (
    <div className="imo_participate px-5 pt-9 pb-5">
      <div className="head">
        <h3 className="flex items-center gap-x-2 font-404px text-green text text-lg uppercase">imo</h3>
      </div>
      <div className="content flex flex-col items-center">
        <div className="flex flex-col items-center">
          <span className="font-OCR text-sm text-white">Ends in</span>
          <Countdown
            className="imo_countdown flex gap-x-2 mt-5"
            format={([days, hours, minutes, seconds]) => [
              <div key="days">
                <time>{days}</time>
                <span>D</span>
              </div>,
              <div key="hours">
                <time>{hours}</time>
                <span>H</span>
              </div>,
              <div key="minutes">
                <time>{minutes}</time>
                <span>H</span>
              </div>,
              <div key="seconds">
                <time>{seconds}</time>
                <span>S</span>
              </div>,
            ]}
            instant={Date.now() + 24 * 60 * 60 * 1000}
          />
          <p className="mt-3 text-white font-OCR leading-5 text-sm">Fair Distribution Policy</p>
          <p className="text-deep-green text-center font-OCR leading-14 text-xs">
            Wallet capped at 1% token supply per address.
          </p>
        </div>
        <ul className="mt-6 params_list flex flex-col gap-y-6 w-full">
          {params.map((item) => (
            <li key={item.key} className="flex justify-between">
              <label className="text-white text-xs font-OCR leading-4 flex items-center gap-x-1.5">
                {item.key}{' '}
                {item.tip && (
                  <Popover content={item.tip}>
                    <img src="/public/create/tip.png" />
                  </Popover>
                )}
              </label>
              <var className="text-white text-lg font-OCR leading-5">{item.value}</var>
            </li>
          ))}
        </ul>
        <Button className={classNames('mt-5 uppercase w-full participate_btn h-12 font–404px', {})}>participate</Button>
      </div>
    </div>
  );
};

IMOParticipate.displayName = IMOParticipate.name;

export default IMOParticipate;
