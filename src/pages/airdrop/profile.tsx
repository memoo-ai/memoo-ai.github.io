/* eslint-disable react/no-unstable-nested-components */
import { FC, useContext, useMemo, useRef, useEffect, useState } from 'react';
import './profile.scss';
import { AirdropContext } from '.';
import { clipAddress, extractDomainName, formatTs, handleCopy } from '@/utils';
import { IconCopy, IconTwitter, IconTelegram, IconShare, IconFacebook } from '@/components/icons';
import { getToolsUrls } from '@/api/common';

const Profile: FC = () => {
  const { idoQueueDetail } = useContext(AirdropContext);
  const iconRefs = useRef<any>({});
  const [showShare, setShowShare] = useState(false);
  const [tools, setTools] = useState<any>([]);
  const shareText = 'From The Ultimate Memecoin Infrastructure.';

  const shareUrl = useMemo(() => {
    return `${import.meta.env.VITE_SHARE_URI}airdrop/${idoQueueDetail?.ticker}`;
  }, [idoQueueDetail]);
  useEffect(() => {
    (async () => {
      const dexScreenerUrl = `https://dexscreener.com/solana/${idoQueueDetail?.contractAddress}`;
      const bubbleMapUrl = `https://app.bubblemaps.io/sol/token/${idoQueueDetail?.contractAddress}`;
      const geckoTerminalUrl = `https://www.geckoterminal.com/solana/pools/${idoQueueDetail?.contractAddress}`;
      setTools([dexScreenerUrl, bubbleMapUrl, geckoTerminalUrl]);
      // try {
      //   const { data } = await getToolsUrls();
      //   setTools(data);
      // } catch (error) {
      //   console.error('Error fetching data:', error);
      // }
    })();
  }, [idoQueueDetail]);

  const params = useMemo(() => {
    return [
      { key: 'Name', value: idoQueueDetail?.tokenName },
      {
        key: 'Ticker',
        value: idoQueueDetail?.creatorAddress ?? '',
      },
      {
        key: 'Contract Address',
        value: idoQueueDetail?.contractAddress || 'NA',
        formatKey: (key: string) => (
          <label className="col-span-3 text-bluish-purple-light text-sm font-OCR leading-4 flex gap-x-1.5 h-8 flex items-center">
            {key}
          </label>
        ),
        formatValue: (value: string) => (
          <ul
            className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1 mt-10"
            onClick={() => {
              handleCopy(idoQueueDetail?.contractAddress ? idoQueueDetail?.contractAddress.toUpperCase() : '');
            }}
          >
            {idoQueueDetail?.creatorAddress && (
              <li className="flex items-center gap-x-1.5 h-8">
                <img className="w-[20px] h-[20px] mr-[5px]" src="./create/vector.png" alt="" />
                {clipAddress(idoQueueDetail?.contractAddress?.toUpperCase() ?? '')}{' '}
                <a className="cursor-pointer">
                  {/* <img className="w-2.5 object-contain" src="/create/icon-copy.png" /> */}
                  <IconCopy className="object-contain" />
                </a>
              </li>
            )}
          </ul>
        ),
      },
      {
        key: 'LP Contract',
        value: idoQueueDetail?.lpContractAddress || 'NA',
        formatKey: (key: string) => (
          <label className="col-span-3 text-bluish-purple-light text-sm font-OCR leading-4 flex gap-x-1.5 h-8 flex items-center">
            {key}
          </label>
        ),
        formatValue: (value: string) => (
          <ul
            className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1 mt-10"
            onClick={() => {
              handleCopy(idoQueueDetail?.ticker ? idoQueueDetail?.ticker.toUpperCase() : '');
            }}
          >
            {idoQueueDetail?.creatorAddress && (
              <li className="flex items-center gap-x-1.5 h-8">
                <img className="w-[20px] h-[20px] mr-[5px]" src="./create/vector.png" alt="" />
                {clipAddress(idoQueueDetail?.ticker?.toUpperCase() ?? '')}{' '}
                <a className="cursor-pointer">
                  {/* <img className="w-2.5 object-contain" src="/create/icon-copy.png" /> */}
                  <IconCopy className="object-contain" />
                </a>
              </li>
            )}
          </ul>
        ),
      },
      {
        key: 'Tools',
        value: '',
        formatKey: (key: string) => (
          <label className="col-span-3 text-bluish-purple-light text-sm font-OCR leading-4 flex gap-x-1.5 h-8 flex items-center">
            {key}
          </label>
        ),
        formatValue: (value: string) => (
          // <ul className=" flex flex-wrap col-span-6 gap-y-1.5 gap-x-1">
          <ul className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1">
            {[
              // { name: 'De.Fi Scanner', icon: '/create/icon-tool-defi-scanner.png', url: tools[0]?.toolUrl },
              { name: 'DEX Screener', icon: '/create/icon-tool-dex-screener.png', url: tools[0] },
              { name: 'Bubblemaps', icon: '/create/icon-tool-bubble-maps.png', url: tools[1] },
              { name: 'GeckoTerminal', icon: '/create/icon-tool-gecko-terminal.png', url: tools[2] },
            ].map((token) => (
              <li key={token.name} className="flex items-center gap-x-1.5 h-8 token_list_hover">
                <a href={token.url} target="_black" className="flex items-center gap-x-1.5 h-8">
                  <img className="w-5 object-contain" src={token.icon} /> {token.name}
                </a>
              </li>
            ))}
          </ul>
        ),
      },
    ];
  }, [idoQueueDetail, tools]);

  const socails = useMemo(() => {
    return [
      {
        key: 'Project Website',
        value: '',
        formatValue: (value: string) => (
          <ul className={`${idoQueueDetail?.website ? 'token_list' : ''} flex flex-wrap col-span-6 gap-y-1.5 gap-x-1`}>
            {idoQueueDetail?.website ? (
              <li className="h-8 cursor-pointer token_list_hover">
                <a href={idoQueueDetail?.website} target="_blank" className="flex items-center gap-x-1.5">
                  {extractDomainName(idoQueueDetail?.website ?? '')}
                </a>
              </li>
            ) : (
              <li className="flex items-center gap-x-1.5 h-8">
                {' '}
                <span className="col-span-6 text-white font-OCR leading-5">NA</span>
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
              <li
                className="h-8 token_list_hover"
                onMouseOver={() => iconRefs.current['IconTwitterProject']?.setHovered(true)}
                onMouseLeave={() => iconRefs.current['IconTwitterProject']?.setHovered(false)}
              >
                <a
                  href={`https://x.com/${idoQueueDetail?.twitter}`}
                  target="_blank"
                  className="flex items-center gap-x-1.5"
                >
                  <IconTwitter
                    ref={(ref) => (iconRefs.current['IconTwitterProject'] = ref)}
                    color="#FFF"
                    hoverColor="#07E993"
                    className="w-[20px]"
                  />{' '}
                  {idoQueueDetail?.twitter ?? ''}
                </a>
              </li>
            )}
            {idoQueueDetail?.telegram && (
              <li
                className="h-8 token_list_hover"
                onMouseOver={() => iconRefs.current['IconTelegram'].setHovered(true)}
                onMouseLeave={() => iconRefs.current['IconTelegram'].setHovered(false)}
              >
                <a
                  href={`https://t.me/${idoQueueDetail?.telegram}`}
                  target="_blank"
                  className="flex items-center gap-x-1.5"
                >
                  <IconTelegram
                    ref={(ref) => (iconRefs.current['IconTelegram'] = ref)}
                    color="#FFF"
                    hoverColor="#07E993"
                    className="w-[20px]"
                  />{' '}
                  {idoQueueDetail?.telegram ?? ''}
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
          <ul
            className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1 mt-10"
            onClick={() => {
              handleCopy(idoQueueDetail?.creatorAddress ? idoQueueDetail?.creatorAddress : '');
            }}
          >
            {idoQueueDetail?.creatorAddress && (
              <li className="flex items-center gap-x-1.5 h-8">
                {clipAddress(idoQueueDetail?.creatorAddress ?? '')}{' '}
                <a className="cursor-pointer">
                  {/* <img className="w-2.5 object-contain" src="/create/icon-copy.png" /> */}
                  <IconCopy className="object-contain" />
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
          <ul
            className={`${
              idoQueueDetail?.creatorTwitter ? 'token_list' : ''
            } flex flex-wrap col-span-6 gap-y-1.5 gap-x-1`}
            onMouseOver={() => iconRefs.current['IconTwitterCreator'].setHovered(true)}
            onMouseLeave={() => iconRefs.current['IconTwitterCreator'].setHovered(false)}
          >
            {idoQueueDetail?.creatorTwitter ? (
              <li className="flex items-center gap-x-1.5 h-8 token_list_hover">
                <a
                  href={`https://x.com/${idoQueueDetail?.creatorTwitter}`}
                  target="_blank"
                  className="flex items-center gap-x-1.5"
                >
                  <IconTwitter
                    ref={(ref) => (iconRefs.current['IconTwitterCreator'] = ref)}
                    color="#FFF"
                    hoverColor="#07E993"
                    className="w-[20px]"
                  />{' '}
                  {idoQueueDetail?.creatorTwitter}
                </a>
              </li>
            ) : (
              <li className="flex items-center gap-x-1.5 h-8">
                {' '}
                <span className="col-span-6 text-white font-OCR leading-5">NA</span>
              </li>
            )}
          </ul>
        ),
      },
    ];
  }, [idoQueueDetail]);

  return (
    <div className="profile relative pt-20 pb-[67px]">
      <ul className="relationship_fracture absolute flex gap-x-2.5 top-5 right-5">
        {/* <li>
          <img className="w-10 h-10 object-cover" src="/create/icon-collect.png" />
        </li> */}
        <li className="profile-share" onMouseMove={() => setShowShare(true)} onMouseLeave={() => setShowShare(false)}>
          <img className="w-10 h-10 object-cover" src="/create/icon-share.png" />
          {showShare && (
            <div className="profile-share-content pt-2">
              <ul className="content flex items-center justify-center gap-[11px]">
                <a
                  className="rounded-[7px] bg-[#07E993] w-[40px] h-[40px] p-[10px] flex justify-center items-center"
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    shareText,
                  )}&url=${encodeURIComponent(shareUrl)}`}
                >
                  <IconTwitter color="#1F3B4F" className="cursor-pointer " />
                </a>
                <a
                  className="rounded-[7px] bg-[#07E993] w-[40px] h-[40px] p-[10px] flex justify-center items-center"
                  href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
                    shareText,
                  )}`}
                >
                  <IconTelegram color="#1F3B4F" className="cursor-pointer " />
                </a>
                <a
                  className="rounded-[7px] bg-[#07E993] w-[40px] h-[40px] p-[10px] flex justify-center items-center"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareUrl,
                  )}&quote=${encodeURIComponent(shareText)}`}
                >
                  <IconFacebook color="#1F3B4F" className="cursor-pointer " />
                </a>
              </ul>
            </div>
          )}
        </li>
        {/* <li>
          <img className="w-10 h-10 object-cover" src="/create/icon-more.png" />
        </li> */}
      </ul>
      <div className="head pl-[20px]">
        <h1 className="font-404px text-white leading-7 text-3xl">
          {idoQueueDetail?.tokenName} <span className="text-green text-base ml-1">{idoQueueDetail?.ticker}</span>
        </h1>
        <time className="mt-2 block font-OCR text-bluish-purple-light text-sm">
          Created {formatTs(idoQueueDetail?.createdAt ?? 0)}
        </time>
        <p className="mt-2 font-OCR text-white text-sm leading-5 max-w-2xl">{idoQueueDetail?.description}</p>
      </div>
      <div className="content p-[22px]">
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
