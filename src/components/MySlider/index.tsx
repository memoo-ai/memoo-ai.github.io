import './index.scss';
import React from 'react';
import { Slider } from 'antd';
interface MySliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
}

const MySlider = ({ min = 5, max = 35, step, value, onChange }: MySliderProps) => {
  const handleSliderChange = (newValue: number) => {
    // 根据 Slider 的值计算新的进度值
    const newProgress = newValue / 100;

    // 调用父组件传递过来的 onChange 函数，并传递新的进度值
    if (onChange) {
      onChange(newProgress);
    }
  };

  return (
    <div className="flex-1 flex items-center progress">
      <div className="mr-[14px]">{min / 100}ETH</div>{' '}
      <Slider
        className="flex-1 progress_slider"
        min={min}
        max={max}
        step={step}
        // value={value * 100}
        value={value * 100}
        onChange={handleSliderChange}
        tipFormatter={(value: any) => `${value}%`}
        tooltip={{ open: true }}
      />
      <div className="ml-[14px]">{max / 100}ETH</div>
    </div>
  );
};

export default MySlider;
