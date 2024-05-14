import './index.scss';
import { IconBack } from '@/components/icons';
import { useNavigate } from 'react-router-dom';
interface BackButtonProps {
  path?: string;
}
export default ({ path = '/dashboard', ...rest }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="back_button"
      onClick={() => {
        navigate(path);
      }}
    >
      <span className="back_button_text">Back to Dashboard</span>
      <IconBack className="IconBack" />
    </div>
  );
};
