import { useState, Children, cloneElement, isValidElement, useEffect, useCallback } from 'react';

import './airdrop-modal.scss';
import { Modal, Button } from 'antd';
import message from '@/components/IMessage';
import { IconLock, IconClose, IconCompleted } from '@/components/icons';
import { getIDOLaunchedDetail } from '@/api/airdrop';
import { getTokenDetail } from '@/api/token';
import { useManageContract } from '@/hooks/useManageContract';
import { useSign } from '@/hooks/useEthers';
import { myAirdropDetail } from '@/api/airdrop';
import BigNumber from 'bignumber.js';

const CreatorRankingModal = ({ children, ticker }: any) => {
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
        footer={null}
        closeIcon={<IconClose className="close" />}
      >
        <div className="confirm_title w-[100%]">CREATOR RANK REWARD</div>
        <div className="confirm_content">
          <img className="mt-[15px]" src="./dashboard/victory.png" alt="" />
          <div className="confirm_content_title mt-[18px]">VICTORY!</div>
          <div className="confirm_content_describe mt-[18px]">
            Claim your MOO tokens for <br /> achieving Meme God creator rank.
          </div>
          <div className="confirm_content_wif">
            <span className="airdrop_lock"> Total</span>
            {Number(idoLaunchedDetail?.count).toLocaleString()}
            {/* {idoLaunchedDetail?.count} */}
          </div>
          <div className="airdrop_confirm_btn">
            <Button className="mt-[16px] custom_ant_btn" onClick={onConfirm} loading={confirming}>
              CLAIM ALL
            </Button>
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
export default CreatorRankingModal;
