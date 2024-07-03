/* eslint-disable no-debugger */
import BigNumber from 'bignumber.js';
import toast from 'react-hot-toast';
import numeral from 'numeral';
import Decimal from 'decimal.js';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Address } from '@/types';
import { getTwitterClientId } from '@/api/token';
import qs from 'qs';
import { REQUEST_FOLLOWING_STORAGE } from '@/constants';
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

export function formatTs(ts: number, unit: 's' | 'ms' = 's') {
  const date = new Date((ts ?? 0) * (unit === 's' ? 1000 : 1));
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  return ts === 0 ? '' : date.toLocaleDateString('en-US', options);
}

export function compareAddrs(addrA: Address, addrB: Address) {
  if (!addrA || !addrB) return false;
  return new RegExp(addrA, 'i').test(addrB ?? '');
}

export function extractDomainName(url: string) {
  const pattern = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
  const matches = url.match(pattern);
  if (matches?.[1]) {
    const domain = matches[1];
    const parts = domain.split('.');
    if (parts.length > 1) {
      return parts[parts.length - 2];
    }
  }
  return null;
}

export const formatDecimals = (source: BigNumber.Value, decimals = 10, stripZeros = true): string => {
  let result = new BigNumber(source).decimalPlaces(decimals, BigNumber.ROUND_HALF_EVEN).toFixed(decimals);
  if (stripZeros) {
    result = result.replace(/\.?0+$/, '');
  }
  return result;
};

export function calculateDaysDifference(a: number, b: number): number {
  const millisecondsPerDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
  const dateA = new Date(a);
  const dateB = new Date(b);
  const timeDifference = Math.abs(dateB.getTime() - dateA.getTime());
  const daysDifference = Math.floor(timeDifference / millisecondsPerDay);
  return daysDifference;
}

export const authorizeTwitter = async (clientId: string, reidrectUri: string) => {
  // const twitterRedirectUri = import.meta.env.VITE_TWITTER_FOLLOW_REDIRECT_URI;
  const params = {
    response_type: 'code',
    client_id: clientId,
    redirect_uri: reidrectUri,
    scope: 'tweet.read%20tweet.write%20like.write%20users.read%20follows.read%20follows.write',
    state: 'twitter',
    code_challenge: 'challenge',
    code_challenge_method: 'plain',
  };
  const url = new URL(`https://twitter.com/i/oauth2/authorize`);
  url.search = qs.stringify(params, { encode: false });

  window.location.href = url.href;
};

export function formatRestTime(timestamp: number) {
  const seconds = Math.floor(timestamp / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days + ' days';
  } else if (hours > 0) {
    return hours + ' hours';
  } else if (minutes > 0) {
    return minutes + ' minutes';
  } else {
    return seconds + ' seconds';
  }
}
export function getNumberOrDefault(value: any): number {
  return !isNaN(Number(value)) ? Number(value) : 0;
}
