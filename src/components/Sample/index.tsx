import { FC } from 'react';

interface Props {
  className?: string;
}
const Sample: FC<Props> = ({ className = '' }) => (
  <span
    className={`${className} font-404px font-normal text-[7px] leading-[12px] text-[#FFFFFF] bg-[#FF0000]  rounded-[62.5px] w-[37px] text-center`}
  >
    SAMPLE
  </span>
);

export default Sample;
