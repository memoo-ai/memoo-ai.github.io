/* eslint-disable react/no-unstable-nested-components */
import { FC, ReactNode, useContext, useMemo } from 'react';
import { AirdropContext } from '../airdrop';
import './ido-detail.scss';
import { clipAddress, formatTs, formatDecimals } from '@/utils';

const IDODetail: FC = () => {
  const { stage, idoQueueDetail, idoLaunchedDetail, idoLaunchedDetailTop10 } = useContext(AirdropContext);

  const params = useMemo(() => {
    if (stage === 'launch') {
      return [
        {
          key: 'IDO Date',
          value: idoQueueDetail?.idoDate ? formatTs(idoQueueDetail?.idoDate ?? 0) : '',
        },
        {
          key: 'LP Lock',
          value: idoLaunchedDetail?.tokenName,
          formatValue: (value: string) => (
            <div className="flex items-center gap-x-2.5">
              <div className="flex ido_params_token items-center py-1.5 gap-x-1 px-5">
                <img src={idoLaunchedDetail?.icon} className="max-w-[27px]" />
                <span className="font-OCR text-white text-sm">{value}</span>
              </div>
              <span className="text-white text-lg font-OCR leading-5">{idoLaunchedDetail?.lpLock ? 'Yes' : 'No'}</span>
            </div>
          ),
        },
        { key: 'Liquidity', value: `$${idoLaunchedDetail?.liquidity ?? 0}` },
        { key: 'FDV', value: `$${idoQueueDetail?.fdv ?? 0}` },
        { key: '24h Trading Vol', value: `$${idoLaunchedDetail?.volume24H ?? 0}` },
        {
          key: '1h',
          value: '+7%',
          formatValue: (value: string): ReactNode => <span className="text-green font-404px">{value}</span>,
        },
        {
          key: '24h',
          value: '+86%',
          formatValue: (value: string): ReactNode => <span className="text-green font-404px">{value}</span>,
        },
        { key: 'Max Supply', value: `$${idoQueueDetail?.totalSupply ?? 0}` },
        {
          key: 'All Time High',
          value: `$${formatDecimals(idoLaunchedDetail?.allTimeHigh ?? 0) ?? 0}`,
          formatValue: (value: string): ReactNode => (
            <div className="flex flex-col items-end">
              <span className="text-white text-lg font-OCR leading-5">{value}</span>
              <div className="flex items-center gap-x-2">
                <time className="font-OCR text-xs text-bluish-purple-light">
                  {formatTs(idoLaunchedDetail?.allTimeHighTime ?? 0)}
                </time>
                <span className="font-OCR text-xs text-red">{idoLaunchedDetail?.allTimeHighTimeIncrease}</span>
              </div>
            </div>
          ),
        },
        {
          key: 'All Time Low',
          value: `$${formatDecimals(idoLaunchedDetail?.allTimeLow ?? 0) ?? 0}`,
          formatValue: (value: string): ReactNode => (
            <div className="flex flex-col items-end">
              <span className="text-white text-lg font-OCR leading-5">{value}</span>
              <div className="flex items-center gap-x-2">
                <time className="font-OCR text-xs text-bluish-purple-light">
                  {formatTs(idoLaunchedDetail?.allTimeLowTime ?? 0)}
                </time>
                <span className="font-OCR text-xs text-green">{idoLaunchedDetail?.allTimeLowIncrease}</span>
              </div>
            </div>
          ),
        },
        { key: 'Holders', value: idoLaunchedDetail?.holders ?? 0 },
      ];
    }
    return [
      { key: 'IDO Date', value: formatTs(idoQueueDetail?.idoDate ?? 0) },
      { key: 'FDV', value: `$${Number(idoQueueDetail?.fdv ?? 0).toLocaleString()}` },
      { key: 'Max Supply', value: `$${Number(idoQueueDetail?.totalSupply ?? 0).toLocaleString()}` },
    ];
  }, [stage, idoQueueDetail, idoLaunchedDetail]);

  return (
    <div className="ido_detail flex-auto px-5 pt-9 pb-5">
      <ul className="data_list flex flex-col gap-y-6 w-full">
        {params.map((item) => (
          <li key={item.key} className="flex justify-between">
            <label className="text-bluish-purple-light text-sm font-OCR leading-4 flex items-center gap-x-1.5">
              {item.key}
            </label>
            {item.formatValue ? (
              item.formatValue(item.value ?? '')
            ) : (
              <var className="text-white text-lg font-OCR leading-5">{item.value}</var>
            )}
          </li>
        ))}
      </ul>
      <div className="divider h-px w-full bg-bluish-purple my-8" />
      {idoLaunchedDetailTop10.length > 0 && (
        <div className="top10_holders">
          <h3 className="font-404px text-lg leading-5 text-green">Top 10 Token Holders</h3>
          <ul className="holders_list mt-5 flex flex-col">
            {idoLaunchedDetailTop10.map((holder, index) => (
              <li key={holder.address} className="flex items-center justify-between">
                <label className="text-sm font-OCR text-white">
                  {index + 1}.{clipAddress(holder.address)}
                </label>
                <var className="text-sm font-OCR text-white">{holder.proportion}</var>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

IDODetail.displayName = IDODetail.name;

export default IDODetail;
