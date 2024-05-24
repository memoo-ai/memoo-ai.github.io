/* eslint-disable react/no-unstable-nested-components */
import { FC, ReactNode, useContext, useMemo } from 'react';
import { AirdropContext } from '../airdrop';
import './ido-detail.scss';
import { clipAddress } from '@/utils';

const IDODetail: FC = () => {
  const { stage } = useContext(AirdropContext);

  const params = useMemo(() => {
    if (stage === 'launch') {
      return [
        { key: 'IDO Date', value: '06 Apr 2024' },
        {
          key: 'LP Lock',
          value: 'UNCX',
          formatValue: (value: string) => (
            <div className="flex items-center gap-x-2.5">
              <div className="flex ido_params_token items-center py-1.5 gap-x-1 px-5">
                <img src="/create/token-demo.png" />
                <span className="font-OCR text-white text-sm">{value}</span>
              </div>
              <span className="text-white text-lg font-OCR leading-5">Yes</span>
            </div>
          ),
        },
        { key: 'Liquidity', value: '$21,000' },
        { key: 'FDV', value: '$20,000' },
        { key: '24h Trading Vol', value: '$20,000' },
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
        { key: 'Max Supply', value: '10,000,000,000' },
        {
          key: 'All Time High',
          value: '$20,000',
          formatValue: (value: string): ReactNode => (
            <div className="flex flex-col items-end">
              <span className="text-white text-lg font-OCR leading-5">{value}</span>
              <div className="flex items-center gap-x-2">
                <time className="font-OCR text-xs text-bluish-purple-light">20 Mar 2024</time>
                <span className="font-OCR text-xs text-red">-42.9%</span>
              </div>
            </div>
          ),
        },
        {
          key: 'All Time Low',
          value: '$20,000',
          formatValue: (value: string): ReactNode => (
            <div className="flex flex-col items-end">
              <span className="text-white text-lg font-OCR leading-5">{value}</span>
              <div className="flex items-center gap-x-2">
                <time className="font-OCR text-xs text-bluish-purple-light">20 Mar 2024</time>
                <span className="font-OCR text-xs text-green">+42.9%</span>
              </div>
            </div>
          ),
        },
        { key: 'Holders', value: '12,456' },
      ];
    }
    return [
      { key: 'IDO Date', value: '06 Apr 2024' },
      { key: 'FDV', value: '$20,000' },
      { key: 'Max Supply', value: '10,000,000,000' },
    ];
  }, [stage]);

  const top10Holders = useMemo(() => {
    if (stage === 'launch') {
      return [
        { key: '0x243073639B7189977E5DbA7edE1b5f5D18531418', value: '7.09%' },
        { key: '0x243073639B7189977E5DbA7edE1b5f5D18531428', value: '7.09%' },
        { key: '0x243073639B7189977E5DbA7edE1b5f5D18531438', value: '7.09%' },
        { key: '0x243073639B7189977E5DbA7edE1b5f5D18531448', value: '7.09%' },
        { key: '0x243073639B7189977E5DbA7edE1b5f5D18531458', value: '7.09%' },
        { key: '0x243073639B7189977E5DbA7edE1b5f5D18531468', value: '7.09%' },
      ];
    }
    return [];
  }, [stage]);

  return (
    <div className="ido_detail px-5 pt-9 pb-5">
      <ul className="data_list flex flex-col gap-y-6 w-full">
        {params.map((item) => (
          <li key={item.key} className="flex justify-between">
            <label className="text-bluish-purple-light text-sm font-OCR leading-4 flex items-center gap-x-1.5">
              {item.key}
            </label>
            {item.formatValue ? (
              item.formatValue(item.value)
            ) : (
              <var className="text-white text-lg font-OCR leading-5">{item.value}</var>
            )}
          </li>
        ))}
      </ul>
      <div className="divider h-px w-full bg-bluish-purple my-8" />
      {top10Holders.length > 0 && (
        <div className="top10_holders">
          <h3 className="font-404px text-lg leading-5 text-green">Top 10 Token Holders</h3>
          <ul className="holders_list mt-5 flex flex-col">
            {top10Holders.map((holder, index) => (
              <li key={holder.key} className="flex items-center justify-between">
                <label className="text-sm font-OCR text-white">
                  {index + 1}.{clipAddress(holder.key)}
                </label>
                <var className="text-sm font-OCR text-white">{holder.value}</var>
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
