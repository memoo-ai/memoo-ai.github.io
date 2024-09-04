import React, { useState, Children, cloneElement, isValidElement, useEffect, useCallback, useRef } from 'react';

import './index.scss';
import { Modal, Button, message } from 'antd';
import {
  IconTwitter,
  IconClose,
  IconMemoo,
  IconTelegram,
  IconFacebook,
  IconGame,
  IconDownload,
  IconMore,
} from '@/components/icons';
import * as htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';

const ShareModal = ({ children, shareTitle }: any) => {
  const [open, setOpen] = useState(false);
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

  const handleShare = (type: string) => {};

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
        className="share-modal"
        footer={null}
        closeIcon={<IconClose className="close" />}
      >
        <div className="share-modal-content mt-[42px]" ref={ref}>
          {children}
        </div>
        <div className="w-[100%] text-center mt-[16px] text-[#fff] text-[16px] font-OCR">{shareTitle}</div>
        <div className="flex items-center justify-center gap-x-1 mt-[15px]">
          <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px]">
            <IconTwitter className="w-[20px] h-[18px]" color="#1F3B4F" />
          </div>
          <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px]">
            <IconTelegram className="w-[20px] h-[18px]" color="#1F3B4F" />
          </div>
          <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px]">
            <IconGame />
          </div>
          <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px]">
            <IconFacebook
              onClick={() => {
                handleShare('facebook');
              }}
            />
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
export default ShareModal;
