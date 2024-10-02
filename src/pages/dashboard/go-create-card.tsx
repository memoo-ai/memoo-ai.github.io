import { useNavigate } from 'react-router-dom';
import { IconAdd } from '@/components/icons';
import './go-create-card.scss';
const GoCreateCard = ({ showTitle = false }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`go-create-card flex flex-col items-center gap-y-[35px] ${showTitle ? 'h-[386px]' : 'justify-center'}`}
      onClick={() => {
        navigate('/create_token');
      }}
    >
      {showTitle && (
        <p className="font-404px text-[14px] leading-[22px] whitespace-pre-wrap text-center text-green mt-[80px]">{`BEGIN YOUR MEME TOKEN\nEMPIRE TODAY`}</p>
      )}
      <div className="flex flex-col items-center justify-center gap-y-[8px]">
        <IconAdd className="dashboard_item_create_add" />

        <p className="font-OCR text-green text-[14px] leading-[19px]">Create Token</p>
      </div>
    </div>
  );
};

export default GoCreateCard;
