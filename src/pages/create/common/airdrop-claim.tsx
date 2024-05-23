import { useMemo, useState } from 'react';
import Countdown from './countdown';
import { TokenCreateStage } from '@/types';
import './airdrop-claim.scss';
import { Button, Popover } from 'antd';
import classNames from 'classnames';

export default function AirdropClaim() {
  const [stage, setStage] = useState<TokenCreateStage>('in-queue');

  const follows = useMemo(
    () => [
      { user: 'dogekiller', link: '', followed: false },
      { user: 'MeMoo.ai', link: '', followed: true },
    ],
    [],
  );

  const doingTask = useMemo(() => stage === 'in-queue', [stage]);

  const airdropUnlocking = useMemo(() => stage === 'imo', [stage]);

  const airdropUnlocked = useMemo(() => stage === 'launch' || stage === '1st-claim' || stage === '2st-claim', [stage]);

  return (
    <div className="airdrop_claim px-5 pt-9 pb-5">
      <div className="head flex justify-between">
        <h3 className="flex items-center gap-x-2 font-404px text-green text text-lg">
          airdrop{' '}
          <Popover>
            <img src="/create/tip.png" />
          </Popover>
        </h3>
        {doingTask && <span className="endsin font-OCR text-white">Ends in</span>}
      </div>
      <div className="in_queue flex justify-between">
        <p className="text-deep-green text-xs whitespace-pre-wrap">
          Complete tasks to be{'\n'}eligible for token airdrop.{' '}
        </p>
        {doingTask && <Countdown instant={Date.now() + 24 * 60 * 60 * 1000} />}
      </div>
      <ul className="follow_list flex flex-col gap-y-2 mt-4">
        {follows.map((item) => (
          <li key={item.user} className="follow_list_item flex items-center w-full justify-between px-3 py-3.5">
            <p
              className={classNames('leading-5 font-OCR whitespace-pre-wrap', {
                'text-white': doingTask || airdropUnlocking,
                'text-deep-green': airdropUnlocked,
              })}
            >
              Follow @dogekiller{'\n'}on twitter
            </p>
            <img
              className={classNames('w-5', { 'cursor-pointer': !item.followed, 'opacity-30': airdropUnlocked })}
              src={`/create/icon-${item.followed ? 'followed' : 'outlink-media'}.png`}
            />
          </li>
        ))}
      </ul>
      {airdropUnlocking && (
        <div className="mt-5 airdrop-unlock flex flex-col items-center gap-y-2">
          <div className="flex gap-x-3.5">
            <img className="w-5 object-contain" src="/create/icon-airdrop-lock.png" />
            <Countdown instant={Date.now() + 24 * 60 * 60 * 1000} />
          </div>
          <p className="text-white font-OCR leading-20 text-sm">Wait for your airdrop to unlock.</p>
        </div>
      )}
      {airdropUnlocked && (
        <div className="mt-5 airdrop-unlock flex flex-col items-center gap-y-2">
          <img className="w-5 object-contain" src="/create/icon-airdrop-unlock.png" />
          <p className="text-white font-404px leading-20 text-2xl">2,000,000 WIF</p>
        </div>
      )}
      <Button
        disabled={doingTask || airdropUnlocking}
        className={classNames('uppercase w-full claim_btn h-12 font–404px', {
          'mt-20': doingTask,
          'mt-5': airdropUnlocking || airdropUnlocked,
        })}
      >
        claim
      </Button>
    </div>
  );
}
