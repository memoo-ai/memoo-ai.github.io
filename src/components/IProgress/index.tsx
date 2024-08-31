import { Progress } from 'antd';
import './index.scss';
const IProgress = ({ className = '', showInfo = false, percent = 0 }) => {
  return <Progress className={`${className} memoo_progress`} showInfo={showInfo} percent={percent} />;
};
export default IProgress;
