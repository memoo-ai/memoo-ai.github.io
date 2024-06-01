import { useState, Children, cloneElement, isValidElement } from 'react';

import './index.scss';
import { Modal, Button } from 'antd';
import { IconLock, IconClose, IconCompleted } from '@/components/icons';
export const AirdropConfirm = ({ children }: any) => {
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
          <img src="./dashboard/reward.svg" alt="" />
          <div className="confirm_content_title">WIF has arrived!</div>
          <div className="confirm_content_describe">Thanks for being part of the Dogwifhat community.</div>
          <div className="confirm_content_wif">200000 WIF</div>
          <div className="confirm_btn">
            <Button className="mt-[76px] custom_ant_btn">CLAIM ALL</Button>
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
