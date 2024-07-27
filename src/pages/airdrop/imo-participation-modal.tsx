/* eslint-disable no-debugger */
import { Button, Checkbox, Input, Modal, Progress, Radio, RadioChangeEvent, Slider, message } from 'antd';
import {
  Children,
  FC,
  Fragment,
  ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import './imo-participation-modal.scss';
import { AirdropContext } from '.';
import BigNumber from 'bignumber.js';
import { formatDecimals } from '@/utils';
import { DEFAULT_IDO_LIMIT, zeroBN } from '@/constants';
import ITooltip from '@/components/ITooltip';

const grades = [1 / 4, 1 / 2, 1];
const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
const ImoParticipationModal: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const { memooConfig, defaultConfig, idoBuy, idoQueueDetail } = useContext(AirdropContext);
  const [accepted, setAccepted] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const totalSupplyBN = useMemo(() => {
    if (!memooConfig || !defaultConfig) return zeroBN;
    return new BigNumber(Number(defaultConfig.totalSupply)).dividedBy(10 ** defaultConfig.defaultDecimals);
  }, [memooConfig, defaultConfig]);
  console.log('config-totalSupplyBN:', totalSupplyBN);

  const capped = useMemo(() => {
    if (!memooConfig || !defaultConfig) return zeroBN;
    const idoQuotaBN = new BigNumber(Number(memooConfig.allocation.ido)).dividedBy(10000);
    // const idoPriceBN = new BigNumber(defaultConfig.idoPrice).dividedBy(10 ** defaultConfig.defaultDecimals);
    const idoPriceBN = new BigNumber(Number(defaultConfig.idoPrice)).dividedBy(10 ** defaultConfig.defaultDecimals);
    return totalSupplyBN.multipliedBy(idoQuotaBN).multipliedBy(idoPriceBN);
  }, [memooConfig, totalSupplyBN, defaultConfig]);

  const idoUserBuyLimitBN = useMemo(() => {
    if (!memooConfig) return zeroBN;
    const bn = new BigNumber(memooConfig.idoUserBuyLimit ?? DEFAULT_IDO_LIMIT).dividedBy(10000);
    return bn;
  }, [memooConfig]);

  const maxContributed = useMemo(() => capped.multipliedBy(idoUserBuyLimitBN), [capped]);

  const options = useMemo(() => {
    // set default
    setSelected(parseFloat(formatDecimals(capped.multipliedBy(grades[0]).multipliedBy(idoUserBuyLimitBN))));
    console.log('grades[0]:', grades[0]);

    console.log('capped:', capped);
    console.log('capped.multipliedBy:', capped.multipliedBy(grades[0]).multipliedBy(idoUserBuyLimitBN));
    console.log('idoUserBuyLimitBN:', idoUserBuyLimitBN);
    return grades.map((g, i) => ({
      label: (
        <div key={i} className="imo_opt">
          <span>
            {formatDecimals(capped.multipliedBy(g).multipliedBy(idoUserBuyLimitBN))} {tokenSymbol}
          </span>
          <span>{formatDecimals(totalSupplyBN.multipliedBy(g).multipliedBy(idoUserBuyLimitBN))} TOKEN</span>
        </div>
      ),
      value: parseFloat(formatDecimals(capped.multipliedBy(g).multipliedBy(idoUserBuyLimitBN))),
    }));
  }, [capped, idoUserBuyLimitBN, totalSupplyBN]);

  const onConfirm = useCallback(async () => {
    if (!idoBuy || !idoQueueDetail) return;
    try {
      setConfirming(true);
      // TODO
      await idoBuy(idoQueueDetail?.contractAddress, new BigNumber(selected));
      setOpen(false);
      message.success('Participate Successful');
    } catch (error) {
      console.error(error);
      message.error('Participate Failed');
    } finally {
      setConfirming(false);
    }
  }, [idoQueueDetail, idoBuy, selected]);

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
              <span className="text-white font-OCR text-base leading-[18px]">Contribute</span>
              <ITooltip
                className="h-[12px] "
                placement="bottom"
                title={`${
                  (Number(formatDecimals(capped)) / 7) * 6
                } ${tokenSymbol} will be used to create liquidity pair while${Number(
                  Number(formatDecimals(capped)) / 7,
                )}  ${tokenSymbol} is collected as IMO platform fee.`}
                color="#fff"
                bgColor="#396D93"
              />
            </div>
            <p className="whitespace-pre font-OCR text-white text-base leading-[18px]">{`Total IDO raise is always\ncapped at ${formatDecimals(
              capped,
            )} ${tokenSymbol}`}</p>
          </div>
          <Radio.Group
            className="memoo_radio_group mt-[28px] mb-[28px] grid grid-cols-3"
            options={options}
            onChange={(e) => setSelected(e.target.value)}
            value={selected}
            optionType="button"
          />
          <p className="whitespace-pre font-OCR text-[#4889B7] text-[10px] leading-[14px]">{`Contribution capped at ${formatDecimals(
            maxContributed,
          )} ${tokenSymbol} per wallet: To counteract potential centralization,\nindividual wallet holding limits will be established, ensuring that every purchasing\nentity's holding is limited to maximum of ${idoUserBuyLimitBN
            .multipliedBy(100)
            .toString()}% percentage of the total supply.`}</p>
          <Checkbox
            className="font-OCR text-[12px] text-[#4889B7] my-[24px]"
            onChange={(e) => setAccepted(e.target.checked)}
          >
            I accept MeMoo’s <a className="contents text-green">Terms & Conditions.</a>
          </Checkbox>
          <Button disabled={!accepted} className="memoo_button mt-4 h-[50px]" loading={confirming} onClick={onConfirm}>
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

ImoParticipationModal.displayName = ImoParticipationModal.name;

export default ImoParticipationModal;
