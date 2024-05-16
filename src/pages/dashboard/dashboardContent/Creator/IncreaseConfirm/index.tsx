import { useState, Children, cloneElement, isValidElement } from 'react';

import './index.scss';
import { Modal, Button, Checkbox, Tooltip } from 'antd';
import { IconClose, IconETH, IconTip } from '@/components/icons';
import MySlider from '@/components/MySlider';
export const IncreaseConfirm = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [progress, setProgress] = useState(5);
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
            <MySlider
              min={5}
              max={35}
              value={progress}
              onChange={(value) => {
                setProgress(value);
              }}
            />
          </div>
        </div>
        <div>{progress}</div>
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
