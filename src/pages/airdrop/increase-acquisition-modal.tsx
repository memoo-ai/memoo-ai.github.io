/* eslint-disable no-debugger */
import { Button, Checkbox, Input, Modal, Slider } from 'antd';
import message from '@/components/IMessage';
import {
  Children,
  FC,
  ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from 'react';
import './increase-acquisition-modal.scss';
import { formatDecimals } from '@/utils';
import { AirdropContext } from '.';
import BigNumber from 'bignumber.js';
import ITooltip from '@/components/ITooltip';
import { useAccount } from '@/hooks/useWeb3';
import { getMemeConfigId } from '@/api/base';
import { BN } from '@coral-xyz/anchor';
const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
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
  const [proportion, setProportion] = useState(0);
  const [result, setResult] = useState(0);
  const [defaultProportion, setDefaultProportion] = useState(0);
  const [sliderKey, setSliderKey] = useState(0);
  // const { idoBuy, idoQueueDetail } = useContext(AirdropContext);
  const { idoQueueDetail, mine, idoBuy, solanaMemeConfig, memooConfig, triggerRefresh } = useContext(AirdropContext);
  const [tipRerender, setTipRerender] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  // const { idoBuy } = useAccount();
  // const defaultValue = purchased * 100;
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
  }, [proportion, firstProportion, firstIncrease]);
  // useEffect(() => {
  //   const increasePercent = proportion / 100;
  //   console.log('increasePercent:', increasePercent);
  //   console.log('firstIncrease-result:', firstIncrease);
  //   console.log('firstProportion-result:', firstProportion);
  //   const result = parseFloat(formatDecimals(firstIncrease * (increasePercent / firstProportion)));
  //   console.log('increasing proportion:', result);
  //   setResult(result);
  //   onCalculated?.(result);
  // }, [proportion, firstProportion, firstIncrease]);

  useEffect(() => {
    if (!purchased || !memooConfig) return;
    const idoPriceBN = new BigNumber(Number(memooConfig?.idoPrice)).dividedBy(10 ** 10);
    const totalSupply = new BigNumber(Number(memooConfig?.totalSupply)).dividedBy(10 ** 9);
    const totalPrice = new BigNumber(totalSupply).multipliedBy(idoPriceBN);
    const defaultValue = new BigNumber(purchased).dividedBy(totalPrice);

    console.log('defaultValue-purchased:', Number(purchased));
    console.log('defaultValue:', Number(defaultValue));
    setProportion(Number(defaultValue ?? 0) * 100);
    setDefaultProportion(Number(defaultValue ?? 0) * 100);
  }, [purchased, memooConfig]);

  const onConfirm = useCallback(async () => {
    if (!idoBuy || !idoQueueDetail || !solanaMemeConfig || !triggerRefresh) return;
    try {
      setConfirming(true);
      console.log(result);
      console.log('firstIncreaseD:', firstIncrease);
      // const { data: config } = await getMemeConfigId(idoQueueDetail.ticker);
      console.log('result:', result);
      console.log('purchased:', purchased);
      console.log('proportion:', proportion);
      console.log('result-idoBuy:', parseFloat(result.toString()));
      console.log('amount-idoBuy:', Number(new BigNumber(parseFloat(result.toString())).multipliedBy(10 ** 9)));

      const tx = await idoBuy(solanaMemeConfig.memeConfigId, new BigNumber(result), mine, proportion);
      // const tx = await idoBuy(config.memeConfigId, new BN(Math.floor(result * 1_000_000_000)));
      if (tx) {
        console.log('idoBuy-tx:', tx);
        setOpen(false);
        message.success('Buy Successful');
        triggerRefresh();
      }
    } catch (error) {
      console.error(error);
      message.error('Buy Failed');
    } finally {
      setConfirming(false);
    }
  }, [idoBuy, idoQueueDetail, result, firstIncrease]);

  useLayoutEffect(() => {
    if (open) setTimeout(() => setTipRerender((count) => count + 1), 200);
  }, [open]);

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
                  title={`Creators can secure up to an additional ${maxProportion * 100}% of the meme token before the launch.`}
                  color="#fff"
                  bgColor="#396D93"
                />
                {/* <img className="h-[12px] object-contain" src="/create/tip.png" /> */}
              </div>
            </div>
            <div className="flex flex-auto items-center gap-x-3" ref={sliderRef}>
              <span className="whitespace-nowrap text-base font-OCR text-white leading-[16px]">
                {/* {firstIncrease} {tokenSymbol} */}
                {0} {tokenSymbol}
              </span>
              <Slider
                key={tipRerender}
                className="memoo_slider flex-auto"
                tooltip={{
                  open: true,
                  rootClassName: 'memoo_slider_tooltip',
                  formatter: (value) => `${value}% ${formatDecimals(result)} ${tokenSymbol}`,
                  getPopupContainer: () => sliderRef.current!,
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
                defaultValue={defaultProportion}
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
                // formatDecimals(result - purchased)
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
          <Button
            disabled={!accepted || result === 0}
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
