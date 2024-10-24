/* eslint-disable react/no-unstable-nested-components */
import { FC, useContext, useMemo, useRef, useEffect, useState } from 'react';
import './profile.scss';
import { AirdropContext } from '.';
import { clipAddress, extractDomainName, formatTs, handleCopy, popupSharing, isProd } from '@/utils';
import {
  IconCopy,
  IconTwitter,
  IconTelegram,
  IconSolana,
  IconFacebook,
  IconDiscord,
  IconCollect,
  IconMore,
} from '@/components/icons';
import { getToolsUrls } from '@/api/common';
import useFunctions from '@/hooks/useFunctions';

const Profile: FC = () => {
  const { idoQueueDetail, stage } = useContext(AirdropContext);
  const iconRefs = useRef<any>({});
  const [showShare, setShowShare] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [tools, setTools] = useState<any>([]);
  const shareText = 'Discover this meme token on Memoo.';
  const { collection } = useFunctions();

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
        value: idoQueueDetail?.ticker?.toUpperCase() ?? 'NA',
      },
      {
        key: 'Contract Address',
        value: idoQueueDetail?.contractAddress || 'NA',
        formatKey: (key: string) => (
          <label className="col-span-3 text-bluish-purple-light text-sm font-OCR leading-4 flex gap-x-1.5 h-8 items-center">
            {key}
          </label>
        ),
        formatValue: (value: string) =>
          idoQueueDetail?.contractAddress ? (
            <ul
              className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1"
              onClick={() => {
                handleCopy(idoQueueDetail?.contractAddress ? idoQueueDetail?.contractAddress.toUpperCase() : '');
              }}
            >
              {idoQueueDetail?.creatorAddress && (
                <li className="flex items-center gap-x-1.5 h-8">
                  {/* <img className="w-[20px] h-[20px] mr-[5px]" src="/create/vector.png" alt="" /> */}
                  <IconSolana color="#FFF" iconColor="#fff" />
                  {clipAddress(idoQueueDetail?.contractAddress?.toUpperCase() ?? '')}{' '}
                  <a className="cursor-pointer">
                    {/* <img className="w-2.5 object-contain" src="/create/icon-copy.png" /> */}
                    <IconCopy className="object-contain" />
                  </a>
                </li>
              )}
            </ul>
          ) : (
            <var className="col-span-6 text-white text-lg font-OCR ">NA</var>
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
        formatValue: (value: string) =>
          idoQueueDetail?.lpContractAddress ? (
            <ul
              className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1"
              onClick={() => {
                handleCopy(idoQueueDetail?.lpContractAddress ? idoQueueDetail?.lpContractAddress.toUpperCase() : '');
              }}
            >
              {idoQueueDetail?.lpContractAddress && (
                <li className="flex items-center gap-x-1.5 h-8">
                  <IconSolana color="#FFF" iconColor="#fff" />
                  {clipAddress(idoQueueDetail?.lpContractAddress?.toUpperCase() ?? '')}{' '}
                  <a className="cursor-pointer">
                    {/* <img className="w-2.5 object-contain" src="/create/icon-copy.png" /> */}
                    <IconCopy className="object-contain" />
                  </a>
                </li>
              )}
            </ul>
          ) : (
            <var className="col-span-6 text-white text-lg font-OCR ">NA</var>
          ),
      },
      {
        key: 'Tools',
        value: '',
        formatKey: (key: string) => (
          <label className="col-span-3 text-bluish-purple-light text-sm font-OCR leading-4 gap-x-1.5 h-8 flex items-center">
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
              <li
                key={token.name}
                className={`flex items-center gap-x-1.5 h-8 ${stage !== 'in-queue' && stage !== 'imo' ? 'token_list_hover' : ''}`}
              >
                {stage !== 'in-queue' && stage !== 'imo' ? (
                  <a href={token.url} target="_black" className="flex items-center gap-x-1.5 h-8">
                    <img className="w-5 object-contain" src={token.icon} /> {token.name}
                  </a>
                ) : (
                  <p className="flex items-center gap-x-1.5 h-8">
                    <img className="w-5 object-contain" src={token.icon} /> {token.name}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ),
      },
    ];
  }, [idoQueueDetail, tools]);

  const handleExternalLink = (url: string) => {
    if (!url) return;
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(formattedUrl, '_blank');
  };

  const socails = useMemo(() => {
    return [
      {
        key: 'Project Website',
        value: '',
        formatValue: (value: string) => (
          <ul className={`${idoQueueDetail?.website ? 'token_list' : ''} flex flex-wrap col-span-6 gap-y-1.5 gap-x-1`}>
            {idoQueueDetail?.website ? (
              <li className="h-8 cursor-pointer token_list_hover">
                <a
                  className="flex items-center gap-x-1.5"
                  onClick={() => {
                    handleExternalLink(idoQueueDetail?.website);
                  }}
                >
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
                  // href={`https://t.me/${idoQueueDetail?.telegram}`}
                  href={idoQueueDetail?.telegram}
                  target="_blank"
                  className="flex items-center gap-x-1.5"
                >
                  <IconTelegram
                    ref={(ref) => (iconRefs.current['IconTelegram'] = ref)}
                    color="#FFF"
                    hoverColor="#07E993"
                    className="w-[20px]"
                  />{' '}
                  {extractDomainName(idoQueueDetail?.telegram ?? '')}
                </a>
              </li>
            )}
            {idoQueueDetail?.discord && (
              <li
                className="h-8 token_list_hover"
                onMouseOver={() => iconRefs.current['IconDiscord'].setHovered(true)}
                onMouseLeave={() => iconRefs.current['IconDiscord'].setHovered(false)}
              >
                <a href={idoQueueDetail?.discord} target="_blank" className="flex items-center gap-x-1.5">
                  <IconDiscord
                    ref={(ref) => (iconRefs.current['IconDiscord'] = ref)}
                    color="#FFF"
                    hoverColor="#07E993"
                    className="w-[20px]"
                  />{' '}
                  {extractDomainName(idoQueueDetail?.discord ?? '')}
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
        {!isProd() && (
          <li className="profile-share w-[40px] h-[40px] bg-[#252841] rounded-[7px] flex items-center justify-center">
            <div
              onMouseOver={() => iconRefs.current[`IconCollect`].setHovered(true)}
              onMouseLeave={() => iconRefs.current[`IconCollect`].setHovered(false)}
            >
              <IconCollect
                ref={(ref: any) => (iconRefs.current[`IconCollect`] = ref)}
                className="profile-share"
                color="#5D64A2"
                onClick={() => collection(idoQueueDetail?.ticker ?? '', idoQueueDetail?.collectionFlag ?? false)}
              />
            </div>
          </li>
        )}

        <li className="profile-share" onMouseMove={() => setShowShare(true)} onMouseLeave={() => setShowShare(false)}>
          <img className="w-10 h-10 object-cover" src="/create/icon-share.png" />
          {showShare && (
            <div className="profile-share-content pt-2">
              <ul className="content flex items-center justify-center gap-[11px]">
                <a
                  className="rounded-[7px] bg-[#07E993] w-[40px] h-[40px] p-[10px] flex justify-center items-center link-hover"
                  onMouseOver={() => iconRefs.current[`IconTwitter`].setHovered(true)}
                  onMouseLeave={() => iconRefs.current[`IconTwitter`].setHovered(false)}
                  onClick={() =>
                    popupSharing(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        shareText,
                      )}&url=${encodeURIComponent(shareUrl)}`,
                    )
                  }
                >
                  <IconTwitter
                    color="#1F3B4F"
                    hoverColor="#07E993"
                    ref={(ref) => (iconRefs.current[`IconTwitter`] = ref)}
                    className="cursor-pointer "
                  />
                </a>
                <a
                  className="rounded-[7px] bg-[#07E993] w-[40px] h-[40px] p-[10px] flex justify-center items-center link-hover"
                  onMouseOver={() => iconRefs.current[`IconTelegram`].setHovered(true)}
                  onMouseLeave={() => iconRefs.current[`IconTelegram`].setHovered(false)}
                  onClick={() =>
                    popupSharing(
                      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
                        shareText,
                      )}`,
                    )
                  }
                >
                  <IconTelegram
                    color="#1F3B4F"
                    hoverColor="#07E993"
                    ref={(ref) => (iconRefs.current[`IconTelegram`] = ref)}
                    className="cursor-pointer "
                  />
                </a>
                <a
                  className="rounded-[7px] bg-[#07E993] w-[40px] h-[40px] p-[10px] flex justify-center items-center link-hover"
                  onMouseOver={() => iconRefs.current[`IconFacebook`].setHovered(true)}
                  onMouseLeave={() => iconRefs.current[`IconFacebook`].setHovered(false)}
                  onClick={() =>
                    popupSharing(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareUrl,
                      )}&quote=${encodeURIComponent(shareText)}`,
                    )
                  }
                >
                  <IconFacebook
                    color="#1F3B4F"
                    hoverColor="#07E993"
                    ref={(ref) => (iconRefs.current[`IconFacebook`] = ref)}
                    className="cursor-pointer "
                  />
                </a>
              </ul>
            </div>
          )}
        </li>
        {!isProd() && (
          <li className="profile-share" onMouseMove={() => setShowMore(true)} onMouseLeave={() => setShowMore(false)}>
            <li
              className="w-[40px] h-[40px] bg-[#252841] rounded-[7px] flex items-center justify-center"
              onMouseOver={() => iconRefs.current[`IconMore`].setHovered(true)}
              onMouseLeave={() => iconRefs.current[`IconMore`].setHovered(false)}
            >
              <IconMore color="#5D64A2" ref={(ref: any) => (iconRefs.current[`IconMore`] = ref)} />
            </li>

            {showMore && (
              <div className="profile-share-content pt-2">
                <ul className="content flex items-center justify-center gap-[11px] w-[119px] cursor-pointer">
                  <img className="w-[24px] h-[28px]" src="/create/report.png" alt="" />{' '}
                  <span className="font-OCR text-[14px] leading-[17px] text-green">Report</span>
                </ul>
              </div>
            )}
          </li>
        )}
      </ul>
      <div className="head pl-[20px]">
        <h1 className="font-404px text-white leading-7 text-3xl">
          {idoQueueDetail?.tokenName} <span className="text-green text-base ml-1">{idoQueueDetail?.ticker}</span>
        </h1>
        <time className="mt-2 block font-OCR text-bluish-purple-light text-sm">
          Created {formatTs(idoQueueDetail?.createdAt ?? 0)}
        </time>
        <p className="mt-2 font-OCR text-white text-sm max-w-2xl ">{idoQueueDetail?.description}</p>
      </div>
      <div className="content p-[22px]">
        <ul className="basic_list mt-14 flex flex-col gap-y-3">
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
        <div className="soscial_info pt-16">
          <h1 className="font-404px text-lg text-green leading-5">Social Info</h1>
          <ul className="mt-6 flex flex-col gap-y-1.5">
            {socails.map((item) => (
              <li key={item.key} className="grid grid-cols-12">
                {item.formatKey ? (
                  item.formatKey(item.key)
                ) : (
                  <label className="col-span-3 text-bluish-purple-light text-sm font-OCR leading-4 flex h-8 gap-x-1.5 items-center whitespace-pre-wrap">
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
