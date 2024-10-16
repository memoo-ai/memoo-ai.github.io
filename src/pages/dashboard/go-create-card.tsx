import { useNavigate } from 'react-router-dom';
import { IconAdd } from '@/components/icons';
import './go-create-card.scss';
const GoCreateCard = ({ showTitle = false, showBg = false, className = '' }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${className} go-create-card flex flex-col items-center gap-y-[35px] ${showTitle ? 'h-[386px]' : 'justify-center'} ${showBg ? 'create-card-bg' : ''}`}
      onClick={() => {
        navigate('/create_token');
      }}
    >
      {showTitle && (
        <p className="whitespace-pre-wrap font-404px text-[18px] leading-[18px] text-green mt-[120px]">
          BEGIN YOUR MEME TOKEN EMPIRE TODAY
        </p>
      )}
      <div className="flex flex-col items-center justify-center gap-y-[8px]">
        <IconAdd className="dashboard_item_create_add" />

        <p className="font-OCR text-green text-[14px] leading-[19px]">Create Token</p>
      </div>
    </div>
  );
};

export default GoCreateCard;
