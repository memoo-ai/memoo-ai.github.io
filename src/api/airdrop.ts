import http from '@/utils/http';
import { prefix } from '.';
import { IDOActiveDetail, IDOLaunchedDetail, IDOLaunchedDetailTop10, IDOQueueDetail, PageWrapper } from '@/types';

export const getIDOActiveDetail = (ticker: string) => {
  return http.get<IDOActiveDetail>(`${prefix}/web-oriented/ido-active-detail`, { params: { ticker } });
};

// export const getIDOCompleted = (params: { pageSize: number; pageNumber: number }) => {
//   return http.get(`${prefix}/web-oriented/ido-completed`, { params });
// };

export const getIDOLaunchedDetail = (ticker: string) => {
  return http.get<IDOLaunchedDetail>(`${prefix}/web-oriented/ido-launched-detail`, {
    params: { ticker },
  });
};

export const getIDOLaunchedDetailTop10 = (params: { pageSize: number; pageNumber: number; ticker: string }) => {
  return http.get<PageWrapper<IDOLaunchedDetailTop10>>(`${prefix}/web-oriented/ido-launched-detail-top10`, { params });
};

export const getIDOQueueDetail = (ticker: string) => {
  return http.get<IDOQueueDetail>(`${prefix}/web-oriented/ido-queue-detail`, { params: { ticker } });
};

export const imoParticipate = (postBody: { balance: number; ethAmout: number; ticker: string }) => {
  return http.get<string>(`${prefix}/web-oriented/imo-participate`, { data: postBody });
};
