import './index.scss';
import React, { useEffect } from 'react';
import { Slider } from 'antd';
const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
interface MySliderProps {
  min?: number;
  max?: number;
  minPrice?: number;
  maxPrice?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  isPercent?: boolean;
  onChange?: (value: number) => void;
}

const MySlider = ({
  min = 5,
  max = 35,
  step,
  value = 0,
  minPrice = 0,
  maxPrice = 0,
  defaultValue = 0,
  onChange,
}: MySliderProps) => {
  const handleSliderChange = (newValue: number) => {
    const newProgress = newValue / 100;
    if (onChange) {
      onChange(newProgress);
    }
  };

  return (
    <div className="flex-1 flex items-center progress">
      <div className="mr-[14px]">
        {minPrice} &nbsp;
        {tokenSymbol}
      </div>{' '}
      <Slider
        className="flex-1 progress_slider"
        min={min * 100}
        max={max * 100}
        step={step}
        // value={value * 100}
        value={value * 100}
        defaultValue={defaultValue * 100}
        onChange={handleSliderChange}
        tipFormatter={(value: any) => `${value}%`}
        tooltip={{ open: true }}
      />
      <div className="ml-[14px]">
        {maxPrice} {tokenSymbol}
      </div>
    </div>
  );
};

export default MySlider;
