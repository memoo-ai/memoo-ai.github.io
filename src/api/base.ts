import http from '@/utils/http';
import { prefix } from '.';

export interface ApiResponse<T = any> {
  code: number; // 200
  msg: string; // "success"
  data: T;
}

export interface BaseConfigData {
  MemooManageContract: string;
}

export function getBaseConfig<T extends ApiResponse<BaseConfigData>>() {
  return http.get(`${prefix}/web-unauthorized/base-config`);
}
