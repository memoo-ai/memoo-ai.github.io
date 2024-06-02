/* eslint-disable react/no-unstable-nested-components */
import { FC, ReactNode, useContext, useMemo } from 'react';
import { AirdropContext } from '../airdrop';
import { TokenCreateStage } from '@/types';
import { Button } from 'antd';
import classNames from 'classnames';
import './progress.scss';
import IncreaseAcquisitionModal from './increase-acquisition-modal';

const Progress: FC = () => {
  const { stage } = useContext(AirdropContext);

  const items: {
    key: TokenCreateStage;
    icon: string | ReactNode;
    title: string;
    desc: string;
    onClick?: () => void;
    wrapper?: (node: ReactNode) => ReactNode;
    btnText?: string;
    btnIcon?: string;
  }[] = useMemo(
    () => [
      {
        key: 'in-queue',
        icon: `/create/process-in-queue${stage === 'in-queue' ? '-active' : ''}.svg`,
        title: 'in queue',
        desc: 'Complete tasks to be\neligible for airdrop',
        onClick: () => {},
        btnText: 'increase',
        btnIcon: `/create/icon-increase${stage === 'in-queue' ? '-active' : ''}.svg`,
        wrapper: (node: ReactNode) => <IncreaseAcquisitionModal>{node}</IncreaseAcquisitionModal>,
      },
      {
        key: 'imo',
        icon: `/create/process-imo${stage === 'imo' ? '-active' : ''}.svg`,
        title: 'imo',
        desc: 'Get first access\nbefore public sale',
      },
      {
        key: 'launch',
        icon: `/create/process-launch${stage === 'launch' ? '-active' : ''}.svg`,
        title: 'launch',
        desc: 'Token available\nfor public sale',
      },
      {
        key: '1st-claim',
        icon: (
          <div className="relative z-10">
            <img src="/create/bg-1st-claim.png" />
            <img
              className="absolute left-[53px] top-[37px]"
              src={`/create/process-claim${stage === '1st-claim' ? '-active' : ''}.svg`}
            />
          </div>
        ),
        title: '1st claim',
        desc: '1st 50% unlock when\ntoken price hits 0.0005c',
        onClick: () => {},
        btnText: 'claim',
        btnIcon: `/create/icon-claim${stage === '1st-claim' ? '-active' : ''}.svg`,
      },
      {
        key: '2st-claim',
        icon: (
          <div className="relative z-10">
            <img src="/create/bg-2st-claim.png" />
            <img
              className="absolute left-[53px] top-[37px]"
              src={`/create/process-claim${stage === '2st-claim' ? '-active' : ''}.svg`}
            />
          </div>
        ),
        title: '2st claim',
        desc: ' Next 50% unlocked\ntokens in 14 days',
        onClick: () => {},
        btnText: 'claim',
        btnIcon: `/create/icon-claim${stage === '2st-claim' ? '-active' : ''}.svg`,
      },
    ],
    [stage],
  );

  return (
    <ul className="progress flex">
      {items.map((item) => {
        const active = item.key === stage;
        return (
          <li
            key={item.key}
            className={classNames('flex max-w-[220px] flex-col items-center justify-end progress_list_item px-[18px]', {
              active,
            })}
          >
            <div className={classNames({ active }, 'icon')}>
              {typeof item.icon === 'string' ? <img src={item.icon} /> : item.icon}
            </div>
            <h3
              className={classNames(
                { 'text-green': active },
                'text-lg font-404px leading-5 text-bluish-purple-light mt-[18px]',
              )}
            >
              {item.title}
            </h3>
            <p className="mt-1.5 font-OCR text-white leading-4 text-sm text-center break-keep whitespace-pre">
              {item.desc}
            </p>
            {item.wrapper ? (
              item.wrapper(
                <Button
                  style={{ visibility: item.btnText ? 'visible' : 'hidden' }}
                  className="mt-[19px] px-[19px] h-[38px] btn rounded-[7px]"
                  // disabled={!active}
                  onClick={() => item.onClick?.()}
                >
                  <div className="flex items-center gap-x-1">
                    {item.btnIcon && <img src={item.btnIcon} />}
                    <span className={classNames('btn_text font-404px text-white text-[10px] leading-5')}>
                      {item.btnText}
                    </span>
                  </div>
                </Button>,
              )
            ) : (
              <Button
                style={{ visibility: item.btnText ? 'visible' : 'hidden' }}
                className="mt-[19px] px-[19px] h-[38px] btn rounded-[7px]"
                disabled={!active}
                onClick={() => item.onClick?.()}
              >
                <div className="flex items-center gap-x-1">
                  {item.btnIcon && <img src={item.btnIcon} />}
                  <span className={classNames('btn_text font-404px text-white text-[10px] leading-5')}>
                    {item.btnText}
                  </span>
                </div>
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

Progress.displayName = Progress.name;

export default Progress;
