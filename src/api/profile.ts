import http from '@/utils/http';
import { prefix } from '.';
import { ProfileDetail, pageParams } from '@/types';

export const getProfile = () => {
  return http.post<ProfileDetail>(`${prefix}/web-oriented/user`, {});
};
export const getMemeTop = (address: string) => {
  return http.get(`${prefix}/web-oriented/meme-top`, { params: { address } });
};
export const getOtherProfile = (address: string) => {
  return http.get(`${prefix}/web-oriented/user-address`, { params: { address } });
};
export const getMemeList = (params: pageParams) => {
  return http.get(`${prefix}/web-oriented/meme-list-by-address`, { params });
};
