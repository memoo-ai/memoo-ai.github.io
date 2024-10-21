import React, {
  useState,
  Children,
  cloneElement,
  isValidElement,
  useContext,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from 'react';

import './score-share-modal.scss';
import { Modal, Button, Spin } from 'antd';
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
import { toPng, toBlob } from 'html-to-image';
import { AirdropContext } from '.';
import { popupSharing, getBase64FromImageUrl } from '@/utils';
import html2canvas from 'html2canvas';

const BaseUrl = import.meta.env.VITE_SHARE_URI;
const CreatorRankingShareModal = ({ children, memooScore, meMessage }: any) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const { idoQueueDetail } = useContext(AirdropContext);
  const iconRefs = useRef<any>({});
  const [base64Image, setBase64Image] = useState('');
  const toCanvas = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, {
      // scale: 2,
      backgroundColor: null,
      width: 480,
      height: 480,
      // foreignObjectRendering: true,
    });

    const a = document.createElement('a');
    // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
    a.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
    a.download = `${name}-${Math.ceil(Date.now() / 1000)}.jpg`;
    a.click();
    return true;
  };

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

  async function getBase64FromImageUrl(imageUrl: string) {
    try {
      const response = await fetch(imageUrl, {
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch image. Status: ${response.status}`);
      }

      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  useEffect(() => {
    const fetchImage = async () => {
      if (idoQueueDetail?.icon) {
        const base64 = await getBase64FromImageUrl(idoQueueDetail.icon);
        setBase64Image(base64 as any);
      }
    };

    fetchImage();
  }, [idoQueueDetail]);

  const shareUrl = useMemo(() => {
    return `${BaseUrl}airdrop/${idoQueueDetail?.ticker}`;
  }, [BaseUrl, idoQueueDetail]);

  // const iconUrl = useMemo(async () => {
  //   let url = '';
  //   await getBase64FromImageUrl(idoQueueDetail?.icon ?? '', async (base64Image: string) => {
  //     if (base64Image) {
  //       url = base64Image;
  //     }
  //   });
  //   return url;
  // }, [BaseUrl, idoQueueDetail]);

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
          <Spin spinning={loading} fullscreen />
          <div className="score-share-modal-content  relative" ref={ref}>
            <img className="w-[96px] h-[96px] rounded-full" src={base64Image} alt="" />
            <div className=" flex items-end justify-between flex-col absolute top-[28px] right-[28px]">
              <div className="flex items-center ">
                <img src="/logo.svg" alt="" /> <IconMemoo className="ml-[5px]" />
              </div>
              <p className="text-[#fff] text-[14px] font-OCR">memoo.ai</p>
            </div>
            <div className=" flex  justify-center flex-col">
              {/* <img className="w-[96px] h-[96px] rounded-full mt-[36px]" src={base64Image} alt="" /> */}
              <h3 className="text-[#fff] text-[24px] font-404px text-left leading-[20px] mt-[14px]">
                {idoQueueDetail?.tokenName}
              </h3>
              <h5 className="text-[#fff] text-[14px] font-OCR text-left leading-[20px]">{idoQueueDetail?.ticker}</h5>
              <h5 className="text-[#fff] text-[14px] font-OCR text-left mt-[36px]">Check out this meme token at</h5>
              <div className="w-fit text-[#07E993] bg-[#29455b] font-OCR text-xl font-normal rounded-[7px] px-[16px] py-[6px] mt-[7px]">
                {shareUrl}
              </div>
              <h3 className="font-404px text-[#fff] mt-[36px]">MeMoo Score</h3>
              <p className="text-[#fff] text-[24px] font-404px leading-[5px] mt-[55px]">
                <span className="text-green text-[96px] line-">{memooScore ?? 0}</span>/100
              </p>
              <p className="text-[#fff] text-[14px] font-OCR leading-[15px] mt-[17px]">{meMessage}</p>
            </div>
          </div>
        </div>
        <div className="w-[100%] text-center  text-[#fff] text-[16px] font-OCR">Share MeMoo Score</div>
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
