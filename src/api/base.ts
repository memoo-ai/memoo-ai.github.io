import http from '@/utils/http';
import { prefix } from '.';

export interface ApiResponse<T = any> {
  code: number; // 200
  msg: string; // "success"
  data: T;
}

export interface BaseConfigData {
  MemooManageContract: string;
  MemeFactoryContract: string;
}

export function getBaseConfig<T extends ApiResponse<BaseConfigData>>() {
  return http.get(`${prefix}/web-unauthorized/base-config`);
}
export const getSolanaConfig = () => {
  return http.get(`${prefix}/web-unauthorized/solana-config`);
};
export const getMemeConfigId = (ticker: string) => {
  return http.get(`${prefix}/web-unauthorized/solana-config-meme-id`, { params: { ticker } });
};
