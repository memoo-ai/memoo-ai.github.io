import { Button, Checkbox, Input, Modal, Progress, Slider } from 'antd';
import { Children, FC, Fragment, ReactNode, cloneElement, isValidElement, useState } from 'react';
import './airdrop-claim-modal.scss';

const AirdropClaimModal: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

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
            <p className="whitespace-pre font-OCR text-base leadings-[18px] text-white text-center">{`Thanks for being part of the\nDogwifhat community.`}</p>
          </div>
          <div className="relative mt-[26px]">
            <img
              className="absolute left-[25px] top-[50%] translate-y-[-50%] z-10"
              src="/create/icon-airdrop-unlock.png"
            />
            <Input
              className="memoo_input h-[66px] font-404px text-white text-[24px] text-center"
              value={Number(250000000).toLocaleString()}
            />
          </div>
          <Button className="memoo_button mt-4 h-[50px]">Confirm</Button>
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
