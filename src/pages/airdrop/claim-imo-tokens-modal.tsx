import { Button, Checkbox, Input, Modal, Progress, Slider, message } from 'antd';
import {
  Children,
  FC,
  Fragment,
  ReactNode,
  cloneElement,
  isValidElement,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import './airdrop-claim-modal.scss';
import { AirdropContext } from '.';
import { BN } from '@coral-xyz/anchor';
import BigNumber from 'bignumber.js';
import { getNumberOrDefault } from '@/utils';
const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
const ClaimImoTokensModal: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const { idoQueueDetail, idoClaim, solanaMemeConfig, memeUserData, memooConfig, mine } = useContext(AirdropContext);

  const userCanClaimCount = useMemo(() => {
    if (!memeUserData) return 0;

    const memeUserIdoClaimedCount = new BigNumber(memeUserData?.memeUserIdoClaimedCount.toString()).dividedBy(10 ** 9);
    const memeUserIdoCount = new BigNumber(Number(memeUserData.memeUserIdoCount.toString())).dividedBy(10 ** 9);
    const result = memeUserIdoCount.minus(memeUserIdoClaimedCount);
    console.log('userCanClaimCount: ', result.toString());
    return result.toString();
  }, [memeUserData]);

  const userImoPrice = useMemo(() => {
    if (!memeUserData || !memooConfig) return 0;
    const idoPrice = new BigNumber(Number(memooConfig.idoPrice.toString())).dividedBy(10 ** 9);
    console.log('memeUserIdoCountidoPrice: ', idoPrice.toString());

    const memeUserIdoCount = new BigNumber(Number(memeUserData.memeUserIdoCount.toString())).dividedBy(10 ** 9);
    console.log('memeUserIdoCount: ', memeUserIdoCount.toString());
    const result = memeUserIdoCount.times(idoPrice);
    console.log('userImoPrice: ', result.toString());
    return result.toString();
  }, [memeUserData, memooConfig]);

  const onConfirm = useCallback(async () => {
    if (!idoClaim || !idoQueueDetail || !solanaMemeConfig) return;
    try {
      setConfirming(true);
      const tx = await idoClaim(solanaMemeConfig?.memeConfigId, solanaMemeConfig?.mintaPublickey);
      console.log('idoClaim tx:', tx);
      if (tx) {
        setOpen(false);
        message.success('Claim Successful');
      }
    } catch (error) {
      console.error(error);
      message.error('Claim Failed');
    } finally {
      setConfirming(false);
    }
  }, [idoClaim, idoQueueDetail, solanaMemeConfig]);

  return (
    <>
      <Modal
        className="min-w-[604px]"
        wrapClassName="memoo_modal"
        title="IMO ALLOCATION UNLOCKED"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <div className="airdrop_claims flex flex-col">
          <div className="flex flex-col items-center gap-y-[18px]">
            <img className="w-[111px] object-contain" src="/create/img-claim.png" />
            <span className="font-404px text-[32px] text-green">{idoQueueDetail?.ticker} has arrived!</span>
            <p className="whitespace-pre font-OCR text-base leading-[18px] text-white text-center">
              {/* For your participation of {idoQueueDetail?.contributed} {tokenSymbol} in {idoQueueDetail?.tokenName} IMO,{' '} */}
              For your participation of {userImoPrice} {tokenSymbol} in {idoQueueDetail?.tokenName} IMO, <br /> your can
              now unlock you allocation below.
            </p>
          </div>
          <div className="relative mt-[26px]">
            <img
              className="absolute left-[25px] top-[50%] translate-y-[-50%] z-10"
              src="/create/icon-airdrop-unlock.png"
            />
            <div className="memoo_input h-[66px] font-404px text-white text-[24px] text-center flex items-center justify-center">
              <img className="w-[50px] h-[50px] rounded-[50%]" src={idoQueueDetail?.icon} alt="" />{' '}
              {/* <span>&nbsp;{(idoQueueDetail?.imoBalance ?? 0) - (idoQueueDetail?.claimImoBalance ?? 0)} &nbsp;</span> */}
              <span>&nbsp;{userCanClaimCount} &nbsp;</span>
              <span>{idoQueueDetail?.ticker}</span>
            </div>
          </div>
          <Button
            className="memoo_button mt-4 h-[50px]"
            onClick={onConfirm}
            loading={confirming}
            disabled={getNumberOrDefault(Number(idoQueueDetail?.count).toLocaleString()) <= 0 || mine}
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

ClaimImoTokensModal.displayName = ClaimImoTokensModal.name;

export default ClaimImoTokensModal;
