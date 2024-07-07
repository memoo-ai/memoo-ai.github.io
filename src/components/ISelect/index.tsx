import { Select } from 'antd';
import './index.scss';
import { IconSetting } from '@/components/icons';

const ISelect = ({ options }: any) => {
  return (
    <div className="flex items-center  mb-[62px]">
      <div className="flex items-center bg-green rounded-[7px] p-[10px] border-box mr-[12px]">
        <IconSetting />
      </div>
      <Select className="i_select" options={options} />
    </div>
  );
};

export default ISelect;
