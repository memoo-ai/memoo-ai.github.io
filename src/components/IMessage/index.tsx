import { message as antdMessage } from 'antd';
import './index.scss';

interface ConfigOptions {
  className?: string;
  content?: string;
  duration?: number;
  key?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  top?: string | number;
}
const message = () => {
  return null;
};

message.success = (content: string, options?: Omit<ConfigOptions, 'content'>) => {
  antdMessage.success({
    ...options,
    content,
    className: `${options?.className || ''} custom-success-message`,
  });
};

message.error = (content: string, options?: Omit<ConfigOptions, 'content'>) => {
  antdMessage.error({
    ...options,
    content,
    className: `${options?.className || ''} custom-error-message`,
  });
};

message.info = (content: string, options?: Omit<ConfigOptions, 'content'>) => {
  antdMessage.info({
    ...options,
    content,
    className: `${options?.className || ''} custom-info-message`,
  });
};

message.warning = (content: string, options?: Omit<ConfigOptions, 'content'>) => {
  antdMessage.warning({
    ...options,
    content,
    className: `${options?.className || ''} custom-warning-message`,
  });
};

interface messageType {
  success: (content: string, options?: Omit<ConfigOptions, 'content'>) => void;
  error: (content: string, options?: Omit<ConfigOptions, 'content'>) => void;
  info: (content: string, options?: Omit<ConfigOptions, 'content'>) => void;
  warning: (content: string, options?: Omit<ConfigOptions, 'content'>) => void;
}

export default message as messageType;
