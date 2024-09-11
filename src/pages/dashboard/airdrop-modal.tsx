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
import { Modal, Button, message, Input } from 'antd';
import { IconLock, IconClose, IconCompleted } from '@/components/icons';
import { useManageContract } from '@/hooks/useManageContract';
import { useSign } from '@/hooks/useEthers';
import { myAirdropDetail } from '@/api/airdrop';
import BigNumber from 'bignumber.js';
import { CollectorContext } from './collector';
import { getNumberOrDefault, base64ToUint8Array } from '@/utils';
import { useSolana } from '@/hooks/useSolana';
import { PublicKey } from '@solana/web3.js';

type ChildWithOnClick = ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;

const AirdropModal = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  // const { getSign } = useSign();
  const { idoLaunchedDetail, solanaMemeConfig, airdropClaim, memeUserData } = useContext(CollectorContext);
  const { getSign } = useSolana();

  const airdropCanClaimCount = useMemo(() => {
    if (!idoLaunchedDetail || !memeUserData) return 0;
    const userClaimAirdropCount = new BigNumber(memeUserData?.memeUserAirdropClaimedCount.toString()).dividedBy(
      10 ** 9,
    );
    const result = Number(idoLaunchedDetail?.count) - Number(userClaimAirdropCount);
    console.log('airdropCanClaimCount:', result);
    return result;
  }, [idoLaunchedDetail, memeUserData]);

  const onConfirm = useCallback(async () => {
    if (!airdropClaim || !idoLaunchedDetail || !solanaMemeConfig) return;
    try {
      setConfirming(true);
      const res = await getSign();
      const { data } = await myAirdropDetail({
        ticker: idoLaunchedDetail?.ticker ?? '',
        signature: res?.rawSignature ?? '',
        timestap: res?.msg ?? '',
        chain: 'Solana',
      });

      const tx = await airdropClaim(
        solanaMemeConfig?.memeConfigId,
        solanaMemeConfig?.mintaPublickey,
        base64ToUint8Array(data?.hexMessage),
        base64ToUint8Array(data?.hexSignature),
        new PublicKey(data?.signPublickey),
      );
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
  }, [airdropClaim, idoLaunchedDetail]);
  return (
    <div>
      <Modal
        title=""
        open={open}
        onOk={() => {}}
        wrapClassName="memoo_modal"
        onCancel={() => {
          setOpen(false);
        }}
        width={604}
        destroyOnClose
        footer={null}
        closeIcon={<IconClose className="close" />}
      >
        <div className="confirm_title">Airdrop Unlocked</div>
        <div className="confirm_content">
          <img className="mt-[15px]" src="./dashboard/reward.svg" alt="" />
          <div className="font-404px text-[32px] text-green mt-[18px]">{idoLaunchedDetail?.tokenName} has arrived!</div>
          <div className="confirm_content_describe mt-[18px]">
            Thanks for being part of the <br /> {idoLaunchedDetail?.tokenName} community.
          </div>
          <div className="relative mt-[26px] w-[100%]">
            <IconLock
              className="absolute left-[25px] top-[50%] translate-y-[-50%] z-10"
              color="#07E993"
              bgColor="#2B526E"
            />
            <Input
              className="memoo_input h-[66px] font-404px text-white text-[24px] text-center"
              // value={`${Number(idoLaunchedDetail?.count).toLocaleString()} ${idoLaunchedDetail?.tokenName}`}
              value={`${Number(airdropCanClaimCount).toLocaleString()} ${idoLaunchedDetail?.tokenName}`}
            />
          </div>
          <Button
            className="mt-[16px] memoo_button w-[100%] h-[50px]"
            onClick={onConfirm}
            loading={confirming}
            // disabled={getNumberOrDefault(Number(idoLaunchedDetail?.count).toLocaleString()) === 0}
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
export default AirdropModal;
