import { IconAdd } from '@/components/icons';
import { useNavigate } from 'react-router-dom';

const goLaunchPadACard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard_item_create">
      <div className="dashboard_item_create_item" onClick={() => navigate('/launchpad?type=airdrop')}>
        <IconAdd className="dashboard_item_create_add" />

        <p>Hunt for Airdrops</p>
      </div>
      <div className="dashboard_item_create_item" onClick={() => navigate('/launchpad?type=imo')}>
        <IconAdd className="dashboard_item_create_add" />

        <p>Participate in IMOs</p>
      </div>
    </div>
  );
};

export default goLaunchPadACard;
