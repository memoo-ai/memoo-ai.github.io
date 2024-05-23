import AirdropClaim from '../common/airdrop-claim';
import Status from '../common/status';
import './index.scss';

export default function Airdrop() {
  return (
    <div className="airdrop">
      <div className="airdrop_left flex flex-col gap-y-3.5">
        <Status />
        <AirdropClaim />
      </div>
      <div className="airdrop_right flex flex-col">22</div>
    </div>
  );
}
