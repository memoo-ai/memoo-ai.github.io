import http from '@/utils/http';
import { prefix } from '.';
interface pageParams {
  pageNumber: number;
  pageSize: number;
}
export const getCreator = (params: pageParams) => {
  return http.get(`${prefix}/web-oriented/creator`, { params });
};
export const getCollectorAirdrop = (params: pageParams) => {
  return http.get(`${prefix}/web-oriented/collector-airdrop`, { params });
};
export const getCollectorParticipated = (params: pageParams) => {
  return http.get(`${prefix}/web-oriented/collector-participated`, { params });
};

export const getWatchList = (params: pageParams) => {
  return http.get(`${prefix}/web-oriented/watchlist`, { params });
};
