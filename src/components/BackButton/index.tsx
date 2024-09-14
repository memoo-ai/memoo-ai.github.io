import './index.scss';
import { IconBack } from '@/components/icons';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '@/hooks/useWeb3';
import message from '@/components/IMessage';
interface BackButtonProps {
  path?: string;
}
const BackButton = ({ path = '/dashboard', ...rest }: BackButtonProps) => {
  const navigate = useNavigate();
  const { address, registerTokenMint } = useAccount();
  const goBack = () => {
    if (!address) {
      message.info('Please connect wallet first.');
      return;
    }
    navigate(path);
  };
  return (
    <div
      className="back_button"
      onClick={() => {
        goBack();
      }}
    >
      <span className="back_button_text">Back to Dashboard</span>
      <IconBack className="IconBack" />
    </div>
  );
};
export default BackButton;
