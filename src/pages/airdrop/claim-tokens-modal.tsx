/* eslint-disable no-debugger */
import { Button, Checkbox, Input, Modal, Progress, Slider, message } from 'antd';
import {
  Children,
  FC,
  Fragment,
  ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
  useContext,
  useState,
  useMemo,
} from 'react';
import './claim-tokens-modal.scss';
import { AirdropContext } from '.';
import BigNumber from 'bignumber.js';

const ClaimTokensModal: FC<{
  children: ReactNode;
  stage: '1st' | '2nd';
  lockinPeriod?: string;
  tokens: number;
  rate?: number;
  unlockTokens?: number;
}> = ({ children, stage, lockinPeriod, tokens, unlockTokens, rate }) => {
  const [open, setOpen] = useState(false);
  const { creatorClaim, creatorClaimAll, idoQueueDetail, solanaMemeConfig, memeUserData, triggerRefresh } =
    useContext(AirdropContext);
  const [confirming, setConfirming] = useState(false);

  const unLockTokens = useMemo(() => {
    if (!memeUserData) return 0;
    const result = new BigNumber(memeUserData?.memeUserIdoClaimedCount.toString()).dividedBy(10 ** 9);
    return Number(result);
  }, [memeUserData]);

  const userCanClaimCount = useMemo(() => {
    if (!memeUserData) return 0;

    const memeUserIdoClaimedCount = new BigNumber(memeUserData?.memeUserIdoClaimedCount.toString()).dividedBy(10 ** 9);
    const memeUserIdoCount = new BigNumber(Number(memeUserData.memeUserIdoCount.toString())).dividedBy(10 ** 9);
    const result = memeUserIdoCount.minus(memeUserIdoClaimedCount);
    console.log('userCanClaimCount: ', result.toString());
    return result.toString();
  }, [memeUserData]);

  const onConfirm = useCallback(async () => {
    // debugger;
    if (!creatorClaim || !idoQueueDetail || !solanaMemeConfig || !creatorClaimAll || !triggerRefresh) return;
    try {
      setConfirming(true);
      const tx =
        stage === '1st'
          ? await creatorClaim(solanaMemeConfig?.memeConfigId, solanaMemeConfig?.mintaPublickey)
          : await creatorClaimAll(solanaMemeConfig?.memeConfigId, solanaMemeConfig?.mintaPublickey);
      if (tx) {
        setOpen(false);
        message.success('Unlock Successful');
        triggerRefresh();
      }
    } catch (error) {
      console.error(error);
      message.error('Unlock Failed');
    } finally {
      setConfirming(false);
    }
  }, [creatorClaim, idoQueueDetail, solanaMemeConfig]);

  return (
    <>
      <Modal
        className="min-w-[604px]"
        wrapClassName="memoo_modal"
        title="Claim Tokens"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <div className="claim_tokens flex flex-col">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-[15px]">
              {/* <p className="whitespace-pre font-OCR text-base leading-[18px] text-white">{`Redeem ${stage} ${
                rate ?? 50
              }%\nunlocked tokens`}</p> */}
              <div className="flex items-center gap-x-[12px]">
                <img className="w-[50px] h-[50px] rounded-[50%]" src={idoQueueDetail?.icon} alt="" />
                <div>
                  <p className="font-OCR text-[16px] text-[#fff] leading-[18px]">Claimable</p>
                  <p className="font-404px text-[24px] text-[#fff] leading-[29px]">{idoQueueDetail?.ticker}</p>
                </div>
              </div>
              <img className="w-[111px] object-contain" src="/create/img-claim.png" />
            </div>
            <div className="flex items-center gap-x-[14px]">
              {stage === '1st' && (
                <>
                  <div className="flex flex-col items-end">
                    <span className="font-404px text-white text-[24px] leading-[29px]">{lockinPeriod}</span>
                    <span className="font-OCR text-white text-base leading-[21px]">Next Unlock</span>
                  </div>
                  <img className="w-[50px]" src="/create/icon-claim-unlock.png" />
                </>
              )}
              {stage === '2nd' && (
                <>
                  <div className="flex flex-col items-end">
                    <span className="font-404px text-white text-[24px] leading-[29px]">DONE!</span>
                    <span className="font-OCR text-white text-base leading-[21px]">Claim Completed</span>
                  </div>
                  <img className="w-[50px]" src="/create/icon-claim-done.png" />
                </>
              )}
            </div>
          </div>
          <Input
            disabled
            className="memoo_input h-[66px]"
            placeholder={`Creator Allocation (${stage} 50%)`}
            suffix={
              <span className="text-[24px] text-white font-404px leading-[22px]">
                {Number(tokens).toLocaleString()}
              </span>
            }
          />
          {stage === '2nd' ? (
            <Input
              disabled
              className="memoo_input h-[66px] my-[5px]"
              placeholder="Pre-Market Acquisition"
              suffix={
                <span className="text-[24px] text-white font-404px leading-[22px]">
                  {Number(userCanClaimCount).toLocaleString()}
                </span>
              }
            />
          ) : (
            <div className="h-[66px]" />
          )}
          <Button loading={confirming} className="memoo_button h-[50px]" onClick={onConfirm}>
            CLAIM ALL
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

ClaimTokensModal.displayName = ClaimTokensModal.name;

export default ClaimTokensModal;
