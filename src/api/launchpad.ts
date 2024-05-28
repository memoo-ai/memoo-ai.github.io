import http from '@/utils/http';
import { prefix } from '.';
interface pageParams {
  pageNumber: number;
  pageSize: number;
}

export const getImo = (params: pageParams) => {
  return http.get(`${prefix}/web-oriented/imo`, { params });
};
export const getAirdrop = (params: pageParams) => {
  return http.get(`${prefix}/web-oriented/airdrop`, { params });
};
export const getImoCompleted = (params: pageParams) => {
  return http.get(`${prefix}/web-oriented/ido-completed`, { params });
};
