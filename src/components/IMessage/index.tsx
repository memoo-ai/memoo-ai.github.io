import React, { forwardRef, useImperativeHandle } from 'react';
import { message } from 'antd';
import './index.scss';

interface ArgsProps {
  className?: string;
  content: string;
}
export interface IMessageRef {
  success: (config: ArgsProps) => void;
  error: (config: ArgsProps) => void;
  info: (config: ArgsProps) => void;
  warning: (config: ArgsProps) => void;
}

const IMessage = forwardRef<IMessageRef>((_, ref) => {
  useImperativeHandle(ref, () => ({
    success(config: ArgsProps) {
      message.success({
        ...config,
        className: `${config.className || ''} custom-success-message`,
      });
    },
    error(config: ArgsProps) {
      message.error({
        ...config,
        className: `${config.className || ''} custom-error-message`,
      });
    },
    info(config: ArgsProps) {
      message.info({
        ...config,
        className: `${config.className || ''} custom-info-message`,
      });
    },
    warning(config: ArgsProps) {
      message.warning({
        ...config,
        className: `${config.className || ''} custom-warning-message`,
      });
    },
  }));

  return null; // This component does not render anything
});

export default IMessage;
