/* eslint-disable no-debugger */
import { Button, Checkbox, Input, Modal, Slider, message } from 'antd';
import {
  Children,
  FC,
  ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import './increase-acquisition-modal.scss';
import { formatDecimals } from '@/utils';
import { AirdropContext } from '.';
import BigNumber from 'bignumber.js';
import ITooltip from '@/components/ITooltip';

const IncreaseAcquisitionModal: FC<{
  children: ReactNode;
  maxIncrease: number;
  firstIncrease: number;
  maxProportion: number;
  firstProportion: number;
  purchased: number;
  onCalculated?: (result: number) => void;
}> = ({ children, maxIncrease, maxProportion, firstProportion, firstIncrease, purchased, onCalculated }) => {
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [proportion, setProportion] = useState(purchased);
  const [result, setResult] = useState(0);
  const { idoBuy, idoQueueDetail } = useContext(AirdropContext);
  const defaultValue = purchased * 1000;
  useEffect(() => {
    setProportion(firstProportion * 100);
  }, [firstProportion]);

  useEffect(() => {
    const increasePercent = proportion / 100;
    const result = parseFloat(formatDecimals(firstIncrease * (increasePercent / firstProportion)));
    console.log('increasing proportion:', result);
    setResult(result);
    onCalculated?.(result);
  }, [proportion, firstProportion, firstIncrease]);

  useEffect(() => {
    if (!purchased) return;
    setProportion(defaultValue);
  }, [purchased]);

  const onConfirm = useCallback(async () => {
    if (!idoBuy || !idoQueueDetail) return;
    try {
      setConfirming(true);
      console.log(result);
      console.log('firstIncreaseD:', firstIncrease);
      await idoBuy(idoQueueDetail.contractAddress, new BigNumber(result - purchased));
      setOpen(false);
      message.success('Buy Successful');
    } catch (error) {
      console.error(error);
      message.error('Buy Failed');
    } finally {
      setConfirming(false);
    }
  }, [idoBuy, idoQueueDetail, result, firstIncrease]);

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
                <ITooltip
                  className="h-[12px] "
                  placement="bottom"
                  title="Lorem ipsum dolor sit amet consectetur adipiscing elit.
                Morbi fringilla ipsum turpisı sit amet tempus est malesuadased.
                Integer fringilla magnavel orci ultricies fermentum.
                Suspendisse sem est."
                  color="#fff"
                  bgColor="#396D93"
                />
                {/* <img className="h-[12px] object-contain" src="/create/tip.png" /> */}
              </div>
            </div>
            <div className="flex flex-auto items-center gap-x-3">
              <span className="whitespace-nowrap text-base font-OCR text-white leading-[16px]">
                {firstIncrease} ETH
              </span>
              <Slider
                className="memoo_slider flex-auto"
                tooltip={{ open: true, rootClassName: 'memoo_slider_tooltip', formatter: (value) => `${value}%` }}
                onChange={(value) => {
                  if (value > purchased * 1000) {
                    setProportion(value);
                  } else {
                    setProportion(purchased * 1000);
                  }
                }}
                value={proportion}
                max={maxProportion * 100}
                min={firstProportion * 100}
                defaultValue={defaultValue}
              />
              <span className="whitespace-nowrap text-base font-OCR text-white leading-[16px]">{maxIncrease} ETH</span>
            </div>
          </div>
          <p className="font-OCR text-[#4889B7] whitespace-pre-wrap mt-[7px] mb-[19px]">
            {`Creator can increase initial\nallocation from ${firstProportion * 100}% to ${maxProportion * 100}%.`}
          </p>
          <Input
            className="memoo_input h-[66px]"
            value="Pre-Market Acquisition"
            suffix={
              <span className="text-[24px] text-white font-404px leading-[22px]">{`${
                // Number(formatDecimals(result - purchased)) > 0 ? formatDecimals(result - purchased) : 0
                formatDecimals(result - purchased)
              } ETH`}</span>
            }
          />
          <Checkbox
            className="font-OCR text-[12px] text-[#4889B7] my-[24px]"
            onChange={(e) => setAccepted(e.target.checked)}
          >
            I accept MeMoo’s <a className="contents text-green">Terms & Conditions.</a>
          </Checkbox>
          <Button
            disabled={!accepted && Number(formatDecimals(result - purchased)) <= 0}
            className="memoo_button h-[50px]"
            loading={confirming}
            onClick={onConfirm}
          >
            Confirm
          </Button>
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
