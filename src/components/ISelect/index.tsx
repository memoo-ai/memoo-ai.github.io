import { Dropdown, Button } from 'antd';
import { IconArrow } from '@/components/icons';
import './index.scss';
import { useState, useRef, useMemo } from 'react';
import { IconSetting } from '@/components/icons';
import type { MenuProps } from 'antd';

interface ISelectOptions {
  key: string;
  label: string;
}
interface ISelectProps {
  options: ISelectOptions[];
  onSelectChange: (activeKey: string, orderBy: string) => void;
}
const ISelect = ({ options, onSelectChange }: ISelectProps) => {
  const [activeKey, setActiveKey] = useState(options[0].key);
  const [activeLabel, setActiveLabel] = useState(options[0].label);
  const [orderBy, setOrderBy] = useState('desc');
  const iconRef = useRef<any>({});
  const itemDefault: MenuProps['items'] = [
    {
      key: 'Order',
      label: <div className="font-OCR text-[14px] text-[#fff]">Order</div>,
    },
    {
      key: 'desc',
      label: (
        <p
          className={`${orderBy === 'desc' ? 'text-[#A005FE]' : 'text-[#07E993]'} font-404px text-[16px]`}
          onClick={() => {
            setOrderBy('desc');
            onSelectChange(activeKey, 'desc');
          }}
        >
          DESCENDING
        </p>
      ),
    },
    {
      key: 'asc',
      label: (
        <p
          className={`${orderBy === 'asc' ? 'text-[#A005FE]' : 'text-[#07E993]'} font-404px text-[16px]`}
          onClick={() => {
            setOrderBy('asc');
            onSelectChange(activeKey, 'asc');
          }}
        >
          ASCENDING
        </p>
      ),
    },
  ];

  const items = useMemo<MenuProps['items']>(() => {
    const option = options?.map((item: any) => {
      return {
        key: item.key,
        label: (
          <div
            className={`${
              activeKey === item.key ? 'text-[#A005FE]' : 'text-[#07E993]'
            } font-404px text-[16px] cursor-pointer`}
            onClick={() => {
              setActiveKey(item.key);
              setActiveLabel(item.label);
              onSelectChange(item.key, orderBy);
            }}
          >
            {item.label}
          </div>
        ),
      };
    });
    return options ? [...option, ...itemDefault] : itemDefault;
  }, [options, activeKey, orderBy]);

  return (
    <div className="flex items-center  mb-[46px]">
      <div className="flex items-center bg-green rounded-[7px] p-[10px] border-box mr-[12px]">
        <IconSetting />
      </div>
      {/* <Select className="i_select" popupClassName="i_select_popup" options={options} /> */}
      <Dropdown className="i_dropdown" menu={{ items }} trigger={['click']}>
        <Button
          className="i_select_btn flex justify-between items-center"
          onMouseOver={() => iconRef.current.setHovered(true)}
          onMouseLeave={() => iconRef.current.setHovered(false)}
        >
          {activeLabel}
          <IconArrow className="" ref={iconRef} />
        </Button>
      </Dropdown>
    </div>
  );
};

export default ISelect;
