/* eslint-disable react/no-unstable-nested-components */
import { FC, useMemo } from 'react';
import './profile.scss';

const Profile: FC = () => {
  const params = useMemo(() => {
    return [
      { key: 'Name', value: 'Bad Idea AI' },
      { key: 'Ticker', value: 'BAD' },
      { key: 'Contract Address', value: 'NA' },
      { key: 'LP Contract', value: 'NA' },
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
              { name: 'De.Fi Scanner', icon: '/create/token-demo.png' },
              { name: 'DEX Screener', icon: '/create/token-demo.png' },
              { name: 'Bubblemaps', icon: '/create/token-demo.png' },
              { name: 'GeckoTerminal', icon: '/create/token-demo.png' },
            ].map((token) => (
              <li key={token.name} className="flex items-center gap-x-1.5 h-8">
                <img className="w-5 object-contain" src={token.icon} /> {token.name}
              </li>
            ))}
          </ul>
        ),
      },
    ];
  }, []);

  const socails = useMemo(() => {
    return [
      {
        key: 'Project Website',
        value: '',
        formatValue: (value: string) => (
          <ul className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1">
            {[{ name: 'badidea.ai' }].map((token) => (
              <li key={token.name} className="flex items-center gap-x-1.5 h-8">
                {token.name}
              </li>
            ))}
          </ul>
        ),
      },
      {
        key: 'Project’s\nSocial Account',
        value: '',
        formatValue: (value: string) => (
          <ul className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1">
            {[
              { name: 'BadIdea_Ai', icon: '/create/social-twitter.png' },
              { name: 'BadIdea_Ai', icon: '/create/social-tg.png' },
            ].map((token) => (
              <li key={token.name} className="flex items-center gap-x-1.5 h-8">
                <img className="w-5 object-contain" src={token.icon} /> {token.name}
              </li>
            ))}
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
            {[{ name: 'FuckingBadIdea4770' }, { name: 'Rg7GG...kf9Lj7', icon: '/create/icon-copy.png' }].map(
              (token) => (
                <li key={token.name} className="flex items-center gap-x-1.5 h-8">
                  {token.name} {token.icon && <img className="w-2.5 object-contain" src={token.icon} />}
                </li>
              ),
            )}
          </ul>
        ),
      },
      {
        key: 'Creator’s\nSocial Account',
        value: '',
        formatValue: (value: string) => (
          <ul className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1">
            {[{ name: 'Robots_Luv', icon: '/create/social-twitter.png' }].map((token) => (
              <li key={token.name} className="flex items-center gap-x-1.5 h-8">
                <img className="w-5 object-contain" src={token.icon} /> {token.name}
              </li>
            ))}
          </ul>
        ),
      },
    ];
  }, []);

  return (
    <div className="profile relative pt-20">
      <ul className="relationship_fracture absolute flex gap-x-2.5 top-5 right-5">
        <li>
          <img className="w-10 h-10 object-cover" src="/create/icon-collect.png" />
        </li>
        <li>
          <img className="w-10 h-10 object-cover" src="/public/create/icon-share.png" />
        </li>
        <li>
          <img className="w-10 h-10 object-cover" src="/public/create/icon-more.png" />
        </li>
      </ul>
      <div className="head">
        <h1 className="font-404px text-white leading-7 text-3xl">
          Bad Idea AI <span className="text-green text-base ml-1">BAD</span>
        </h1>
        <time className="mt-2 block font-OCR text-bluish-purple-light text-sm">Created 26 Mar 2024</time>
        <p className="mt-2 font-OCR text-white text-sm leading-5 max-w-2xl">
          {`Bad Idea AI emerges as a daring response to the pervasive influence and potential dominance of AI in our
          lives. It represents a novel blend of Blockchain, AI, and DAOs, conceived as a "Hail Mary" effort to chart a
          collaborative path for humanity and AI. This initiative springs from a deep concern over AI's growing
          footprint, from personal assistants to autonomous vehicles, and a bold ambition to co-create our future with
          AI rather than succumb to its rule.`}
        </p>
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
