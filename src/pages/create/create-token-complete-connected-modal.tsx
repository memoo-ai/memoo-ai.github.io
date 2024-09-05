import { useState, Children, useImperativeHandle, forwardRef, useCallback } from 'react';

import './create-token-complete-connected-modal.scss';
import { Modal, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const CreatedTokenCompleteConnectedModal = forwardRef(({ data, iconUrl }: any, ref) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  useImperativeHandle(ref, () => ({
    setOpen,
  }));

  const renderText = (preLaunchDuration: string) => {
    switch (preLaunchDuration) {
      case 'IMMEDIATE':
        return 'IMMEDIATE TO IMO';
      case '1DAY':
        return '24H TO IMO';
      case '3DAYS':
        return '72H TO IMO';
      default:
        return 'IMMEDIATE';
    }
  };

  return (
    <div>
      <Modal
        title=""
        open={open}
        onOk={() => {}}
        onCancel={() => {
          setOpen(false);
        }}
        closable={false}
        width={576}
        className="create-token-complete-connected-modal"
        footer={null}
      >
        <div className="create-token-complete-connected-modal-content flex items-center justify-center flex-col">
          <img className="mt-[28px] mb-[20px]" src="./create/success.png" alt="" />
          <h3 className="text-center create-token-complete-connected-modal-content-title">Congratulations!</h3>
          <h5 className="text-center text-[#fff] font-OCR text-[14px] mt-[27px]">
            Payment is successful. <br /> You’re on your way to launching your meme token.
          </h5>
          <div
            className="create-token-complete-connected-modal-content-view bg-[#2B526E] rounded-[7px] relative mt-[33px] cursor-pointer"
            onClick={() => navigate(`/airdrop/${data?.ticker}`)}
          >
            <div className="flex items-center  ">
              <img className="w-[84px] h-[84px] rounded-[50%] mr-[11px]" src={iconUrl} alt="" />
              <div>
                <h5 className="font-404px text-[#fff] text-[24px]">{data.tokenName}</h5>
                <span className="font-404px text-[#07E993] text-[16px]">{data.ticker}</span>
              </div>
            </div>
            {/* <span className="absolute bottom-2 right-5 text-[#7D83B5] text-[10px] font-OCR">View Token Profile</span> */}
          </div>
          <h5 className="text-center text-[#fff] font-OCR text-[11px] mt-[21px] whitespace-nowrap">
            Don’t worry if you can’t find your Creator’s Allocation in your wallet at <br /> the moment. You will only
            receive your 5% of token supply post TGE after <br /> certain criterias are met. Proceed to your meme token
            page for more details.
          </h5>
          <div className="flex justify-between w-[100%] font-404px text-[18px] text-[#07E993] mt-[21px]">
            <div>{data.preLaunchDuration === 'IMMEDIATE' ? 'IMO' : 'IN QUEUE'}</div>
            <div>{renderText(data.preLaunchDuration)}</div>
          </div>
          <div className="view-btn">
            <Button className="w-full h-[50px] mt-[18px]" onClick={() => navigate(`/airdrop/${data.ticker}`)}>
              VIEW TOKEN PROFILE
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
});
export default CreatedTokenCompleteConnectedModal;
