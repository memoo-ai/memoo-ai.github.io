import http from '@/utils/http';
import { prefix } from '.';
import { ApiResponse } from './base';
import { ProfileDetail, pageParams } from '@/types';

export const editProfile = (data: ProfileDetail): Promise<ApiResponse<any>> => {
  return http.post(`${prefix}/web-oriented/user`, data);
};
export const getMemeTop = (address: string) => {
  return http.get(`${prefix}/web-oriented/meme-top`, { params: { address } });
};
export const getUserProfile = (address: string) => {
  return http.get(`${prefix}/web-oriented/user-address`, { params: { address } });
};
export const getMemeList = (params: pageParams) => {
  return http.get(`${prefix}/web-oriented/meme-list-by-address`, { params });
};
