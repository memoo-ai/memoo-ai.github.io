import React, {
  ReactElement,
  useState,
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useCallback,
  useContext,
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

const AirdropModal = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const { airdropClaim } = useManageContract();
  const [confirming, setConfirming] = useState(false);
  const { getSign } = useSign();
  const { idoLaunchedDetail } = useContext(CollectorContext);

  const onConfirm = useCallback(async () => {
    if (!airdropClaim || !idoLaunchedDetail) return;
    try {
      setConfirming(true);
      const res = await getSign();
      const { data } = await myAirdropDetail({
        ticker: idoLaunchedDetail?.ticker ?? '',
        signature: res?.rawSignature ?? '',
        timestap: res?.msg ?? '',
        chain: 'Ethereum',
      });
      console.log('contractAddress:', idoLaunchedDetail?.contractAddress);
      console.log('airdropCount:', new BigNumber(data?.airdropCount));
      console.log('jsonData:', data?.jsonData);
      console.log('signature:', data?.signature);
      await airdropClaim(
        idoLaunchedDetail?.contractAddress,
        new BigNumber(data?.airdropCount),
        // data?.hexMessage,
        // data?.hexSignature,
        `0x${data?.hexMessage}`,
        `0x${data?.hexSignature}`,
        // `0x${data?.jsonData}`,
        // data?.signature,
      );
      // setOpen(false);
      // message.success('Claim Successful');
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
          <div className="confirm_content_title mt-[18px]">{idoLaunchedDetail?.tokenName} has arrived!</div>
          <div className="confirm_content_describe mt-[18px]">Thanks for being part of the Dogwifhat community.</div>
          <div className="confirm_content_wif">
            <IconLock className="airdrop_lock" color="#07E993" bgColor="#2B526E" />{' '}
            {getNumberOrDefault(Number(idoLaunchedDetail?.count).toLocaleString())}
            {/* {idoLaunchedDetail?.count} */}
          </div>
          <Button
            className="mt-[16px] memoo_button w-[100%] h-[50px]"
            onClick={onConfirm}
            loading={confirming}
            disabled={getNumberOrDefault(Number(idoLaunchedDetail?.count).toLocaleString()) === 0}
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
