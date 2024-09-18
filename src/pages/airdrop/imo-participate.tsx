import { FC, useContext, useMemo, useState } from 'react';
import './imo-participate.scss';
import Countdown from './countdown';
import { Button } from 'antd';
import classNames from 'classnames';
import { AirdropContext } from '.';
import ImoParticipationModal from './imo-participation-modal';
import { formatDecimals } from '@/utils';
import ITooltip from '@/components/ITooltip';
import { useProportion } from '@/hooks/useProportion';
import { useAccount } from '@/hooks/useWeb3';
import message from '@/components/IMessage';
import Wallet from '@/components/SolanaWallet';
const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
const IMOParticipate: FC = () => {
  const { idoActiveDetail, idoQueueDetail, mine, stage } = useContext(AirdropContext);
  const [ended, setEnded] = useState(false);
  const { idoUserBuyLimit, totalSupplyPrice, tokenAllocationIdo } = useProportion();
  console.log('idoActiveDetail?.endsIn:', idoActiveDetail?.endsIn);
  const [isModalOpen, setModalOpen] = useState(false);
  const { address } = useAccount();

  const params = useMemo(
    () => [
      {
        key: 'Price',
        value: `${stage === 'imo' ? tokenSymbol : '$'}${formatDecimals(idoActiveDetail?.price ? idoActiveDetail?.price : 0) ?? 0}`,
        tip: null,
        big: false,
      },
      // { key: 'Price', value: `$${Number(idoActiveDetail?.price).toLocaleString() ?? 0}`, tip: null },
      {
        key: 'Total Raised',
        value: `${idoActiveDetail?.totalRaised === '' ? 0 : (idoActiveDetail?.totalRaised ?? 'NA/NA')} ${tokenSymbol}`,
        tip: `Total IMO raise is always\ncapped at ${totalSupplyPrice * tokenAllocationIdo} ${tokenSymbol}`,
        big: false,
      },
      {
        key: 'Contributed',
        // value: `${idoQueueDetail?.contributed ?? 'NA'}/${idoQueueDetail?.maxContributed ?? 'NA'} ${tokenSymbol}`,
        value: `${totalSupplyPrice * idoUserBuyLimit} ${tokenSymbol}`,
        tip: `Contribution per wallet\nis capped at ${totalSupplyPrice * idoUserBuyLimit} ${tokenSymbol}`,
        big: true,
      },
    ],
    [idoActiveDetail, idoQueueDetail, tokenAllocationIdo, idoUserBuyLimit, totalSupplyPrice],
  );

  const disabled = useMemo(
    () => (idoQueueDetail ? idoQueueDetail?.contributed >= idoQueueDetail?.maxContributed : true),
    [idoQueueDetail],
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
                <span>M</span>
              </div>,
              <div key="seconds">
                <time>{seconds}</time>
                <span>S</span>
              </div>,
            ]}
            instant={(idoActiveDetail?.endsIn ?? 0) * 1000}
            onEnded={(ended) => {
              setEnded(ended);
            }}
          />
          <p className="mt-3 text-white font-OCR leading-5 text-sm">Fair Distribution Policy</p>
          <p className="text-deep-green text-center font-OCR leading-14 text-[11px] whitespace-nowrap">
            Wallet capped at {idoUserBuyLimit * 100}% token supply per address.
          </p>
        </div>
        <ul className="mt-6 params_list flex flex-col gap-y-6 w-full">
          {params.map((item) => (
            <li key={item.key} className="flex justify-between">
              <label className="text-white text-xs font-OCR leading-4 flex items-center gap-x-1.5">
                {item.key}{' '}
                {item.tip && (
                  <ITooltip className="h-[12px]" placement="bottom" title={item.tip} color="#fff" bgColor="#396D93" />
                )}
              </label>
              <var className={`text-white ${item.big ? 'text-2xl' : 'text-lg'} font-OCR leading-5`}>{item.value}</var>
            </li>
          ))}
        </ul>
        {address ? (
          <ImoParticipationModal>
            <Button
              disabled={disabled || ended || mine}
              className={classNames('mt-5 uppercase w-full participate_btn h-12 font–404px', {})}
            >
              participate
            </Button>
          </ImoParticipationModal>
        ) : (
          <Button
            disabled={disabled || ended || mine}
            className={classNames('mt-5 uppercase w-full participate_btn h-12 font–404px', {})}
            onClick={() => message.info('Please connect wallet first.', { key: 'imo-Please connect wallet first.' })}
          >
            participate
          </Button>
        )}
      </div>
    </div>
  );
};

export default IMOParticipate;
