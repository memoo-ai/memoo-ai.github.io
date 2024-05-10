import './index.scss';
import { ScoreCard } from './scoreCard';
import { AirDropCard } from './airDropCard';
export default () => {
  return (
    <div>
      <div className="token_profile">
        <div className="token_profile_left">
          <ScoreCard />
          <AirDropCard />
        </div>
        <div />
      </div>
    </div>
  );
};
