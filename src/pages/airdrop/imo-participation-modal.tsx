import { Button, Checkbox, Input, Modal, Progress, Radio, RadioChangeEvent, Slider } from 'antd';
import { Children, FC, Fragment, ReactNode, cloneElement, isValidElement, useState } from 'react';
import './imo-participation-modal.scss';

const options = [
  {
    label: (
      <div className="imo_opt">
        <span>0.01b ETH</span>
        <span>~2,500,000 TOKEN</span>
      </div>
    ),
    value: '1',
  },
  {
    label: (
      <div className="imo_opt">
        <span>0.01b ETH</span>
        <span>~2,500,000 TOKEN</span>
      </div>
    ),
    value: '2',
  },
  {
    label: (
      <div className="imo_opt">
        <span>0.01b ETH</span>
        <span>~2,500,000 TOKEN</span>
      </div>
    ),
    value: '3',
  },
];

const ImoParticipationModal: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [value3, setValue3] = useState('Apple');

  const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio3 checked', value);
    setValue3(value);
  };

  return (
    <>
      <Modal
        className="min-w-[604px]"
        wrapClassName="memoo_modal"
        title="IMO Participation"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <div className="imo_participation flex flex-col">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-x-3">
              <span className="text-white font-OCR text-base leadings-[18px]">Contribute</span>
              <img src="/create/tip.png" />
            </div>
            <p className="whitespace-pre font-OCR text-white text-base leadings-[18px]">{`Total IDO raise is always\ncapped at ${2.33} ETH`}</p>
          </div>
          <Radio.Group
            className="memoo_radio_group mt-[28px] mb-[28px]"
            options={options}
            onChange={onChange3}
            value={value3}
            optionType="button"
          />
          <p className="whitespace-pre font-OCR text-[#4889B7] text-[10px] leadings-[14px]">{`Contribution capped at 0.066 ETH per wallet: To counteract potential centralization,\nindividual wallet holding limits will be established, ensuring that every purchasing\nentity's holding is limited to maximum of 1% percentage of the total supply.`}</p>
          <Checkbox className="font-OCR text-[12px] text-[#4889B7] my-[24px]">
            I accept MeMoo’s <a className="contents text-green">Terms & Conditions.</a>
          </Checkbox>
          <Button className="memoo_button mt-4 h-[50px]">Confirm</Button>
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

ImoParticipationModal.displayName = ImoParticipationModal.name;

export default ImoParticipationModal;
