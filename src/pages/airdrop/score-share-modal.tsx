import React, {
  useState,
  Children,
  cloneElement,
  isValidElement,
  useContext,
  useCallback,
  useRef,
  useMemo,
} from 'react';

import './score-share-modal.scss';
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
import { toPng } from 'html-to-image';
import { AirdropContext } from '.';
import ShareButton from '@/components/ShareButton';

const BaseUrl = import.meta.env.VITE_SHARE_URI;
const CreatorRankingShareModal = ({ children, ticker }: any) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { idoQueueDetail } = useContext(AirdropContext);

  const downloadImg = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, {
      cacheBust: false,
      width: 480,
      height: 480,
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-share-image.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const shareUrl = useMemo(() => {
    return `${BaseUrl}${idoQueueDetail?.ticker}`;
  }, [BaseUrl, idoQueueDetail]);

  // const handleShare = (type: 'twitter' | 'telegram') => {
  //   switch (type) {
  //     case 'twitter':
  //       window.open(
  //         `https://twitter.com/intent/tweet?text=Check%20out%20this%20meme%20token%20at%20https://memoo.ai/${ticker}`,
  //         '_black',
  //       );
  //       break;
  //     case 'telegram':
  //       window.open(`https://t.me/share/url?url=https://memoo.ai/${ticker}&text=Check%20out%20this%20meme%20token%`);
  //     case 'telegram':
  //       window.open(`https://t.me/share/url?url=https://memoo.ai/${ticker}&text=Check%20out%20this%20meme%20token%`);

  //     case 'facebook':
  //       window.open(`https://t.me/share/url?url=https://memoo.ai/${ticker}&text=Check%20out%20this%20meme%20token%`,'_black');
  //   }
  // };

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
        className="score-share-modal"
        footer={null}
        closeIcon={<IconClose className="close" />}
      >
        <div className="mt-[21px] p-[28px]">
          <div className="score-share-modal-content  relative" ref={ref}>
            <div className=" flex items-end justify-between flex-col absolute top-[28px] right-[28px]">
              <div className="flex items-center ">
                <img src="/logo.svg" alt="" /> <IconMemoo className="ml-[5px]" />
              </div>
              <p className="text-[#fff] text-[14px] font-OCR">memoo.ai</p>
            </div>
            <div className=" flex  justify-center flex-col">
              <img className="w-[60px] h-[60px] rounded-full mt-[36px]" src={idoQueueDetail?.icon} alt="" />
              <h3 className="text-[#fff] text-[24px] font-404px text-left">{idoQueueDetail?.tokenName}</h3>
              <h5 className="text-[#fff] text-[14px] font-OCR text-left">{idoQueueDetail?.ticker}</h5>
              <h5 className="text-[#fff] text-[14px] font-OCR text-left mt-[36px]">Check out this meme token at</h5>
              <div className="w-fit text-[#07E993] bg-[#29455b] font-OCR text-xl font-normal rounded-[7px] px-[16px] py-[6px] mt-[7px]">
                {shareUrl}
              </div>
              <h3 className="font-404px text-[#fff] mt-[36px]">MeMoo Score</h3>
              <p className="text-[#fff] text-[24px] font-404px leading-[5px] mt-[55px]">
                <span className="text-green text-[96px] line-">70</span>/100
              </p>
              <p className="text-[#fff] text-[14px] font-OCR leading-[15px] mt-[17px]">
                Might consider <br /> adding it to my wishlist.
              </p>
            </div>
          </div>
        </div>
        <div className="w-[100%] text-center  text-[#fff] text-[16px] font-OCR">Share MeMoo Score</div>
        <div className="flex items-center justify-center gap-x-1 mt-[16px]">
          <ShareButton
            text="Check out this awesome content!"
            imageUrl="https://example.com/my-image.jpg"
            url="https://mywebsite.com/awesome-content"
            title="Awesome Content Title"
            description="This is a description of the awesome content"
          >
            <a className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px]">
              <IconTwitter className="w-[20px] h-[18px]" color="#1F3B4F" />
            </a>
          </ShareButton>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
            target="_black"
            className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px]"
          >
            <IconTwitter className="w-[20px] h-[18px]" color="#1F3B4F" />
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`}
            target="_black"
            className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px]"
          >
            <IconTelegram className="w-[20px] h-[18px]" color="#1F3B4F" />
          </a>
          <a className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px]">
            <IconGame />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_black"
            className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px]"
          >
            <IconFacebook />
          </a>
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
