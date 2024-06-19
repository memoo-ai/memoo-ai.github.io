/* eslint-disable react/no-unstable-nested-components */
import { FC, useState, useMemo, useContext, useRef } from 'react';
import './profile-content.scss';
import { clipAddress, extractDomainName, formatTs, handleCopy } from '@/utils';
import { IconCopy, IconTwitter, IconTip, IconMore } from '@/components/icons';
import { ProfileContext } from './profile';

const ProfileContent: FC = () => {
  const { profileDetail } = useContext(ProfileContext);
  const iconRefs = useRef<any>({});
  const params = useMemo(() => {
    return [
      {
        key: 'ID',
        value: profileDetail?.id,
        formatValue: (value: string) => (
          <ul
            className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1 cursor-pointer"
            onClick={() => {
              handleCopy(profileDetail?.id ? profileDetail?.id : '');
            }}
          >
            {profileDetail?.id && (
              <li className="token_list flex flex-wrap col-span-6 gap-y-1.5 gap-x-1">
                {profileDetail?.id ?? ''} <IconCopy className="w-[20px]" />
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
            {profileDetail?.twitter && (
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
                  {profileDetail?.website}
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
    <div className="profile-content relative pt-20 ">
      <ul className="relationship_fracture absolute flex gap-x-2.5 top-5 right-5">
        {/* <li>
          <img className="w-10 h-10 object-cover" src="/create/icon-collect.png" />
        </li> */}
        <li>
          <img className="w-10 h-10 object-cover" src="/create/icon-share.png" />
        </li>
        <li className="w-[40px] h-[40px] rounded-[7px] flex items-center justify-center bg-[#252841]">
          <IconMore color="#5D64A2" />
        </li>
      </ul>
      <div className="head">
        <h1 className="font-404px text-white leading-7 text-3xl">
          tokenName <span className="text-green text-base ml-1">profileDetail?.ticker</span>
        </h1>
        <time className="mt-2 block font-OCR text-bluish-purple-light text-sm">Joined {0}</time>
        <p className="mt-2 font-OCR text-white text-sm leading-5 max-w-2xl">profileDetail?.description</p>
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
                item.formatValue(item.value)
              ) : (
                <var className="col-span-6 text-white text-lg font-OCR leading-5">{item.value}</var>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-16">
          <h1 className="font-404px text-lg text-green leading-5 flex">
            COLLECTIVE STATS <IconTip className="pl-[10px]" />
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
