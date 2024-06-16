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
} from 'react';
import './airdrop-claim-modal.scss';
import { AirdropContext } from '.';
import { myAirdropDetail } from '@/api/airdrop';
import { useSign } from '@/hooks/useEthers';
import { useManageContract } from '@/hooks/useManageContract';
import BigNumber from 'bignumber.js';

const AirdropClaimModal: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const { idoLaunchedDetail, airdropClaim } = useContext(AirdropContext);
  const { getSign } = useSign();
  const onConfirm = useCallback(async () => {
    if (!airdropClaim || !idoLaunchedDetail) return;
    try {
      setConfirming(true);
      const res = await getSign();
      const { data } = await myAirdropDetail({
        ticker: idoLaunchedDetail?.ticker ?? '',
        signature: res?.rawSignature ?? '',
        timestap: res?.msg ?? '',
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
    <>
      <Modal
        className="min-w-[604px]"
        wrapClassName="memoo_modal"
        title="Airdrop Unlocked"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <div className="airdrop_claims flex flex-col">
          <div className="flex flex-col items-center gap-y-[18px]">
            <img className="w-[111px] object-contain" src="/create/img-claim.png" />
            <span className="font-404px text-[32px] text-green">WIF has arrived!</span>
            <p className="whitespace-pre font-OCR text-base leading-[18px] text-white text-center">{`Thanks for being part of the\nDogwifhat community.`}</p>
          </div>
          <div className="relative mt-[26px]">
            <img
              className="absolute left-[25px] top-[50%] translate-y-[-50%] z-10"
              src="/create/icon-airdrop-unlock.png"
            />
            <Input
              className="memoo_input h-[66px] font-404px text-white text-[24px] text-center"
              value={Number(idoLaunchedDetail?.count).toLocaleString()}
            />
          </div>
          <Button className="memoo_button mt-4 h-[50px]" onClick={onConfirm} loading={confirming}>
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

AirdropClaimModal.displayName = AirdropClaimModal.name;

export default AirdropClaimModal;
