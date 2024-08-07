import './pre-market-acquisition.scss';
import { BN } from '@coral-xyz/anchor';
interface PreMarketAcqusitionProps {
  amount: number | BN;
}
const tokenSymbol = import.meta.env.VITE_TOKEN_SYMBOL;
const PreMarketAcqusition = ({ amount }: PreMarketAcqusitionProps) => {
  return (
    <div className="pre-market-acquisition">
      <div className="text-green font-404px text-[18px]">Pre-market acquisition</div>
      <div className="pre-market-acquisition-content flex items-center justify-between mt-[19px] text-[#fff]">
        <div className="font-OCR text-[14px] ">Total Contributed</div>
        <div className='font-OCR text-[24px]"'>
          {Number(amount)}
          {tokenSymbol}
        </div>
      </div>
    </div>
  );
};

export default PreMarketAcqusition;
