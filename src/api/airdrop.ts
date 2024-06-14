import http from '@/utils/http';
import { prefix } from '.';
import {
  IDOActiveDetail,
  IDOLaunchedDetail,
  IDOLaunchedDetailTop10,
  IDOQueueDetail,
  PageWrapper,
  AirdropDetail,
} from '@/types';

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
  return http.get<IDOLaunchedDetailTop10[]>(`${prefix}/web-oriented/ido-launched-detail-top10`, { params });
};

export const getIDOQueueDetail = (ticker: string) => {
  return http.get<IDOQueueDetail>(`${prefix}/web-oriented/ido-queue-detail`, { params: { ticker } });
};

export const follow = (twitter: string) => {
  return http.get<boolean>(`${prefix}/web-oriented/twitter-follow`, { params: { twitter } });
};

export const imoParticipate = (postBody: { balance: number; ethAmout: number; ticker: string }) => {
  return http.get<string>(`${prefix}/web-oriented/imo-participate`, { data: postBody });
};
export const myAirdropDetail = (params: { ticker: string; signature: string; timestap: string }) => {
  return http.get<AirdropDetail>(`${prefix}/web-oriented/my-airdrop-detail`, { params });
};
