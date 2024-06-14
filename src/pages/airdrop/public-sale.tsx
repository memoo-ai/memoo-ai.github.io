import { FC, useCallback, useContext, useMemo } from 'react';
import './public-sale.scss';
import { Button, Popover } from 'antd';
import classNames from 'classnames';
import { AirdropContext } from '.';
import { formatDecimals } from '@/utils';

const PublicSale: FC = () => {
  const { idoLaunchedDetail, idoQueueDetail } = useContext(AirdropContext);

  const params = useMemo(
    () => [
      { key: 'Market Cap', value: `$${formatDecimals(idoLaunchedDetail?.marketCap ?? 0)}`, tip: null },
      { key: 'Price', value: `$${formatDecimals(idoLaunchedDetail?.price ?? 0)}`, tip: null },
      { key: 'Total Raised', value: `${idoLaunchedDetail?.totalRaised ?? 'NA/NA'} ETH`, tip: '1' },
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
        <Button className={classNames('mt-5 uppercase w-full pubsale_btn h-12 font–404px', {})} onClick={onConfirm}>
          Buy
        </Button>
      </div>
    </div>
  );
};

PublicSale.displayName = PublicSale.name;

export default PublicSale;
