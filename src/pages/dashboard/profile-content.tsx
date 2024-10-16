/* eslint-disable react/no-unstable-nested-components */
import { FC, useState, useMemo, useContext, useRef } from 'react';
import './profile-content.scss';
import { clipAddress, extractDomainName, formatTs, handleCopy, popupSharing } from '@/utils';
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
import { ProfileContext } from './profile';
import ITooltip from '@/components/ITooltip';

const shareText = 'Discover this meme token on Memoo.';
const ProfileContent: FC = () => {
  const { profileDetail, address } = useContext(ProfileContext);
  const iconRefs = useRef<any>({});
  const [showShare, setShowShare] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const shareUrl = useMemo(() => {
    return `https://${import.meta.env.VITE_SHARE_URI}profile/${address}`;
  }, [address]);
  const params = useMemo(() => {
    return [
      {
        key: 'ID',
        value: profileDetail?.address,
        formatValue: (value: string) => (
          <ul
            className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1 cursor-pointer"
            onClick={() => {
              handleCopy(profileDetail?.address ? profileDetail?.address : '');
            }}
          >
            {profileDetail?.address && (
              <li className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1">
                {clipAddress(profileDetail?.address ?? '')} <IconCopy className="w-[20px]" />
              </li>
            )}
          </ul>
        ),
      },
      {
        key: 'Twitter',
        value: '',
        formatValue: (value: string) => (
          <ul
            className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1"
            onMouseOver={() => iconRefs.current['IconTwitter'].setHovered(true)}
            onMouseLeave={() => iconRefs.current['IconTwitter'].setHovered(false)}
          >
            {profileDetail?.twitter ? (
              <li className="h-8 token_list_hover">
                <a
                  href={`https://x.com/${profileDetail?.twitter}`}
                  target="_blank"
                  className="flex items-center gap-x-1.5 "
                >
                  <IconTwitter
                    ref={(ref) => (iconRefs.current['IconTwitter'] = ref)}
                    color="#FFF"
                    hoverColor="#07E993"
                    className="w-[20px]"
                  />{' '}
                  {profileDetail?.twitter ?? ''}
                </a>
              </li>
            ) : (
              <var className="col-span-6 text-white text-lg font-OCR ">NA</var>
            )}
          </ul>
        ),
      },
      {
        key: 'Website',
        value: '',
        formatValue: (value: string) => (
          <ul className={`${profileDetail?.website ? 'token_list' : ''} flex flex-wrap col-span-6 gap-y-1.5 gap-x-1`}>
            {profileDetail?.website && (
              <li className="h-8 cursor-pointer token_list_hover">
                <a href={profileDetail?.website} target="_blank" className="flex items-center gap-x-1.5">
                  {extractDomainName(profileDetail?.website)}
                </a>
              </li>
            )}
          </ul>
        ),
      },
    ];
  }, [profileDetail]);

  const collectiveStats = useMemo(() => {
    return [
      {
        key: 'Tokens Created',
        value: profileDetail?.tokensCreated,
        formatValue: (value: string) => (
          <ul
            className={`${
              profileDetail?.tokensCreated ? 'token_list' : ''
            }flex flex-wrap col-span-6 gap-y-1.5 gap-x-1 text-[#FFFFFF] font-OCR`}
          >
            {profileDetail?.tokensCreated && <li className="h-8 cursor-pointer">{profileDetail?.tokensCreated}</li>}
          </ul>
        ),
      },
      {
        key: 'Collective MCap',
        value: profileDetail?.collectiveMCap,
        formatValue: (value: string) => (
          <ul className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1 text-[#FFFFFF] font-OCR">
            ${profileDetail?.collectiveMCap}
          </ul>
        ),
      },
      {
        key: 'Collective ATH MCap',
        value: profileDetail?.collectiveATHMCap,
        formatValue: (value: string) => (
          <ul
            className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1 text-[#FFFFFF] font-OCR"
            onClick={() => {
              handleCopy(profileDetail?.collectiveATHMCap ? profileDetail?.collectiveATHMCap : '');
            }}
          >
            ${profileDetail?.collectiveATHMCap}
          </ul>
        ),
      },
      {
        key: 'Total holders',
        value: '',
        formatValue: (value: string) => (
          <ul className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1 text-[#FFFFFF] font-OCR">
            {profileDetail?.totalHolders}
          </ul>
        ),
      },
      {
        key: 'Total Holders Growth',
        value: profileDetail?.totalHoldersGrowth,
        formatValue: (value: string) => (
          <ul className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1 text-[#FE6D6D] font-OCR">
            {profileDetail?.totalHoldersGrowth}
          </ul>
        ),
      },
    ];
  }, [profileDetail]);

  return (
    <div className="profile-content relative pt-20 pb-[70px]">
      <ul className="relationship_fracture absolute flex gap-x-2.5 top-5 right-5">
        {/* <li className="profile-share w-[40px] h-[40px] bg-[#252841] rounded-[7px] flex items-center justify-center">
          <div
            onMouseOver={() => iconRefs.current[`IconCollect`].setHovered(true)}
            onMouseLeave={() => iconRefs.current[`IconCollect`].setHovered(false)}
          >
            <IconCollect
              ref={(ref: any) => (iconRefs.current[`IconCollect`] = ref)}
              className="profile-share"
              color="#5D64A2"
              hoverColor="#07E993"
              onClick={() => collection(idoQueueDetail?.ticker ?? '', idoQueueDetail?.isCollected ?? false)}
            />
          </div>
        </li> */}
        <li className="profile-share" onMouseMove={() => setShowShare(true)} onMouseLeave={() => setShowShare(false)}>
          <img className="w-10 h-10 object-cover" src="/create/icon-share.png" />
          {showShare && (
            <div className="profile-share-content pt-2">
              <ul className="content flex items-center justify-center gap-[11px]">
                <a
                  className="rounded-[7px] bg-[#07E993] w-[40px] h-[40px] p-[10px] flex justify-center items-center link-hover"
                  onMouseOver={() => iconRefs.current[`IconTwitter-share`].setHovered(true)}
                  onMouseLeave={() => iconRefs.current[`IconTwitter-share`].setHovered(false)}
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
                    ref={(ref) => (iconRefs.current[`IconTwitter-share`] = ref)}
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
        {/* <li className="profile-share" onMouseMove={() => setShowMore(true)} onMouseLeave={() => setShowMore(false)}>
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
        </li> */}
      </ul>
      <div className="head">
        <h1 className="font-404px text-white leading-7 text-3xl">
          {profileDetail?.userName ? profileDetail?.userName : 'UNNAMED'}{' '}
        </h1>
        <time className="mt-2 block font-OCR text-bluish-purple-light text-sm">{profileDetail?.createdAt}</time>
        <p className="mt-2 font-OCR text-white text-sm leading-5 max-w-2xl min-h-[54px]">{profileDetail?.userBio}</p>
      </div>
      <div className="content">
        <ul className="basic_list mt-14 flex flex-col gap-y-6">
          {params.map((item) => (
            <li key={item.key} className="grid grid-cols-12">
              {/* {item.formatKey ? (
                item.formatKey(item.key)
              ) : (
                <label className="col-span-3 text-bluish-purple-light text-sm font-OCR leading-4 flex items-center gap-x-1.5">
                  {item.key}
                </label>
              )} */}
              <label className="col-span-3 text-bluish-purple-light text-sm font-OCR leading-4 flex items-center gap-x-1.5">
                {item.key}
              </label>
              {item.formatValue ? (
                item.formatValue(item.value ?? '')
              ) : (
                <var className="col-span-6 text-white text-lg font-OCR leading-5">{item.value}</var>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-16">
          <h1 className="font-404px text-lg text-green leading-5 flex items-center">
            COLLECTIVE STATS{' '}
            <ITooltip
              className="ml-[10px] w-[12px] h-[12px]"
              placement="right"
              title={`During the pre launch stages of the meme tokens Nemoo Score tracks Social Info, Community SizeCommunity Activity, Top Up & Creator Activity.
After the launch of the meme token, Memoo Score additionallv tracks Total Raised- Market Cap Liquidity, Holders, Twitter Score & 24H Trading Volume.
It is then aggregated to a score out of 100.`}
              color="#fff"
              bgColor="#4A5082"
            />
          </h1>
          <ul className="mt-6 flex flex-col gap-y-1.5">
            {collectiveStats.map((item) => (
              <li key={item.key} className="grid grid-cols-12">
                {/* {item.formatKey ? (
                  item.formatKey(item.key)
                ) : (
                  <label className="col-span-3 text-bluish-purple-light text-sm font-OCR leading-4 flex h-8 gap-x-1.5 flex items-center whitespace-pre-wrap">
                    {item.key}
                  </label>
                )} */}
                <label className="col-span-3 text-bluish-purple-light text-sm font-OCR leading-4 flex h-8 gap-x-1.5 flex items-center whitespace-pre-wrap">
                  {item.key}
                </label>
                {/* {item.formatValue ? (
                  item.formatValue(item.value)
                ) : (
                  <var className="col-span-6 text-white text-lg font-OCR leading-5">{item.value}</var>
                )} */}
                <var className="col-span-6 text-white text-lg font-OCR leading-5">{item.value}</var>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ProfileContent.displayName = ProfileContent.name;

export default ProfileContent;
