import http from '@/utils/http';
import { prefix } from '.';

export const enum PreLaunchDurationEnum {
  'IMMEDIATE' = 'IMMEDIATE',
  '1DAY' = '1DAY',
  '3DAYS' = '3DAYS',
}

export interface ITokenSaveData {
  pinnedTwitter?: string;
  preLaunchDuration: PreLaunchDurationEnum;
  preMarketAcquisition: string;
  projectDescription?: string;
  telegram?: string;
  ticker: string;
  tokenName: string;
  twitter?: string;
  website?: string;
  tokenIcon: File;
  banners: File;
}

const getFormData = (data: ITokenSaveData) => {
  const formData = new FormData();
  formData.append('icon', data.tokenIcon);
  // formData.append('banners', data.banners);
  formData.append('preLaunchDuration', data.preLaunchDuration);
  formData.append('preMarketAcquisition', data.preMarketAcquisition);
  formData.append('projectDescription', data.projectDescription || '');
  formData.append('telegram', data.telegram || '');
  formData.append('ticker', data.ticker);
  formData.append('tokenName', data.tokenName);
  return formData;
};

export const saveTokenCraft = (data: ITokenSaveData) => {
  const formData = getFormData(data);
  return http.post(`${prefix}/web-oriented/token`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const confirmTokenCreate = (data: ITokenSaveData) => {
  const formData = getFormData(data);
  return http.put(`${prefix}/web-oriented/token`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const checkTickerExists = (ticker: string) => {
  return http.get(`${prefix}/web-oriented/ticker-verify?ticker=${ticker}`);
};

export const getTokenDetail = (ticker: string) => {
  return http.get(`${prefix}/web-oriented/token?ticker=${ticker}`);
};
