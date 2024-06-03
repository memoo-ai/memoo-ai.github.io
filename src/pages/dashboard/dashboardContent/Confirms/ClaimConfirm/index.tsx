import { useState, Children, cloneElement, isValidElement } from 'react';

import './index.scss';
import { Modal, Button } from 'antd';
import { IconLock, IconClose, IconCompleted } from '@/components/icons';
export const ClaimConfirm = ({ creator, children }: any) => {
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
        <div className="confirm_title">Claim Tokens</div>
        <div className="flex justify-between mt-[39px] items-center">
          <div className="unlocked">
            <span>Redeem 1st 50% unlocked tokens</span> <img src="./dashboard/reward.svg" alt="" />
          </div>
          <div className="flex">
            <div className="unlock">
              <h3>14 days</h3>
              <p>Next Unlock</p>
            </div>
            <IconLock className="lock" />
          </div>
        </div>
        <div className="flex justify-between mt-[39px] items-center">
          <div className="unlocked">
            <span>Redeem 2nd 50% unlocked tokens</span> <img src="./dashboard/reward.svg" alt="" />
          </div>
          <div className="flex">
            <div className="unlock">
              <h3>14 days</h3>
              <p>Claim Completed</p>
            </div>
            <IconCompleted className="lock" />
          </div>
        </div>
        <div className="claimable">
          <div className="claimable_left">Claimable LEASH</div>
          <div className="claimable_right">250,000,000</div>
        </div>
        <div className="confirm_btn">
          <Button className="mt-[76px]">CLAIM ALL</Button>
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
