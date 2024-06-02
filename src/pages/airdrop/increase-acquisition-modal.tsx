import { Button, Checkbox, Input, Modal, Progress, Slider } from 'antd';
import { Children, FC, Fragment, ReactNode, cloneElement, isValidElement, useState } from 'react';
import './increase-acquisition-modal.scss';

const IncreaseAcquisitionModal: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal
        wrapClassName="memoo_modal"
        title="Increase Acquisition"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <div className="increase_acquisition pt-[35px] flex flex-col">
          <div className="flex gap-x-[37px]">
            <div className="flex items-end">
              <span className="whitespace-pre-wrap text-base font-OCR text-white leading-[18px]">{`Pre-Market\nAcquisition`}</span>
              <div className="tip_ico_wrapper h-[18px] flex items-center ml-[12px]">
                <img className="h-[12px] object-contains" src="/create/tip.png" />
              </div>
            </div>
            <div className="flex flex-auto items-center gap-x-3">
              <span className="whitespace-nowrap text-base font-OCR text-white leading-[16px]">0.05 ETH</span>
              <Slider
                className="memoo_slider flex-auto"
                tooltip={{ open: true, rootClassName: 'memoo_slider_tooltip', formatter: (value) => `${value}%` }}
                max={35}
                min={5}
              />
              <span className="whitespace-nowrap text-base font-OCR text-white leading-[16px]">2 ETH</span>
            </div>
          </div>
          <p className="font-OCR text-[#4889B7] whitespace-pre-wrap mt-[7px] mb-[19px]">
            {`Creator can increase initial\nallocation from 5% to 35%.`}
          </p>
          <Input
            className="memoo_input h-[66px]"
            placeholder="Pre-Market Acquisition"
            suffix={<span className="text-[24px] text-white font-404px leading-[22px]">{`${2} ETH`}</span>}
          />
          <Checkbox className="font-OCR text-[12px] text-[#4889B7] my-[24px]">
            I accept MeMoo’s <a className="contents text-green">Terms & Conditions.</a>
          </Checkbox>
          <Button className="memoo_button h-[50px]">Confirm</Button>
        </div>
      </Modal>
      {Children.map(children, (child) => {
        if (isValidElement<{ onClick: () => void }>(child)) {
          return cloneElement(child, { onClick: () => setOpen(true) });
        }
        return child;
      })}
    </>
  );
};

IncreaseAcquisitionModal.displayName = IncreaseAcquisitionModal.name;

export default IncreaseAcquisitionModal;
