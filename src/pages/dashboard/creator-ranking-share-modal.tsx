import React, { useState, Children, cloneElement, isValidElement, useEffect, useCallback, useRef } from 'react';

import './creator-ranking-share-modal.scss';
import { Modal, Button } from 'antd';
import message from '@/components/IMessage';
import {
  IconTwitter,
  IconClose,
  IconMemoo,
  IconTelegram,
  IconFacebook,
  IconDiscord,
  IconDownload,
  IconMore,
} from '@/components/icons';
import { getIDOLaunchedDetail } from '@/api/airdrop';
import { getTokenDetail } from '@/api/token';
import { useManageContract } from '@/hooks/useManageContract';
import { useSign } from '@/hooks/useEthers';
import { myAirdropDetail } from '@/api/airdrop';
import BigNumber from 'bignumber.js';
import * as htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';

const CreatorRankingShareModal = ({ children, ticker }: any) => {
  const [open, setOpen] = useState(false);
  const [idoLaunchedDetail, setIdoLaunchedDetail] = useState<any>(null);
  const { airdropClaim } = useManageContract();
  const [confirming, setConfirming] = useState(false);
  const { getSign } = useSign();
  const ref = useRef<HTMLDivElement>(null);

  const downloadImg = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, {
      cacheBust: false,
      height: 600,
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);
  useEffect(() => {
    const data = getIDOLaunchedDetail(ticker);
    setIdoLaunchedDetail(data);
  }, [ticker]);

  const onConfirm = useCallback(async () => {
    if (!airdropClaim || !idoLaunchedDetail) return;
    try {
      setConfirming(true);
      // TODO
      // setOpen(false);
      // message.success('Claim Successful');
    } catch (error) {
      console.error(error);
      message.error('Claim Failed');
    } finally {
      setConfirming(false);
    }
  }, [airdropClaim, idoLaunchedDetail]);
  return (
    <div>
      <Modal
        title=""
        open={open}
        onOk={() => {}}
        onCancel={() => {
          setOpen(false);
        }}
        width={604}
        destroyOnClose
        className="creator-ranking-share-modal"
        footer={null}
        closeIcon={<IconClose className="close" />}
      >
        <div className="creator-ranking-share-modal-content mt-[42px]" ref={ref}>
          <div className=" flex items-center justify-between">
            <div className="flex items-center">
              <img src="/logo.svg" alt="" /> <IconMemoo className="ml-[5px]" />
            </div>
            <p className="text-[#fff] text-[14px] font-OCR">memoo.ai</p>
          </div>
          <div className=" flex items-center justify-center flex-col">
            <h3 className="text-[#fff] text-[24px] font-404px text-center">
              DOGLOVER4476
              <br /> IS A MEME SUPASTAR
            </h3>
            <img src="./dashboard/level5.png" alt="" />
            <h5 className="text-[#fff] text-[14px] font-404px text-center  mt-[40px]">Check out this degen at</h5>
            <div className="text-[#07E993] bg-[#192a4f] rounded-[7px] px-[16px] py-[6px] mt-[7px]">
              memoo.ai/profile/doglover4478
            </div>
          </div>
        </div>
        <div className="w-[100%] text-center mt-[16px] text-[#fff] text-[16px] font-OCR">Share Creator Ranking</div>
        <div className="flex items-center justify-center gap-x-1 mt-[15px]">
          <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px]">
            <IconTwitter className="w-[20px] h-[18px]" color="#1F3B4F" />
          </div>
          <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px]">
            <IconTelegram className="w-[20px] h-[18px]" color="#1F3B4F" />
          </div>
          <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px]">
            <IconDiscord />
          </div>
          <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px]">
            <IconFacebook />
          </div>
          <div
            className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px]"
            onClick={downloadImg}
          >
            <IconDownload />
          </div>
          <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px]">
            <IconMore />
          </div>
        </div>
      </Modal>
      {Children.map(children, (child) => {
        if (isValidElement<{ onClick: () => void }>(child)) {
          return cloneElement(child, { onClick: () => setOpen(true) });
        }
        return child;
      })}
    </div>
  );
};
export default CreatorRankingShareModal;
