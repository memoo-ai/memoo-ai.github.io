import http from '@/utils/http';
import { prefix } from '.';
import { getMeMeme } from '@/types';

export const getMeMemo = (ticker: string) => {
  return http.get<getMeMeme[]>(`${prefix}/web-oriented/get-me-meme`, { params: { ticker } });
};

export const getToolsUrls = () => {
  return http.get<getMeMeme[]>(`${prefix}/web-unauthorized/tools`);
};
