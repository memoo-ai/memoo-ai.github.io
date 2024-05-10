import './index.scss';
import { Progress } from 'antd';
export const ScoreCard = () => {
  return (
    <div>
      <div className="score_card">
        <div className="score_card_status">
          <div className="score_card_status_left">status</div>
          <div className="score_card_status_right">
            <span>Upcoming</span>
            <img src="./tokenProfile/upcoming.png" alt="" />
          </div>
        </div>
        <div className="score_card_title">
          <h3>MeMoo Score</h3> <img src="./tokenProfile/upcoming.png" alt="" />
        </div>
        <div className="score_card_progress">
          <div className="score_card_progress_value">
            70 <span className="score_card_progress_value_text">/100</span>{' '}
          </div>
        </div>
        <Progress percent={50} showInfo={false} />
        <div className="score_card_looking">Looking good but won’t get out of bed for it.</div>
        <div className="score_card_desc">MeMoo Score is an indicative metric. Users are advised to DYOR.</div>
      </div>
    </div>
  );
};
