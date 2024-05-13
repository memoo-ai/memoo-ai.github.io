import { useState, Children, cloneElement, isValidElement } from 'react';

import './index.scss';
import { Modal, Button, Checkbox, Slider, Tooltip } from 'antd';
import { IconClose, IconETH, IconTip } from '@/components/icons';
export const IncreaseConfirm = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
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
        <div className="confirm_title">Increase Acquisition</div>
        <div className="flex  mt-[39px] items-center">
          <div className="increase_unlocked">
            <h3>
              Pre-Market Acquisition{' '}
              <Tooltip title="hint message">
                <IconTip className="IconTip" />
              </Tooltip>{' '}
            </h3>
            <p>Creator can increase initial allocation from 5% to 35%.</p>
          </div>
          <div className="flex-1 flex items-center progress">
            <div className="mr-[14px]">0.05ETH</div> <Slider className="flex-1 progress_slider" min={5} max={35} />
            <div className="ml-[14px]">1.4ETH</div>
          </div>
        </div>
        <div className="claimable">
          <div className="claimable_left">Pre-Market Acquisition</div>
          <div className="claimable_right">
            <IconETH className="IconETH mr-[22px]" color="#FFFFFF" />
            1.4 ETH
          </div>
        </div>
        <div>
          <Checkbox
            onChange={() => {
              setIsAccept(!isAccept);
            }}
            className="my-[24px] text-[#4889b7] border-[red]"
          >
            I accept MeMoo’s <span className="text-[#07E993]">terms & conditions.</span>
          </Checkbox>
        </div>
        <Button>CONFIRM</Button>
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
