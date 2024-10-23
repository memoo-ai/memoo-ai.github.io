import { FC, useCallback, useContext, useMemo, useRef } from 'react';
import './public-sale.scss';
import { Button, Popover } from 'antd';
import classNames from 'classnames';
import { AirdropContext } from '.';
import { formatDecimals, formatRatioToPercentage } from '@/utils';
import Wallet from '@/components/Wallet';
// import { useAccount } from 'wagmi';
import { useAccount } from '@/hooks/useWeb3';
import { IconLaunchedBtn } from '@/components/icons';
import ClaimImoTokensModal from './claim-imo-tokens-modal';
import ITooltip from '@/components/ITooltip';
import { useProportion } from '@/hooks/useProportion';
import IProgress from '@/components/IProgress';

const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
const PublicSale: FC = () => {
  const { idoLaunchedDetail, idoQueueDetail, stage, memeConfig, userCanClaimCount, mine } = useContext(AirdropContext);
  const { address } = useAccount();
  const iconRef = useRef<any>();
  const { totalSupplyPrice, tokenAllocationIdo, idoUserBuyLimit } = useProportion();
  const params = useMemo(
    () => [
      {
        key: 'Market Cap',
        value: `$${formatDecimals(idoQueueDetail?.marketCap ?? 0)}`,
        tip: null,
        big: false,
        progress: null,
      },

      {
        key: 'Price per token',
        value: `${formatDecimals(idoQueueDetail?.price ? idoQueueDetail?.price : 0) ?? 0} ${stage === 'imo' ? tokenSymbol : ''}`,
        tip: null,
        big: false,
        progress: null,
      },

      {
        key: 'Total Raised',
        value: `${idoQueueDetail?.totalRaised ?? 'NA/NA'} ${tokenSymbol}`,
        tip: `Total IMO raise is always\ncapped at ${totalSupplyPrice * tokenAllocationIdo} ${tokenSymbol}`,
        big: false,
        progress: formatRatioToPercentage(
          idoQueueDetail?.totalRaisedNumerator ?? 0,
          idoQueueDetail?.totalRaisedDenominator ?? 0,
        ),
      },
      {
        key: 'Contributed',
        // value: `${idoQueueDetail?.contributed ?? 'NA'}/${idoQueueDetail?.maxContributed ?? 'NA'} ${tokenSymbol}`,
        // value: `${totalSupplyPrice * idoUserBuyLimit} ${tokenSymbol}`,
        value: `${idoQueueDetail?.contributed} ${tokenSymbol}`,
        // tip: `Contributed per wallet\nis capped at ${Number(totalSupplyPrice * idoUserBuyLimit).toFixed(3)} ${tokenSymbol}`,
        tip: `Your contributions to the IMO. Max supply per wallet capped at ${idoUserBuyLimit * 100}% (~${Number(totalSupplyPrice * idoUserBuyLimit).toFixed(3)} SOL)`,
        big: true,
        progress: null,
      },
    ],
    [idoLaunchedDetail, idoQueueDetail, totalSupplyPrice, idoUserBuyLimit, tokenAllocationIdo],
  );

  const canClaim = useMemo(() => {
    if (!address || !userCanClaimCount) return false;
    return address && userCanClaimCount && userCanClaimCount > 0;
  }, [idoLaunchedDetail, idoQueueDetail, address]);
  const onConfirm = useCallback(() => {
    // TODO it may be replaced by swap contract later
    // window.open('https://app.uniswap.org/', '_blank');
    const mintAddress = memeConfig?.mintTokenAddress ?? idoQueueDetail?.contractAddress;
    window.open(`https://raydium.io/swap/?inputMint=sol&outputMint=${mintAddress}`, '_blank');
  }, []);

  return (
    <div className="pubsale px-5 pt-9 pb-5">
      <div className="head flex justify-center">
        {canClaim ? (
          <img className="w-[220px]" src="/create/img-pubsale-success.png" />
        ) : (
          <img className="w-[220px]" src="/create/img-pubsale.png" />
        )}
      </div>
      <div className="content flex flex-col items-center">
        <ul className="mt-6 params_list flex flex-col gap-y-6 w-full">
          {params.map((item) => (
            <li key={item.key} className="flex justify-between">
              <label className="text-white text-xs font-OCR leading-4 flex items-center gap-x-1.5">
                {item.key}{' '}
                {item.tip && (
                  <ITooltip className="h-[12px] " placement="bottom" title={item.tip} color="#fff" bgColor="#396D93" />
                )}
              </label>
              <div>
                <var className={`text-white ${item.big ? 'text-2xl' : 'text-lg'} font-OCR leading-5`}>{item.value}</var>
                {item.progress && <IProgress className="other_progress" percent={item.progress} />}
              </div>
            </li>
          ))}
        </ul>

        {/* {address && idoQueueDetail?.isParticipateImo ? ( */}
        {canClaim && !mine ? (
          <div className="flex gap-[11px] w-full">
            <Button
              className={classNames('mt-5 uppercase flex-1 memoo_button reverse h-12 font–404px', {})}
              onClick={onConfirm}
            >
              Buy
            </Button>
            <ClaimImoTokensModal>
              <Button
                className={classNames(
                  'mt-5 uppercase w--[207px] memoo_button reverse h-12 font–404px flex items-center',
                  {},
                )}
                onMouseOver={() => iconRef.current?.setHovered(true)}
                onMouseLeave={() => iconRef.current?.setHovered(false)}
                // disabled={!idoQueueDetail?.claimImoFlag}
              >
                <IconLaunchedBtn ref={iconRef} className="mr-[7px]" hoverColor="#B53BFF" /> CLAIM IMO TOKENS
              </Button>
            </ClaimImoTokensModal>
          </div>
        ) : (
          <div className="w-full">
            <Wallet>
              <Button
                className={classNames('mt-5 uppercase w-full memoo_button reverse h-12 font–404px', {})}
                onClick={onConfirm}
              >
                Buy
              </Button>
            </Wallet>
          </div>
        )}
      </div>
    </div>
  );
};

PublicSale.displayName = PublicSale.name;

export default PublicSale;
