import React, {
  ReactElement,
  useState,
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react';

import './airdrop-modal.scss';
import { Modal, Button, message } from 'antd';
import { IconLock, IconClose, IconCompleted } from '@/components/icons';
import { useManageContract } from '@/hooks/useManageContract';
import { useSign } from '@/hooks/useEthers';
import { myAirdropDetail } from '@/api/airdrop';
import BigNumber from 'bignumber.js';
import { CollectorContext } from './collector';
import { getNumberOrDefault } from '@/utils';

type ChildWithOnClick = ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
const ClaimImoTokensModal = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const { idoLaunchedDetail, solanaMemeConfig, idoClaim, memeUserData, memooConfig } = useContext(CollectorContext);

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
    const idoPrice = new BigNumber(Number(memooConfig.idoPrice.toString())).dividedBy(10 ** 10);
    console.log('memeUserIdoCountidoPrice: ', idoPrice.toString());

    const memeUserIdoCount = new BigNumber(Number(memeUserData.memeUserIdoCount.toString())).dividedBy(10 ** 9);
    console.log('memeUserIdoCount: ', memeUserIdoCount.toString());
    const result = memeUserIdoCount.times(idoPrice);
    console.log('userImoPrice: ', result.toString());
    return result.toString();
  }, [memeUserData, memooConfig]);

  const onConfirm = useCallback(async () => {
    if (!idoClaim || !idoLaunchedDetail || !solanaMemeConfig) return;
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
  }, [idoClaim, idoLaunchedDetail, solanaMemeConfig]);
  return (
    <div>
      <Modal
        title=""
        open={open}
        wrapClassName="memoo_modal"
        onOk={() => {}}
        onCancel={() => {
          setOpen(false);
        }}
        width={604}
        destroyOnClose
        footer={null}
        closeIcon={<IconClose className="close" />}
      >
        <div className="confirm_title">IMO ALLOCATION UNLOCKED</div>
        <div className="confirm_content">
          <img className="mt-[15px]" src="./dashboard/reward.svg" alt="" />
          <div className="confirm_content_title mt-[18px]">{idoLaunchedDetail?.tokenName} has arrived!</div>
          <div className="confirm_content_describe mt-[18px]">
            For your participation of {userImoPrice} {tokenSymbol} in {idoLaunchedDetail?.tokenName} IMO, <br /> you can
            now unlock you allocation below.
          </div>
          <div className="relative mt-[26px] w-full">
            <IconLock className="absolute left-[25px] top-[50%] translate-y-[-50%] z-10" />
            <div className="memoo_input h-[66px] font-404px text-white text-[24px] text-center flex items-center justify-center">
              <img className="w-[50px] h-[50px] rounded-[50%]" src={idoLaunchedDetail?.icon} alt="" />{' '}
              <span>&nbsp;{userCanClaimCount} &nbsp;</span>
              <span>{idoLaunchedDetail?.ticker}</span>
            </div>
          </div>
          <Button
            className="mt-[16px] memoo_button w-[100%] h-[50px]"
            onClick={onConfirm}
            loading={confirming}
            disabled={getNumberOrDefault(Number(userCanClaimCount)) === 0}
          >
            CLAIM ALL
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
export default ClaimImoTokensModal;
