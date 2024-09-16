import { Tooltip } from 'antd';
import { IconTip } from '@/components/icons';
import './index.scss';

const ITooltip = ({ className, title, placement = 'top', color, bgColor }: any) => {
  return (
    <Tooltip title={title} placement={placement} color="#20222C" overlayClassName="i-tooltip">
      <IconTip color={color} bgColor={bgColor} className={className} />
    </Tooltip>
  );
};
export default ITooltip;
