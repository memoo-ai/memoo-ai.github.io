import { useState, Children, cloneElement, isValidElement, useMemo } from 'react';

import './increase-modal.scss';
import { Modal, Button, Checkbox, Tooltip } from 'antd';
import { IconClose, IconETH, IconTip } from '@/components/icons';
import MySlider from '@/components/MySlider';
import { formatEther } from 'ethers';
import { useManageContract } from '@/hooks/useManageContract';
const IncreaseModal = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(5);
  const { config: memooConfig } = useManageContract();
  const [minPercentage, setMinPercentage] = useState(0);
  const [maxPercentage, setMaxPercentage] = useState(0);
  const [memeIdoMinPrice, setMemeIdoMinPrice] = useState(0);
  const [memeIdoMaxPrice, setMemeIdoMaxPrice] = useState(0);
  const [idoPrice, setIdoPrice] = useState(0);
  const [totalCap, setTotalCap] = useState(0);
  useMemo(() => {
    if (!memooConfig) return 0;
    console.log('memooConfig', memooConfig);
    let memeIdoPrice = Number(formatEther(memooConfig?.idoPrice));
    let memeTotalSupply = Number(formatEther(memooConfig?.totalSupply));
    let idoCreatorBuyLimit = Number(formatEther(memooConfig?.idoCreatorBuyLimit));
    let creator = Number(formatEther(memooConfig?.allocation?.creator));
    let minPer = Number(creator / formatEther(10000));
    let maxPer = Number(idoCreatorBuyLimit / formatEther(10000));
    let totalCap = memeIdoPrice * memeTotalSupply;
    setTotalCap(totalCap);
    console.log('memeIdoPrice:', memeIdoPrice);
    console.log('memeTotalSupply:', memeTotalSupply);
    console.log('idoCreatorBuyLimit:', idoCreatorBuyLimit);
    console.log('creator:', creator);
    console.log('totalCap:', totalCap);

    setMinPercentage(minPer);
    setMaxPercentage(maxPer);
    setMemeIdoMinPrice(totalCap * minPer);
    setMemeIdoMaxPrice(totalCap * maxPer);
  }, [memooConfig]);

  const handleConfirm = () => {};
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
              min={minPercentage}
              max={maxPercentage}
              minPrice={memeIdoMinPrice}
              maxPrice={memeIdoMaxPrice}
              value={progress}
              onChange={(value) => {
                setProgress(value);
                setIdoPrice(Number((value * totalCap).toLocaleString()));
              }}
            />
          </div>
        </div>

        <div className="claimable">
          <div className="claimable_left">Pre-Market Acquisition</div>
          <div className="claimable_right">
            <IconETH className="IconETH mr-[22px]" color="#FFFFFF" />
            {idoPrice} ETH
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
        <Button className="custom_ant_btn" disabled={!isAccept} onClick={handleConfirm} loading={loading}>
          CONFIRM
        </Button>
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

export default IncreaseModal;
