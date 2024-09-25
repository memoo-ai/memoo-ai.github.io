/* eslint-disable no-debugger */
import { Button, Checkbox, Input, Modal, Slider } from 'antd';
import message from '@/components/IMessage';
import React, {
  Children,
  FC,
  ReactNode,
  cloneElement,
  isValidElement,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import './increase-modal.scss';
import { formatDecimals } from '@/utils';
import BigNumber from 'bignumber.js';
import ITooltip from '@/components/ITooltip';
import { CreatorContext } from './creator';
import { BN } from '@coral-xyz/anchor';

type ChildWithOnClick = ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
const IncreaseModal: FC<{
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
  const [defaultProportion, setDefaultProportion] = useState(0);
  const [result, setResult] = useState(0);
  const { idoBuy, idoQueueDetail, solanaMemeConfig, memooConfig } = useContext(CreatorContext);
  // useEffect(() => {
  //   setProportion(firstProportion * 100);
  // }, [firstProportion]);

  useEffect(() => {
    const increasePercent = proportion / 100;
    console.log('increasePercent-result:', increasePercent); // 0.05
    console.log('proportion-result:', proportion); // 0.05
    console.log('firstIncrease-result:', firstIncrease); // 1.5
    console.log('firstProportion-result:', firstProportion); // 0.05
    console.log('purchased-result:', purchased);
    const resultSol = (firstIncrease / firstProportion) * increasePercent;
    const result = parseFloat(formatDecimals(resultSol - purchased));
    console.log('increasing proportion-result:', result);
    setResult(result);
    onCalculated?.(result);
  }, [proportion, firstProportion, firstIncrease, purchased]);

  useEffect(() => {
    if (!purchased || !memooConfig) return;
    const idoPriceBN = new BigNumber(Number(memooConfig?.idoPrice)).dividedBy(10 ** 10);
    const totalSupply = new BigNumber(Number(memooConfig?.totalSupply)).dividedBy(10 ** 9);
    const totalPrice = new BigNumber(totalSupply).multipliedBy(idoPriceBN);
    const defaultValue = new BigNumber(purchased).dividedBy(totalPrice);

    console.log('defaultValue-purchased:', Number(purchased));
    console.log('defaultValue:', Number(defaultValue));
    setProportion(Number(defaultValue ?? 0.05) * 100);
    setDefaultProportion(Number(defaultValue ?? 0.05) * 100);
  }, [purchased]);

  const onConfirm = useCallback(async () => {
    console.log('onConfirm');
    console.log('idoBuy:', idoBuy);
    console.log('idoQueueDetail:', idoQueueDetail);
    console.log('memeConfigId:', solanaMemeConfig?.memeConfigId);
    if (!idoBuy || !idoQueueDetail || !solanaMemeConfig) return;
    try {
      setConfirming(true);
      console.log(result);
      console.log('firstIncreaseD:', firstIncrease);
      const tx = await idoBuy(solanaMemeConfig?.memeConfigId, new BigNumber(result), true, proportion);
      if (tx) {
        setOpen(false);
        message.success('Buy Successful');
      }
    } catch (error) {
      console.error(error);
      message.error('Buy Failed');
    } finally {
      setConfirming(false);
    }
  }, [idoBuy, idoQueueDetail, result, firstIncrease, solanaMemeConfig]);

  return (
    <>
      <Modal
        wrapClassName="memoo_modal"
        title=""
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <div className="modal_title">Increase Acquisition</div>
        <div className=" pt-[35px] flex flex-col">
          <div className="flex gap-x-[37px]">
            <div className="flex items-end">
              <span className="whitespace-pre-wrap text-base font-OCR text-white leading-[18px]">{`Pre-Market\nAcquisition`}</span>
              <div className="tip_ico_wrapper h-[18px] flex items-center ml-[12px]">
                <ITooltip
                  className="h-[12px] "
                  placement="bottom"
                  title={`Creators can secure up to an additional ${maxProportion * 100}% of the meme token before the launch.`}
                  color="#fff"
                  bgColor="#396D93"
                />
                {/* <img className="h-[12px] object-contain" src="/create/tip.png" /> */}
              </div>
            </div>
            <div className="flex flex-auto items-center gap-x-3">
              <span className="whitespace-nowrap text-base font-OCR text-white leading-[16px]">
                {0} {tokenSymbol}
              </span>
              <Slider
                className="memoo_slider flex-auto"
                tooltip={{
                  open: true,
                  rootClassName: 'memoo_slider_tooltip',
                  formatter: (value) => `${value}% ${formatDecimals(result)} ${tokenSymbol}`,
                }}
                onChange={(value) => {
                  if (value > defaultProportion) {
                    setProportion(value);
                  } else {
                    setProportion(defaultProportion);
                  }
                }}
                value={proportion}
                max={maxProportion * 100}
                min={0}
                // defaultValue={defaultValue}
              />
              <span className="whitespace-nowrap text-base font-OCR text-white leading-[16px]">
                {maxIncrease} {tokenSymbol}
              </span>
            </div>
          </div>
          <p className="font-OCR text-[#4889B7] text-[10px] leading-3 whitespace-pre-wrap mt-[7px] mb-[19px]">
            {`Creator can increase initial allocation\nby purchasing an additional ${maxProportion * 100}%.`}
          </p>
          <Input
            className="memoo_input h-[66px]"
            value="Pre-Market Acquisition"
            suffix={
              <span className="text-[24px] text-white font-404px leading-[22px]">{`${
                // Number(formatDecimals(result - purchased)) > 0 ? formatDecimals(result - purchased) : 0
                formatDecimals(result)
              } ${tokenSymbol}`}</span>
            }
          />
          <Checkbox
            className="font-OCR text-[12px] text-[#4889B7] my-[24px]"
            onChange={(e) => setAccepted(e.target.checked)}
          >
            I accept MeMoo’s <a className="contents text-green">Terms & Conditions.</a>
          </Checkbox>
          <div>
            <Button
              disabled={!accepted || Number(formatDecimals(result)) === 0}
              className="memoo_button w-[100%] h-[50px]"
              loading={confirming}
              onClick={onConfirm}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          const existingOnClick = (child as ChildWithOnClick).props.onClick;
          return cloneElement(child as ChildWithOnClick, {
            onClick: async (e: any) => {
              if (existingOnClick) {
                await existingOnClick(e);
                setTimeout(() => {
                  setOpen(true);
                }, 1000);
              }
            },
          });
        }
        return child;
      })}
    </>
  );
};

IncreaseModal.displayName = IncreaseModal.name;

export default IncreaseModal;
