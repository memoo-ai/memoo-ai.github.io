import { useState, Children, cloneElement, isValidElement } from 'react';

import './airdrop-modal.scss';
import { Modal, Button } from 'antd';
import { IconLock, IconClose, IconCompleted } from '@/components/icons';
const AirdropModal = ({ children }: any) => {
  const [open, setOpen] = useState(false);
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
        <div className="confirm_title">Airdrop Unlocked</div>
        <div className="confirm_content">
          <img className="mt-[15px]" src="./dashboard/reward.svg" alt="" />
          <div className="confirm_content_title mt-[18px]">WIF has arrived!</div>
          <div className="confirm_content_describe mt-[18px]">Thanks for being part of the Dogwifhat community.</div>
          <div className="confirm_content_wif">
            <IconLock className="airdrop_lock" color="#07E993" bgColor="#2B526E" /> 200000 WIF
          </div>
          <div className="airdrop_confirm_btn">
            <Button className="mt-[16px] custom_ant_btn">CLAIM ALL</Button>
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
export default AirdropModal;
