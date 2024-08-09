import React, {
  ReactElement,
  useState,
  Children,
  cloneElement,
  isValidElement,
  useContext,
  useCallback,
  useMemo,
} from 'react';

import './claim-modal.scss';
import { Modal, Button, message, Input } from 'antd';
import { IconLock, IconClose, IconCompleted } from '@/components/icons';
import BigNumber from 'bignumber.js';
import { useAccount } from 'wagmi';
import { formatDecimals, formatRestTime, getNumberOrDefault } from '@/utils';
import { CreatorContext } from './creator';
import { BN } from '@coral-xyz/anchor';

type ChildWithOnClick = ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;

const ClaimModal = ({ children }: any) => {
  const { address } = useAccount();
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const { creatorClaim, stage, idoQueueDetail, solanaMemeConfig, unlockTimestamp, memeUserData } =
    useContext(CreatorContext);

  const tokens = useMemo(() => {
    if (!memeUserData) return 0;
    const creatorLockCountPermission = new BN(memeUserData.creatorLockCountPermission);
    const creatorLockCount = new BN(memeUserData.creatorLockCount);
    const result = creatorLockCountPermission.sub(creatorLockCount);
    return parseFloat(formatDecimals(result.toString()));
  }, [memeUserData]);

  const unlockTokens = useMemo(() => {
    if (!memeUserData) return 0;
    return Number(memeUserData?.memeUserIdoClaimedCount);
  }, [memeUserData]);

  const onConfirm = useCallback(async () => {
    if (!creatorClaim || !idoQueueDetail || !address || !solanaMemeConfig) return;
    try {
      setConfirming(true);
      await creatorClaim(solanaMemeConfig?.memeConfigId, solanaMemeConfig?.mintaPublickey);
      setOpen(false);
      message.success('Unlock Successful');
    } catch (error) {
      console.error(error);
      message.error('Unlock Failed');
    } finally {
      setConfirming(false);
    }
  }, [creatorClaim, idoQueueDetail, solanaMemeConfig, address]);

  return (
    <div>
      <Modal
        className="min-w-[604px]"
        wrapClassName="memoo_modal"
        title=""
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
        closeIcon={<IconClose className="close" />}
      >
        <div className="modal_title">Claim Tokens</div>
        <div className="claim_tokens flex flex-col">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-[15px]">
              <p className="whitespace-pre font-OCR text-base leading-[18px] text-white">{`Redeem ${stage} ${50}%\nunlocked tokens`}</p>
              <img className="w-[111px] object-contain" src="/create/img-claim.png" />
            </div>
            <div className="flex items-center gap-x-[14px]">
              {stage === '1st' && (
                <>
                  <div className="flex flex-col items-end">
                    <span className="font-404px text-white text-[24px] leading-[29px]">
                      {formatRestTime(unlockTimestamp!) ?? '14 DAYS'}
                    </span>
                    <span className="font-OCR text-white text-base leading-[21px]">Next Unlock</span>
                  </div>
                  <img className="w-[50px]" src="/create/icon-claim-unlock.png" />
                </>
              )}
              {stage === '2nd' && (
                <>
                  <div className="flex flex-col items-end">
                    <span className="font-404px text-white text-[24px] leading-[29px]">
                      {Number(unlockTokens).toLocaleString()}
                    </span>
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
            placeholder="Claimable LEASH"
            suffix={
              <span className="text-[24px] text-white font-404px leading-[22px]">
                {Number(tokens).toLocaleString()}
              </span>
            }
          />
          <Button loading={confirming} className="memoo_button w-[100%] mt-[77px] h-[50px]" onClick={onConfirm}>
            Confirm
          </Button>
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
    </div>
  );
};
export default ClaimModal;
