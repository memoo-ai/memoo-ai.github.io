import toast from 'react-hot-toast';
import numeral from 'numeral';
import Decimal from 'decimal.js';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function handleCopy(str: string) {
  if (!str) return;
  navigator.clipboard
    .writeText(str)
    .then(() => {
      console.log('Text copied to clipboard');
      toast.success('Copied', { duration: 2000 });
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
    });
}

export function formatNumberDecimal(value: number, decimal = 2) {
  let arr = String(value).split('.');
  if (arr.length === 2) {
    arr[1] = arr[1].substring(0, decimal);

    return Number(arr.join('.')) || 0;
  }

  return value;
}

export function formatNumberWithSymbol(value: number, symbol = '', formatter = '0,0') {
  let formatValue = '';

  if (value && value < 0.01) {
    formatValue = !symbol ? `<0.01` : symbol === '$' ? '<$0.01' : `<0.01 ${symbol}`;
  } else {
    formatValue = value ? numeral(formatNumberDecimal(value)).format(formatter) : '0';
    formatValue = !symbol ? formatValue : symbol === '$' ? `$${formatValue}` : `${formatValue} ${symbol}`;
  }

  return formatValue;
}

export function formatHashAddress(hash: string, start = 6, end = 4) {
  let str = '';

  if (hash) {
    str = `${hash.substring(0, start)}...${hash.substring(hash.length - end)}`;
  }

  return str;
}

export const formatNumber = (symbol: string, numberString: string): string => {
  const number = parseFloat(numberString);
  if (isNaN(number)) {
    return '-';
  }

  const decimalValue = new Decimal(numberString);
  let result: Decimal;

  switch (symbol) {
    case 'USDC':
    case 'USDT':
      result = decimalValue.div(Math.pow(10, 6));
      break;
    case 'WBTC':
      result = decimalValue.div(Math.pow(10, 8));
      break;
    case 'DAI':
      result = decimalValue.div(Math.pow(10, 18));
      break;
    default:
      result = decimalValue;
      break;
  }

  const minValue = symbol === 'WBTC' ? 0.0001 : 0.01;
  return result.lessThan(minValue) ? `<${minValue}` : result.toString();
};

export function getFullNum(num: number) {
  if (isNaN(num) || !num) {
    return '0';
  }
  let str = String(num);
  if (!/e/i.test(str)) {
    return str;
  }
  return num.toFixed(18).replace(/\.?0+$/, '');
}

export function formatNumberDecimals(num: number, decimals: number) {
  const str = getFullNum(num);
  const arr = str.split('.');
  if (arr.length === 2) {
    arr[1] = arr[1].substring(0, decimals);
    return String(parseFloat(arr.join('.')));
  } else {
    return str;
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function clipAddress(address: string) {
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
}
