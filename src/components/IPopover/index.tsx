import { FC, useMemo } from 'react';
import { Popover } from 'antd';
import './index.scss';

interface IPopoverProps {
  children?: React.ReactNode;
  content?: React.ReactNode;
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu';
}

const IPopover: FC<IPopoverProps> = ({ children, trigger = 'click', content = '' }) => {
  return (
    <Popover className="i-popover cursor-pointer" content={content} trigger={trigger}>
      {children}
    </Popover>
  );
};

IPopover.displayName = IPopover.name;

export default IPopover;
