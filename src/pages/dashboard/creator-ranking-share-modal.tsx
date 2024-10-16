import React, {
  useState,
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  useCallback,
  useRef,
  useContext,
} from 'react';
import { ProfileContext } from './profile';
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
import * as htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';
import { popupSharing, getBase64FromImageUrl } from '@/utils';

const BaseUrl = import.meta.env.VITE_SHARE_URI;
const CreatorRankingShareModal = ({ children, ticker }: any) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { address, profileDetail } = useContext(ProfileContext);
  const iconRefs = useRef<any>({});
  const shareUrl = useMemo(() => {
    return `${BaseUrl}airdrop/${address}`;
  }, [BaseUrl, address]);

  const downloadImg = useCallback(async () => {
    if (ref.current === null) {
      return;
    }
    // document.styleSheets.forEach((sheet) => {
    //   try {
    //     if (sheet.cssRules) {
    //       console.log(sheet.cssRules);
    //     }
    //   } catch (e) {
    //     console.warn('Cross-domain style sheet cannot be accessed and has been ignored:', sheet.href);
    //   }
    // });
    toPng(ref.current, {
      cacheBust: false,
      width: 480,
      height: 480,
    })
      .then((dataUrl) => {
        setLoading(true);
        const link = document.createElement('a');
        link.download = 'my-share-image.png';
        link.href = dataUrl;
        link.click();
        message.success('Download successfully!');
        setLoading(false);
      })
      .catch(async (err) => {
        console.log(err);
        message.error('Download failed.');
        setLoading(false);
        // const result = toCanvas();
        // if (!result) {
        //   message.error('Download failed.');
        // }
      });
    // toPng(ref.current, {
    //   cacheBust: true,
    //   width: 480,
    //   height: 480,
    //   skipFonts: true,
    //   // preferredFontFormat: 'woff2',
    // })
    //   .then((dataUrl) => {
    //     setLoading(true);
    //     const link = document.createElement('a');
    //     link.download = 'my-share-image.png';
    //     link.href = dataUrl;
    //     link.click();
    //     message.success('Download successfully!');
    //     setLoading(false);
    //   })
    //   .catch(async (err) => {
    //     console.log(err);
    //     // message.error('Download failed.');
    //     setLoading(false);
    //     const result = toCanvas();
    //     if (!result) {
    //       message.error('Download failed.');
    //     }
    //   });
  }, [ref]);

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
            <h3 className="text-[#fff] text-[24px] font-404px text-center whitespace-pre-wrap">
              {`${profileDetail?.userName}\nIS A MEME SUPASTAR`}
            </h3>
            <img src="./level/level5.png" alt="" />
            <h5 className="text-[#fff] text-[14px] leading-[18px] font-OCR text-center  mt-[40px]">
              Check out this degen at
            </h5>
            <div className="text-[#07E993] bg-[#192a4f] rounded-[7px] px-[16px] py-[6px] mt-[7px]">{shareUrl}</div>
          </div>
        </div>
        <div className="w-[100%] text-center mt-[16px] text-[#fff] text-[16px] font-OCR">Share Creator Ranking</div>
        <div className="flex items-center justify-center gap-x-1 mt-[16px]">
          <a
            target="_black"
            className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px] link-hover"
            onMouseOver={() => iconRefs.current[`IconTwitter`].setHovered(true)}
            onMouseLeave={() => iconRefs.current[`IconTwitter`].setHovered(false)}
            onClick={() => popupSharing(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`)}
          >
            <IconTwitter
              className="w-[20px] h-[18px]"
              color="#1F3B4F"
              hoverColor="#07E993"
              ref={(ref) => (iconRefs.current[`IconTwitter`] = ref)}
            />
          </a>
          <a
            onClick={() => popupSharing(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`)}
            className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px] link-hover"
            onMouseOver={() => iconRefs.current[`IconTelegram`].setHovered(true)}
            onMouseLeave={() => iconRefs.current[`IconTelegram`].setHovered(false)}
          >
            <IconTelegram
              color="#1F3B4F"
              hoverColor="#07E993"
              ref={(ref) => (iconRefs.current[`IconTelegram`] = ref)}
              className="w-[20px] h-[18px]"
            />
          </a>
          {/* <a className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px] link-hover"      onMouseOver={() => iconRefs.current[`IconDiscord`].setHovered(true)}
            onMouseLeave={() => iconRefs.current[`IconDiscord`].setHovered(false)}>
            <IconDiscord color="#1F3B4F" hoverColor="#07E993" ref={(ref) => (iconRefs.current[`IconDiscord`] = ref)} />
          </a> */}
          <a
            onClick={() => popupSharing(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)}
            className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px] link-hover"
            onMouseOver={() => iconRefs.current[`IconFacebook`].setHovered(true)}
            onMouseLeave={() => iconRefs.current[`IconFacebook`].setHovered(false)}
          >
            <IconFacebook
              color="#1F3B4F"
              hoverColor="#07E993"
              ref={(ref) => (iconRefs.current[`IconFacebook`] = ref)}
            />
          </a>
          <div
            className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px] link-hover"
            onClick={downloadImg}
            onMouseOver={() => iconRefs.current[`IconDownload`].setHovered(true)}
            onMouseLeave={() => iconRefs.current[`IconDownload`].setHovered(false)}
          >
            <IconDownload
              color="#1F3B4F"
              hoverColor="#07E993"
              ref={(ref) => (iconRefs.current[`IconDownload`] = ref)}
            />
          </div>
          {/* <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#07E993] rounded-[7px]">
            <IconMore color="#1F3B4F" hoverColor="#07E993" ref={(ref) => (iconRefs.current[`IconTwitter`] = ref)} />
          </div> */}
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
