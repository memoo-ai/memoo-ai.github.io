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
} from 'react';
import './claim-tokens-modal.scss';
import { AirdropContext } from '.';

const ClaimTokensModal: FC<{
  children: ReactNode;
  stage: '1st' | '2nd';
  lockinPeriod?: number;
  tokens: number;
  rate?: number;
  unlockTokens?: number;
}> = ({ children, stage, lockinPeriod, tokens, unlockTokens, rate }) => {
  const [open, setOpen] = useState(false);
  const { unlockMeme, idoQueueDetail } = useContext(AirdropContext);
  const [confirming, setConfirming] = useState(false);

  const onConfirm = useCallback(async () => {
    if (!unlockMeme || !idoQueueDetail) return;
    try {
      setConfirming(true);
      await unlockMeme(idoQueueDetail.contractAddress);
      setOpen(false);
      message.success('Unlock Successful');
    } catch (error) {
      console.error(error);
      message.error('Unlock Failed');
    } finally {
      setConfirming(false);
    }
  }, [unlockMeme, idoQueueDetail]);

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
              <p className="whitespace-pre font-OCR text-base leading-[18px] text-white">{`Redeem ${stage} ${rate}%\nunlocked tokens`}</p>
              <img className="w-[111px] object-contain" src="/create/img-claim.png" />
            </div>
            <div className="flex items-center gap-x-[14px]">
              {stage === '1st' && (
                <>
                  <div className="flex flex-col items-end">
                    <span className="font-404px text-white text-[24px] leading-[29px]">{lockinPeriod} days</span>
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
          <Button loading={confirming} className="memoo_button mt-[77px] h-[50px]" onClick={onConfirm}>
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

ClaimTokensModal.displayName = ClaimTokensModal.name;

export default ClaimTokensModal;
