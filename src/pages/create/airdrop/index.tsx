import Status from '../common/status';
import './index.scss';

export default function Airdrop() {
  return (
    <div className="airdrop">
      <div className="airdrop_left flex flex-column">
        <Status />
      </div>
      <div className="airdrop_right flex flex-column">22</div>
    </div>
  );
}
