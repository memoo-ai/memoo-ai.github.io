/* eslint-disable no-debugger */
import { useCallback, useContext, useMemo, useState, useEffect } from 'react';
import Countdown from './countdown';
import { TokenCreateStage } from '@/types';
import './airdrop-claim.scss';
import { Button, Popover, Spin } from 'antd';
import message from '@/components/IMessage';
import classNames from 'classnames';
import { AirdropContext } from '../airdrop';
import { follow } from '@/api/airdrop';
import AirdropClaimModal from './airdrop-claim-modal';
import { REQUEST_FOLLOWING_STORAGE } from '@/constants';
import { getTwitterClientId, requestTwitterFollow } from '@/api/token';
import { authorizeTwitter } from '@/utils';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { IconWallet, IconFollow } from '@/components/icons';
import Wallet from '@/components/SolanaWallet';
import { useAccount } from '@/hooks/useWeb3';
import ITooltip from '@/components/ITooltip';
import { useProportion } from '@/hooks/useProportion';
const twitterRedirectUri = import.meta.env.VITE_TWITTER_FOLLOW_AIRDROP_REDIRECT_URI;
let isRequestFollowing = false;
export default function AirdropClaim() {
  const { stage, idoQueueDetail, idoLaunchedDetail, idoActiveDetail, triggerRefresh, ticker, memeUserData } =
    useContext(AirdropContext);
  const [following, setFollowing] = useState(false);
  const [searchParams] = useSearchParams();
  const [confirming, setConfirming] = useState(false);
  const { address } = useAccount();
  const { tokenAllocationAirdrop } = useProportion();

  const follows = useMemo(
    () => [
      { user: idoQueueDetail?.twitter, link: '', followed: idoQueueDetail?.projectTwitterBind },
      { user: idoQueueDetail?.platformTwitter, link: '', followed: idoQueueDetail?.platformTwitterBind },
    ],
    [idoQueueDetail],
  );

  const doingTask = useMemo(() => stage === 'in-queue', [stage]);

  // const airdropUnlocking = useMemo(
  //   () =>
  //     Date.now() < (idoLaunchedDetail?.rewardEndsIn ?? 0) * 1000 &&
  //     (idoLaunchedDetail?.status === 'Launched' || idoLaunchedDetail?.status === 'IDO'),
  //   [idoLaunchedDetail],
  // );

  const airdropUnlocking = useMemo(() => {
    let now = Date.now();
    let rewardEndsIn =
      (stage === 'launch' ? (idoLaunchedDetail?.rewardEndsIn ?? 0) : (idoActiveDetail?.rewardEndsIn ?? 0)) * 1000;
    // &&(idoLaunchedDetail?.status === 'Launched' || idoLaunchedDetail?.status === 'IDO');

    console.log('now:', now);

    console.log(
      'rewardEndsIn:',
      (stage === 'launch' ? (idoLaunchedDetail?.rewardEndsIn ?? 0) : (idoActiveDetail?.rewardEndsIn ?? 0)) * 1000,
    );
    let isUnlocking = now < rewardEndsIn;
    return isUnlocking;
  }, [idoLaunchedDetail, idoActiveDetail, stage]);

  const showAirdropClaim = useMemo(() => {
    const idoStatus = idoLaunchedDetail?.status === 'Launched' || idoLaunchedDetail?.status === 'IDO';
    const taskCompleted = idoQueueDetail?.projectTwitterBind && idoQueueDetail?.platformTwitterBind;
    return idoStatus && taskCompleted;
  }, [idoLaunchedDetail, idoActiveDetail, stage]);

  const airdropUnlocked = useMemo(() => stage === 'launch' || stage === '1st-claim' || stage === '2st-claim', [stage]);

  const airdropCanClaimCount = useMemo(() => {
    if (!idoLaunchedDetail || !memeUserData) return 0;
    const userClaimAirdropCount = new BigNumber(memeUserData?.memeUserAirdropClaimedCount.toString()).dividedBy(
      10 ** 9,
    );
    const result = Number(idoLaunchedDetail?.count) - Number(userClaimAirdropCount);
    console.log('airdropCanClaimCount:', result);
    return result;
  }, [idoLaunchedDetail, memeUserData]);

  const handleFollow = useCallback(async (twitter: string) => {
    try {
      if (!twitter) {
        return message.info('Please refresh and retry');
      }
      const res = await getTwitterClientId();
      let clientId = res.data;
      const followingParams = {
        ticker,
        twitter,
        clientId,
      };
      localStorage.setItem(REQUEST_FOLLOWING_STORAGE, JSON.stringify(followingParams));
      authorizeTwitter(clientId, twitterRedirectUri);

      console.assert(!!twitter, 'twitter is not found');
      setFollowing(true);
      await follow(twitter!);
    } catch (error) {
      console.error(error);
    } finally {
      setFollowing(false);
    }
  }, []);
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      // console.log('handleMessage-event:', event);
      const data = event.data;
      // console.log('Received data from child window:', data);
      // console.log('twitter-code', data.code);
      // debugger;
      let followingParams = null;
      try {
        followingParams = JSON.parse(localStorage.getItem(REQUEST_FOLLOWING_STORAGE) ?? '');
      } catch (e) {}
      if (!followingParams) {
        return;
      }
      if (isRequestFollowing) {
        return;
      }
      if (data.state === 'twitter' && data.code && data.type === 'airdrop' && followingParams) {
        isRequestFollowing = true;
        const { ticker, twitter, clientId } = followingParams;
        const followParams = {
          appClientId: clientId,
          code: data.code,
          codeVerifier: 'challenge',
          grantType: 'authorization_code',
          redirectUri: `${twitterRedirectUri}`,
          refreshToken: '',
          twitter: twitter ?? 'elonmusk',
          ticker: ticker,
        };
        const res = await requestTwitterFollow(followParams);
        console.log('follow res: ', res);
        if (!res.data) {
          message.warning('Failed to follow. Please try again later.');
          return;
        }
        localStorage.removeItem(REQUEST_FOLLOWING_STORAGE);
        isRequestFollowing = false;
        triggerRefresh?.();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const ticker = searchParams.get('ticker');
  //     const code = searchParams.get('code');
  //     const state = searchParams.get('state');
  //     let followingParams = null;
  //     try {
  //       followingParams = JSON.parse(localStorage.getItem(REQUEST_FOLLOWING_STORAGE) ?? '');
  //     } catch (e) {}
  //     if (!followingParams) {
  //       return;
  //     }
  //     if (isRequestFollowing) {
  //       return;
  //     }
  //     if (state === 'twitter' && code && followingParams) {
  //       isRequestFollowing = true;
  //       const { ticker, twitter, clientId } = followingParams;
  //       const followParams = {
  //         appClientId: clientId,
  //         code,
  //         codeVerifier: 'challenge',
  //         grantType: 'authorization_code',
  //         redirectUri: `${twitterRedirectUri}?type=airdrop`,
  //         refreshToken: '',
  //         twitter: twitter ?? 'elonmusk',
  //         ticker: ticker,
  //       };
  //       const res = await requestTwitterFollow(followParams);
  //       console.log('follow res: ', res);
  //       if (!res.data) {
  //         message.warning('Failed to follow. Please try again later.');
  //         return;
  //       }
  //       localStorage.removeItem(REQUEST_FOLLOWING_STORAGE);
  //       isRequestFollowing = false;
  //       triggerRefresh?.();
  //     }
  //     console.log('ticker: ', ticker);
  //   })();
  // }, [searchParams]);
  // const testAirdrop = async () => {
  //   if (airdropClaim) {
  //     await airdropClaim(
  //       '0x9Bf377DD4a6177a67B4b7c05114857eeB4E167b3',
  //       new BigNumber(100),
  //       '0x0000000000000000000000009bf377dd4a6177a67b4b7c05114857eeb4e167b300000000000000000000000000b34b516bbccab8d15fb780664d98bc08150119000000000000000000000000000000000000000000000000000000174876e80000000000000000000000000000000000000000000000000000000000666e5c0b',
  //       '0xcad5c2a88a559912837f1833ff70d6a82b077b66dcc5c932f57075e499b9bf360386219141e36f882011ddbdfca653e24b238352bb7c01905e829902d30506721b',
  //     );
  //   }
  // };

  // const onClaim = useCallback(async () => {
  //   if (!airdropClaim || !idoQueueDetail) return;
  //   try {
  //     setConfirming(true);
  //     await airdropClaim(
  //       idoQueueDetail.contractAddress,
  //       new BigNumber(idoLaunchedDetail?.count ?? 0),
  //       new BigNumber(idoLaunchedDetail?.count ?? 0),
  //       [], // TODO proof, should fetch it from the back-end
  //     );
  //     message.success('Unlock Successful');
  //   } catch (error) {
  //     console.error(error);
  //     message.error('Unlock Failed');
  //   } finally {
  //     setConfirming(false);
  //   }
  // }, [airdropClaim, idoQueueDetail]);

  return (
    <div className="airdrop_claim px-5 pt-9 pb-5">
      <div className="head flex justify-between">
        <h3 className="flex items-center gap-x-2 font-404px text-green text text-lg">
          airdrop{' '}
          <Popover>
            {/* <img src="/create/tip.png" /> */}
            <ITooltip
              title={`${tokenAllocationAirdrop * 100}% of the total token supply is allocated to this feature. Participants are required to complete two simple tasks to be eligible.`}
              color="#fff"
              bgColor="#396D93"
            />
          </Popover>
        </h3>
        {doingTask ? (
          <span className="endsin font-OCR text-white">Ends in</span>
        ) : (
          <span className="endsin font-404px text-white">
            {idoQueueDetail?.platformTwitterBind && idoQueueDetail?.projectTwitterBind ? 'COMPLETED' : 'WITHOUT'}
          </span>
        )}
      </div>
      <div className="in_queue flex justify-between">
        <p className="text-deep-green text-[10px] whitespace-pre-wrap font-OCR leading-[11px]">
          Complete tasks to be{'\n'}eligible for token airdrop.{' '}
        </p>
        {doingTask ? (
          <Countdown
            instant={
              idoQueueDetail?.airdropEndsIn && typeof idoQueueDetail?.airdropEndsIn === 'number'
                ? idoQueueDetail?.airdropEndsIn * 1000
                : 0
            }
          />
        ) : (
          <div />
        )}
      </div>
      <ul className="follow_list flex flex-col gap-y-2 mt-4">
        {follows.map((item, index) => (
          <li key={index} className="follow_list_item flex items-center w-full justify-between px-3 py-3.5">
            <p
              className={classNames('leading-5 font-OCR whitespace-pre-wrap', {
                'text-white': !item.followed && stage === 'in-queue',
                'text-deep-green': item.followed || stage !== 'in-queue' || !address,
              })}
            >
              Follow @{item.user}
              {'\n'}on twitter
            </p>
            {address &&
              //   ? (
              //   <Wallet>
              //     {stage === 'in-queue' && (
              //       <img
              //         onClick={() => (item.followed ? null : handleFollow(item.user ? item.user : ''))}
              //         className={classNames('w-5', {
              //           'cursor-pointer': !item.followed,
              //           'opacity-30': !address,
              //         })}
              //         src={`/create/icon-${item.followed ? 'followed' : 'outlink-media'}.png`}
              //       />
              //     )}
              //   </Wallet>
              // ) :
              stage === 'in-queue' && (
                <IconFollow
                  onClick={() => (item.followed ? null : handleFollow(item.user ? item.user : ''))}
                  className={classNames('w-5', {
                    'cursor-pointer': !item.followed,
                    'opacity-30': item.followed && address,
                  })}
                  hoverColor={item.followed ? '#07E993' : '#fff'}
                />
                // <img

                //   className={classNames('w-5', {
                //     'cursor-pointer': !item.followed,
                //     'opacity-30': item.followed && address,
                //   })}
                //   src={`/create/icon-${item.followed ? 'followed' : 'outlink-media'}.png`}
                // />
              )}
          </li>
        ))}
        {/* <li className="follow_list_item flex items-center w-full justify-between px-3 py-3.5" onClick={testAirdrop} /> */}
      </ul>
      {showAirdropClaim &&
        (airdropUnlocking ? (
          <div className="mt-5 airdrop-unlock flex flex-col items-center gap-y-2">
            <div className="flex gap-x-3.5">
              <img className="w-5 object-contain" src="/create/icon-airdrop-lock.png" />
              <Countdown
                onEnded={(ended) => ended && triggerRefresh?.()}
                instant={
                  (stage === 'launch' ? (idoLaunchedDetail?.rewardEndsIn ?? 0) : (idoActiveDetail?.rewardEndsIn ?? 0)) *
                  1000
                }
              />
            </div>
            <p className="text-white font-OCR leading-20 text-sm">Wait for your airdrop to unlock.</p>
          </div>
        ) : (
          <div className="mt-5 airdrop-unlock flex flex-col items-center gap-y-2">
            <img className="w-5 object-contain" src="/create/icon-airdrop-unlock.png" />
            <p className="text-white font-404px leading-20 text-2xl">
              {Number(airdropCanClaimCount).toLocaleString()} WIF
            </p>
          </div>
        ))}
      {!address && (
        <div className="flex flex-col items-center mt-[29px]">
          <IconWallet className="" />
          <h5 className="font-OCR text-[14px] text-[#fff] line-[20px]">Connect wallet to access</h5>
        </div>
      )}

      <AirdropClaimModal>
        <Button
          disabled={!idoQueueDetail?.claimFlag || airdropCanClaimCount <= 0}
          className={classNames('uppercase w-full claim_btn h-12 font–404px mt-5', {
            'mt-20': doingTask,
            'mt-5': airdropUnlocking || airdropUnlocked,
          })}
          // onClick={onClaim}
        >
          claim
        </Button>
      </AirdropClaimModal>
      <Spin fullscreen spinning={following} />
    </div>
  );
}
