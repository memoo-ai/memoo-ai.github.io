import { useState, FC, useMemo, useContext } from 'react';
import './not-created.scss';
import { Button } from 'antd';
import { IconTip, IconTranspond } from '@/components/icons';
import { clipAddress, formatTs, formatDecimals } from '@/utils';
import { ProfileContext } from './profile';
import { useNavigate } from 'react-router-dom';

const NotCreated: FC = () => {
  const { profileDetail } = useContext(ProfileContext);
  const navigate = useNavigate();

  return (
    <div className="not-created flex flex-col items-center justify-center">
      <p className="whitespace-pre-wrap font-404px text-[18px] leading-[18px] text-green">
        {/* This account has not created any meme tokens. */}
        This account has not LAUNCHED any meme tokens
      </p>
      <img className="mt-[31px] mb-[54px]" src="/dashboard/sadfish.png" alt="" />
      <p className="whitespace-pre-wrap font-OCR text-[14px] leading-[18px] text-white">
        Discover fresh catches at MEMOO Launchpad.
      </p>
      <Button className="memoo_button w-[227px] h-[50px] mt-[28px]" onClick={() => navigate('/')}>
        GO TO LAUNCHPAD
      </Button>
    </div>
  );
};

NotCreated.displayName = NotCreated.name;

export default NotCreated;
