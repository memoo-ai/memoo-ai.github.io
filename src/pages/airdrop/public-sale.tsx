import { FC, useCallback, useContext, useMemo, useRef } from 'react';
import './public-sale.scss';
import { Button, Popover } from 'antd';
import classNames from 'classnames';
import { AirdropContext } from '.';
import { formatDecimals } from '@/utils';
import Wallet from '@/components/Wallet';
import { useAccount } from 'wagmi';
import { IconLaunchedBtn } from '@/components/icons';

const PublicSale: FC = () => {
  const { idoLaunchedDetail, idoQueueDetail, stage } = useContext(AirdropContext);
  const { address } = useAccount();
  const iconRef = useRef<any>();
  const params = useMemo(
    () => [
      { key: 'Market Cap', value: `$${formatDecimals(idoQueueDetail?.marketCap ?? 0)}`, tip: null },
      { key: 'Price', value: `$${formatDecimals(idoQueueDetail?.price ?? 0)}`, tip: null },
      { key: 'Total Raised', value: `${idoQueueDetail?.totalRaised ?? 'NA/NA'} ETH`, tip: '1' },
      {
        key: 'Contributed',
        value: `${idoQueueDetail?.contributed ?? 'NA'}/${idoQueueDetail?.maxContributed ?? 'NA'} ETH`,
        tip: '1',
      },
    ],
    [idoLaunchedDetail, idoQueueDetail],
  );
  const onConfirm = useCallback(() => {
    // TODO it may be replaced by swap contract later
    window.open('https://app.uniswap.org/', '_blank');
  }, []);

  return (
    <div className="pubsale px-5 pt-9 pb-5">
      <div className="head flex justify-center">
        <img src="/create/img-pubsale.png" />
        <img src="/create/img-pubsale-success.png" />
      </div>
      <div className="content flex flex-col items-center">
        <ul className="mt-6 params_list flex flex-col gap-y-6 w-full">
          {params.map((item) => (
            <li key={item.key} className="flex justify-between">
              <label className="text-white text-xs font-OCR leading-4 flex items-center gap-x-1.5">
                {item.key}{' '}
                {item.tip && (
                  <Popover content={item.tip}>
                    <img src="/create/tip.png" />
                  </Popover>
                )}
              </label>
              <var className="text-white text-lg font-OCR leading-5">{item.value}</var>
            </li>
          ))}
        </ul>

        {address ? (
          <div className="flex gap-[11px] w-full">
            <Button
              className={classNames('mt-5 uppercase flex-1 memoo_button reverse h-12 font–404px', {})}
              onClick={onConfirm}
            >
              Buy
            </Button>
            <Button
              className={classNames(
                'mt-5 uppercase w--[207px] memoo_button reverse h-12 font–404px flex items-center',
                {},
              )}
              onClick={onConfirm}
              onMouseOver={() => iconRef.current?.setHovered(true)}
              onMouseLeave={() => iconRef.current?.setHovered(false)}
            >
              <IconLaunchedBtn ref={iconRef} className="mr-[7px]" hoverColor="#B53BFF" /> CLAIM IMO TOKENS
            </Button>
          </div>
        ) : (
          <Wallet>
            <Button
              className={classNames('mt-5 uppercase w-full memoo_button reverse h-12 font–404px', {})}
              onClick={onConfirm}
            >
              Buy
            </Button>
          </Wallet>
        )}
      </div>
    </div>
  );
};

PublicSale.displayName = PublicSale.name;

export default PublicSale;
