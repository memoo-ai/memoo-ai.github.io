import http from '@/utils/http';
import { prefix } from '.';

export const getIDOActiveDetail = (ticker: string) => {
  return http.get(`${prefix}/web-oriented/ido-active-detail`, { params: { ticker } });
};

// export const getIDOCompleted = (params: { pageSize: number; pageNumber: number }) => {
//   return http.get(`${prefix}/web-oriented/ido-completed`, { params });
// };

export const getIDOLaunchedDetail = (ticker: string) => {
  return http.get(`${prefix}/web-oriented/ido-launched-detail`, { params: { ticker } });
};

export const getIDOLaunchedDetailTop10 = (params: { pageSize: number; pageNumber: number; ticker: string }) => {
  return http.get(`${prefix}/web-oriented/ido-launched-detail-top10`, { params });
};

export const getIDOQueueDetail = (ticker: string) => {
  return http.get(`${prefix}/web-oriented/ido-queue-detail`, { params: { ticker } });
};

export const imoParticipate = (postBody: { balance: number; ethAmout: number; ticker: string }) => {
  return http.get(`${prefix}/web-oriented/imo-participate`, { data: postBody });
};
