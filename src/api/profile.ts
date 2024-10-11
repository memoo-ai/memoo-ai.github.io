import http from '@/utils/http';
import { prefix } from '.';
import { UserInfo } from '@/types';

export const getProfile = () => {
  return http.post<UserInfo>(`${prefix}/web-oriented/user`, {});
};
