import { useState, Children, cloneElement, isValidElement, useEffect, useCallback } from 'react';

import './view-token-ranking-modal.scss';
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

const ViewTokenRankingModal = ({ children, ticker }: any) => {
  const [open, setOpen] = useState(false);
  const [idoLaunchedDetail, setIdoLaunchedDetail] = useState<any>(null);
  const { airdropClaim } = useManageContract();
  const [confirming, setConfirming] = useState(false);
  const { getSign } = useSign();
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
        closable={false}
        width={405}
        className="view-token-ranking-modal"
        footer={null}
      >
        <div className="view-token-ranking-modal-content flex items-center justify-center flex-col">
          <h5 className="text-center text-[#7D83B5] font-OCR text-[14px]">
            This account has not <br /> created any meme tokens.
          </h5>
          <img className="mt-[28px] mb-[20px]" src="./dashboard/sadfish.png" alt="" />
          <h5 className="text-center text-[#7D83B5] font-OCR text-[14px]">View other top memes at</h5>
          <img className="mt-[6px]" src="./dashboard/memoogecko.png" alt="" />
          <div className="view-btn">
            <Button className="w-[227px] h-[50px] mt-[18px]">VIEW CREATOR RANKING</Button>
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
export default ViewTokenRankingModal;
