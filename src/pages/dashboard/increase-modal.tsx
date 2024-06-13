import { useState, Children, cloneElement, isValidElement, useMemo, useCallback, useEffect } from 'react';

import './increase-modal.scss';
import { Modal, Button, Checkbox, Tooltip, message } from 'antd';
import { IconClose, IconETH, IconTip } from '@/components/icons';
import MySlider from '@/components/MySlider';
import { formatEther } from 'ethers';
import { useManageContract } from '@/hooks/useManageContract';
import BigNumber from 'bignumber.js';
import { compareAddrs, formatDecimals, formatNumberDecimal } from '@/utils';
import { getTokenDetail } from '@/api/token';
import { getMeMemo } from '@/api/common';
const IncreaseModal = ({ children, ticker }: any) => {
  const [open, setOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [balances, setBalances] = useState(0);
  const [ethAmout, setEthAmout] = useState(0);
  const {
    config: memooConfig,
    idoBuy,
    unlockMeme,
    defaultConfig,
    airdropClaim,
    getCanUnlockCount,
    memeUnlockPeriods,
  } = useManageContract();

  const [idoPrice, setIdoPrice] = useState(0);
  const [totalCap, setTotalCap] = useState(0);
  const [tokenDetail, setTokenDetail] = useState<any>();
  const [proportion, setProportion] = useState(0);
  const [result, setResult] = useState(0);

  const firstProportion = useMemo(() => Number(memooConfig?.allocation.creator) / 10000, [memooConfig]);

  const maxProportion = useMemo(() => Number(memooConfig?.idoCreatorBuyLimit) / 10000, [memooConfig]);

  const firstIncrease = useMemo(() => {
    if (!memooConfig || !defaultConfig) return 0;

    const totalSupplyBN = new BigNumber(Number(defaultConfig?.totalSupply)).dividedBy(
      10 ** defaultConfig?.defaultDecimals,
    );
    const idoPriceBN = new BigNumber(Number(defaultConfig?.idoPrice)).dividedBy(10 ** defaultConfig?.defaultDecimals);
    const result = totalSupplyBN.multipliedBy(idoPriceBN).multipliedBy(firstProportion);
    return parseFloat(formatDecimals(result));
  }, [memooConfig, firstProportion, defaultConfig]);

  const maxIncrease = useMemo(
    () => parseFloat(formatDecimals(firstIncrease * (maxProportion / firstProportion))),
    [firstProportion, maxProportion, firstIncrease],
  );
  useEffect(() => {
    setProportion(firstProportion * 100);
  }, [firstProportion]);
  useEffect(() => {
    const increasePercent = proportion / 100;
    const result = parseFloat(formatDecimals(firstIncrease * (increasePercent / firstProportion)));
    console.log('increasing proportion:', result);
    setResult(result);
  }, [proportion, firstProportion, firstIncrease]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // For testin: BigEgg or NewCake
        const { data } = await getTokenDetail(ticker);
        const { data: meme } = await getMeMemo(ticker);
        console.log('meme:', meme);
        const balance = meme.reduce((acc, item) => acc + Number(item.balance), 0);
        const ethAmout = meme.reduce((acc, item) => acc + Number(item.ethAmout), 0);
        setBalances(balance ?? 0);
        setEthAmout(ethAmout ?? 0);
        console.log('balance:', balance);
        console.log('ethAmout:', ethAmout);
        setTokenDetail(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [ticker]);
  const handleConfirm = useCallback(async () => {
    if (!idoBuy) return;
    try {
      setLoading(true);
      await idoBuy(tokenDetail.contractAddress, new BigNumber(result - firstIncrease));
      setOpen(false);
      message.success('Buy Successful');
    } catch (error) {
      console.error(error);
      message.error('Buy Failed');
    } finally {
      setLoading(false);
    }
  }, [idoBuy, tokenDetail, result, firstIncrease]);

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
              min={firstProportion}
              max={maxProportion}
              minPrice={firstIncrease}
              maxPrice={maxIncrease}
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
