/* eslint-disable react/no-unstable-nested-components */
import { FC, useContext, useMemo } from 'react';
import './profile.scss';
import { AirdropContext } from '.';
import { clipAddress, extractDomainName, formatTs } from '@/utils';

const Profile: FC = () => {
  const { idoQueueDetail } = useContext(AirdropContext);

  const params = useMemo(() => {
    return [
      { key: 'Name', value: idoQueueDetail?.tokenName },
      { key: 'Ticker', value: idoQueueDetail?.ticker },
      { key: 'Contract Address', value: idoQueueDetail?.contractAddress || 'NA' },
      { key: 'LP Contract', value: idoQueueDetail?.lpContractAddress || 'NA' },
      {
        key: 'Tools',
        value: '',
        formatKey: (key: string) => (
          <label className="col-span-3 text-bluish-purple-light text-sm font-OCR leading-4 flex gap-x-1.5 h-8 flex items-center">
            {key}
          </label>
        ),
        formatValue: (value: string) => (
          <ul className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1">
            {[
              { name: 'De.Fi Scanner', icon: '/create/icon-tool-defi-scanner.png' },
              { name: 'DEX Screener', icon: '/create/icon-tool-dex-screener.png' },
              { name: 'Bubblemaps', icon: '/create/icon-tool-bubble-maps.png' },
              { name: 'GeckoTerminal', icon: '/create/icon-tool-gecko-terminal.png' },
            ].map((token) => (
              <li key={token.name} className="flex items-center gap-x-1.5 h-8">
                <img className="w-5 object-contain" src={token.icon} /> {token.name}
              </li>
            ))}
          </ul>
        ),
      },
    ];
  }, [idoQueueDetail]);

  const socails = useMemo(() => {
    return [
      {
        key: 'Project Website',
        value: '',
        formatValue: (value: string) => (
          <ul className={`${idoQueueDetail?.website ? 'token_list' : ''}flex flex-wrap col-span-6 gap-y-1.5 gap-x-1`}>
            {idoQueueDetail?.website && (
              <li className="h-8 cursor-pointer">
                <a href={idoQueueDetail?.website} target="_blank" className="flex items-center gap-x-1.5">
                  {extractDomainName(idoQueueDetail?.website ?? '')}
                </a>
              </li>
            )}
          </ul>
        ),
      },
      {
        key: 'Project’s\nSocial Account',
        value: '',
        formatValue: (value: string) => (
          <ul className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1">
            {idoQueueDetail?.twitter && (
              <li className="h-8">
                <a
                  href={`https://x.com/${idoQueueDetail?.twitter}`}
                  target="_blank"
                  className="flex items-center gap-x-1.5"
                >
                  <img className="w-5 object-contain" src="/create/social-twitter.png" />{' '}
                  {idoQueueDetail?.twitter ?? ''}
                </a>
              </li>
            )}
            {idoQueueDetail?.telegram && (
              <li className="h-8">
                <a
                  href={`https://t.me/${idoQueueDetail?.telegram}`}
                  target="_blank"
                  className="flex items-center gap-x-1.5"
                >
                  <img className="w-5 object-contain" src="/create/social-tg.png" /> {idoQueueDetail?.telegram ?? ''}
                </a>
              </li>
            )}
          </ul>
        ),
      },
      {
        key: 'Created By',
        value: '',
        formatKey: (key: string) => (
          <label className="col-span-3 text-bluish-purple-light text-sm font-OCR leading-4 flex gap-x-1.5 h-8 flex items-center mt-10">
            {key}
          </label>
        ),
        formatValue: (value: string) => (
          <ul className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1 mt-10">
            {idoQueueDetail?.creatorAddress && (
              <li className="flex items-center gap-x-1.5 h-8">
                {clipAddress(idoQueueDetail?.creatorAddress ?? '')}{' '}
                <a className="cursor-pointer">
                  <img className="w-2.5 object-contain" src="/create/icon-copy.png" />
                </a>
              </li>
            )}
          </ul>
        ),
      },
      {
        key: 'Creator’s\nSocial Account',
        value: '',
        formatValue: (value: string) => (
          <ul className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1">
            {idoQueueDetail?.creatorTwitter && (
              <li className="flex items-center gap-x-1.5 h-8">
                <a
                  href={`https://x.com/${idoQueueDetail?.creatorTwitter}`}
                  target="_blank"
                  className="flex items-center gap-x-1.5"
                >
                  <img className="w-5 object-contain" src="/create/social-twitter.png" />{' '}
                  {idoQueueDetail?.creatorTwitter}
                </a>
              </li>
            )}
          </ul>
        ),
      },
    ];
  }, [idoQueueDetail]);

  return (
    <div className="profile relative pt-20">
      <ul className="relationship_fracture absolute flex gap-x-2.5 top-5 right-5">
        <li>
          <img className="w-10 h-10 object-cover" src="/create/icon-collect.png" />
        </li>
        <li>
          <img className="w-10 h-10 object-cover" src="/create/icon-share.png" />
        </li>
        <li>
          <img className="w-10 h-10 object-cover" src="/create/icon-more.png" />
        </li>
      </ul>
      <div className="head">
        <h1 className="font-404px text-white leading-7 text-3xl">
          {idoQueueDetail?.tokenName} <span className="text-green text-base ml-1">{idoQueueDetail?.ticker}</span>
        </h1>
        <time className="mt-2 block font-OCR text-bluish-purple-light text-sm">
          Created {formatTs(idoQueueDetail?.createdAt ?? 0)}
        </time>
        <p className="mt-2 font-OCR text-white text-sm leading-5 max-w-2xl">{idoQueueDetail?.description}</p>
      </div>
      <div className="content">
        <ul className="basic_list mt-14 flex flex-col gap-y-6">
          {params.map((item) => (
            <li key={item.key} className="grid grid-cols-12">
              {item.formatKey ? (
                item.formatKey(item.key)
              ) : (
                <label className="col-span-3 text-bluish-purple-light text-sm font-OCR leading-4 flex items-center gap-x-1.5">
                  {item.key}
                </label>
              )}
              {item.formatValue ? (
                item.formatValue(item.value)
              ) : (
                <var className="col-span-6 text-white text-lg font-OCR leading-5">{item.value}</var>
              )}
            </li>
          ))}
        </ul>
        <div className="soscial_info mt-16">
          <h1 className="font-404px text-lg text-green leading-5">Social Info</h1>
          <ul className="mt-6 flex flex-col gap-y-1.5">
            {socails.map((item) => (
              <li key={item.key} className="grid grid-cols-12">
                {item.formatKey ? (
                  item.formatKey(item.key)
                ) : (
                  <label className="col-span-3 text-bluish-purple-light text-sm font-OCR leading-4 flex h-8 gap-x-1.5 flex items-center whitespace-pre-wrap">
                    {item.key}
                  </label>
                )}
                {item.formatValue ? (
                  item.formatValue(item.value)
                ) : (
                  <var className="col-span-6 text-white text-lg font-OCR leading-5">{item.value}</var>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

Profile.displayName = Profile.name;

export default Profile;
