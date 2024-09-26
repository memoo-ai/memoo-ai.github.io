import { Progress } from 'antd';
import './index.scss';
interface props {
  className?: string;
  showInfo?: boolean;
  percent?: number | string;
}
const IProgress = ({ className = '', showInfo = false, percent = 0 }: props) => {
  return <Progress className={`${className} memoo_progress`} showInfo={showInfo} percent={Number(percent)} />;
};
export default IProgress;
