import { Button, Checkbox, Input, Modal, Progress, Slider } from 'antd';
import message from '@/components/IMessage';
import {
  Children,
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
type ChildWithOnClick = ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
const EnterReferralCodeModal: FC<{ children: ReactNode; onResult?: (isSuccess: boolean) => void; code: string }> = ({
  children,
  code,
  onResult,
}) => {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const onConfirm = useCallback(async () => {
    try {
      setConfirming(true);
      // await message.success('Congratulations! You have successfully claimed your bonus points.');
      onResult?.(true);
      setConfirming(false);
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setConfirming(false);
    }
  }, []);
  const handleChildClick = async (e: React.MouseEvent, existingOnClick?: (e: React.MouseEvent) => any) => {
    if (existingOnClick) {
      const result = await existingOnClick(e);
      if (result !== undefined && result) {
        setOpen(true);
      }
    }
  };

  return (
    <>
      <Modal
        className="min-w-[469px] "
        wrapClassName="memoo_modal"
        title="YOUR CURRENT TOTAL POINTS"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <div className="flex flex-col items-center justify-center">
          <img className="mt-[-6px] w-[100px] h-[72.39px]" src="/join/coupon.png" alt="" />
          <h5 className="join-modal-title">CLAIM YOUR BONUS POINTS</h5>
          <p className="font-OCR text-[13px] leading-[18px] text-white whitespace-pre-wrap">
            Claim your bonus 100 points on entering referral code.
          </p>
          <div className="flex gap-x-[3.3px] items-center mt-[21px]">
            <Input
              className="flex-1 w-[214.6px]  h-[50px] code-input font-404px text-[16px] leading-[16px]"
              placeholder="REFERRAL CODE..."
              value={code ?? ''}
            />
            <Button className="memoo_button h-[50px] w-[214.6px] " onClick={onConfirm} loading={confirming}>
              <span className="!text-[16px]">ENTER REFERRAL CODE</span>
            </Button>
          </div>
        </div>
      </Modal>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          const existingOnClick = (child as ChildWithOnClick).props.onClick;
          return cloneElement(child as ChildWithOnClick, {
            onClick: (e: React.MouseEvent) => handleChildClick(e, existingOnClick),
          });
        }
        return child;
      })}
    </>
  );
};

EnterReferralCodeModal.displayName = EnterReferralCodeModal.name;

export default EnterReferralCodeModal;
