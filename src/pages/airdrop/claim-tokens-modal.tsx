import { Button, Checkbox, Input, Modal, Progress, Slider } from 'antd';
import { Children, FC, Fragment, ReactNode, cloneElement, isValidElement, useState } from 'react';
import './claim-tokens-modal.scss';

const ClaimTokensModal: FC<{ children: ReactNode; stage: '1st' | '2nd' }> = ({ children, stage }) => {
  const [open, setOpen] = useState(false);

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
              <p className="whitespace-pre font-OCR text-base leadings-[18px] text-white">{`Redeem ${stage} 50%\nunlocked tokens`}</p>
              <img className="w-[111px] object-contain" src="/create/img-claim.png" />
            </div>
            <div className="flex items-center gap-x-[14px]">
              {stage === '1st' && (
                <>
                  <div className="flex flex-col items-end">
                    <span className="font-404px text-white text-[24px] leadings-[29px]">14 days</span>
                    <span className="font-OCR text-white text-base leadings-[21px]">Next Unlock</span>
                  </div>
                  <img className="w-[50px]" src="/create/icon-claim-unlock.png" />
                </>
              )}
              {stage === '2nd' && (
                <>
                  <div className="flex flex-col items-end">
                    <span className="font-404px text-white text-[24px] leadings-[29px]">
                      {Number(250000000).toLocaleString()}
                    </span>
                    <span className="font-OCR text-white text-base leadings-[21px]">Claim Completed</span>
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
                {Number(250000000).toLocaleString()}
              </span>
            }
          />
          <Button className="memoo_button mt-[77px] h-[50px]">Confirm</Button>
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
