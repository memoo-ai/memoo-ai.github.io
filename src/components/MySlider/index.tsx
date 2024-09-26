import './index.scss';
import React, { useRef } from 'react';
import { Slider } from 'antd';
import { useProportion } from '@/hooks/useProportion';
import { formatDecimals } from '@/utils';
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
  const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
  const sliderRef = useRef<HTMLDivElement>(null);
  const { totalSupplyPrice } = useProportion();
  const handleSliderChange = (newValue: number) => {
    const newProgress = newValue / 100;
    if (onChange) {
      onChange(newProgress);
    }
  };

  return (
    <div className="flex-1 flex items-center progress" ref={sliderRef}>
      <div className="mr-[14px] font-OCR">
        {minPrice}&nbsp;
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
        tooltip={{
          open: true,
          rootClassName: 'memoo_slider_tooltip',
          getPopupContainer: () => sliderRef.current!,
          formatter: (value) => {
            console.log('formatterValue:', value);
            console.log('formattermax:', max);
            const percent = value! / 100;
            const result = formatDecimals(percent * totalSupplyPrice);
            return `${value}% (${result} ${tokenSymbol})`;
          },
        }}
      />
      <div className="ml-[14px] font-OCR">
        {maxPrice} {tokenSymbol}
      </div>
    </div>
  );
};

export default MySlider;
