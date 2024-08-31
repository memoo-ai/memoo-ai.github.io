import http from '@/utils/http';
import { prefix } from '.';
import { LoginParams, LoginToken } from '@/types';

export const login = (data: LoginParams) => {
  return http.post<LoginToken>(`${prefix}/auth/login`, { ...data });
};
