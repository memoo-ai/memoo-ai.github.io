import http from '@/utils/http';
import { prefix } from '.';
import {
  pageParams,
  DashboardCreator,
  PageWrapper,
  DashboardCollectorAirdrop,
  DashboardCollectorParticipated,
  DashboardWatchList,
  TokenDetail,
} from '@/types';
export const getCreator = (params: pageParams) => {
  return http.get<PageWrapper<DashboardCreator>>(`${prefix}/web-oriented/creator`, { params });
};
export const getCollectorAirdrop = (params: pageParams) => {
  return http.get<PageWrapper<DashboardCollectorAirdrop>>(`${prefix}/web-oriented/collector-airdrop`, { params });
};
export const getCollectorParticipated = (params: pageParams) => {
  return http.get<PageWrapper<DashboardCollectorParticipated>>(`${prefix}/web-oriented/collector-participated`, {
    params,
  });
};

export const getWatchList = (params: pageParams) => {
  return http.get<PageWrapper<DashboardWatchList>>(`${prefix}/web-oriented/watchlist`, { params });
};

export const deleteToken = (id: string) => {
  return http.delete(`${prefix}/web-oriented/token/${id}`);
};
export const cancelCollect = (ticker: string) => {
  return http.put(`${prefix}/web-oriented/collection`, { ticker });
};
