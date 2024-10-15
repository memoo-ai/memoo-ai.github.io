import { Button, Checkbox, Input, Modal, Progress, Slider } from 'antd';
import message from '@/components/IMessage';
import './current-total-points-modal.scss';
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
import { formatAddress, isEven } from '@/utils';
import { IconJoin } from '@/components/icons';
import { SearchUserRanking } from '@/types';

type ChildWithOnClick = ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
const CurrentTotalPointsModal: FC<{
  children: ReactNode;
  onResult?: (isSuccess: boolean) => void;
  data: SearchUserRanking[];
  keyword: string;
}> = ({ children, keyword, onResult, data }) => {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);

  // const [data, setData] = useState([
  //   {
  //     address: '0x0000000000000000000000000000000000000001',
  //     icon: '/join/icon.png',
  //     totalPoints: '23256461531',
  //   },
  //   {
  //     address: '0x0000000000000000000000000000000000000002',
  //     icon: '/join/icon.png',
  //     totalPoints: '23256461531',
  //   },
  //   {
  //     address: '0x0000000000000000000000000000000000000003',
  //     icon: '/join/icon.png',
  //     totalPoints: '23256461531',
  //   },
  //   {
  //     address: '0x0000000000000000000000000000000000000004',
  //     icon: '/join/icon.png',
  //     totalPoints: '23256461531',
  //   },
  //   {
  //     address: '0x0000000000000000000000000000000000000005',
  //     icon: '/join/icon.png',
  //     totalPoints: '23256461531',
  //   },
  //   {
  //     address: '0x0000000000000000000000000000000000000006',
  //     icon: '/join/icon.png',
  //     totalPoints: '23256461531',
  //   },
  //   {
  //     address: '0x0000000000000000000000000000000000000007',
  //     icon: '/join/icon.png',
  //     totalPoints: '23256461531',
  //   },
  // ]);

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
        className="min-w-[717px] "
        wrapClassName="memoo_modal"
        title="YOUR CURRENT TOTAL POINTS"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <div className="flex flex-col items-center justify-center w-full mt-[20px]">
          <div className="!w-full">
            <div className="flex items-center justify-between px-[44px] mb-[10px]">
              <th className="font-OCR text-[#07E993] text-[12px] leading-[20px] text-left">Rank</th>
              <th className="w-[40px]" />
              <th className="font-OCR text-[#07E993] text-[12px] leading-[20px] text-left w-[168px] pl-[48px]">
                Address
              </th>
              <th className="font-OCR text-[#07E993] text-[12px] leading-[20px] text-left  w-[196px] pl-[38px]">
                Total Points
              </th>
            </div>
            <div className="w-full flex flex-col gap-y-[5px]">
              {data &&
                data.length > 0 &&
                data.map((item, index) => (
                  <th
                    key={index}
                    className={`flex items-center justify-between py-[9px] px-[44px] bg-[#2B526E] rounded-[7px] ${keyword === item.address ? 'search-active' : ''}`}
                  >
                    <tr className="font-OCR text-white text-[18px] leading-[20px]">{item.rank}</tr>
                    <tr className="w-[40px]">
                      {keyword === item.address ? <img src="/join/arrow.png" alt="" /> : <th className="w-[40px]" />}
                    </tr>
                    <tr className="flex items-center gap-x-[18px] font-OCR text-white text-[18px] leading-[20px] w-[168px]">
                      <img className="w-[30px] h-[30px] rounded-[50%]" src={item.profileImage} />
                      {formatAddress(item.address)}
                    </tr>
                    <tr>
                      <div className="flex items-center justify-start gap-x-[7px] bg-[#2C1844] px-[10px] h-[42px] rounded-[50px] join-border w-[196px]">
                        <IconJoin />
                        <span className="text-[18px] text-[#EBCDFE] leading-[20px] font-OCR">
                          {Number(item.score).toLocaleString()}
                        </span>
                      </div>
                    </tr>
                  </th>
                ))}
            </div>
          </div>
          <Button
            className="memoo_button h-[50px] w-full mt-[15px]"
            onClick={() => setOpen(false)}
            loading={confirming}
          >
            <span className="!text-[16px]">BACK TO SCOREBOARD</span>
          </Button>
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

CurrentTotalPointsModal.displayName = CurrentTotalPointsModal.name;

export default CurrentTotalPointsModal;
