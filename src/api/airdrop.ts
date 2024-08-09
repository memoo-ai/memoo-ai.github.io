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

export const getIDOActiveDetail = (ticker: string, address?: string) => {
  return http.get<IDOActiveDetail>(`${prefix}/web-unauthorized/ido-active-detail`, { params: { ticker, address } });
};

// export const getIDOCompleted = (params: { pageSize: number; pageNumber: number }) => {
//   return http.get(`${prefix}/web-oriented/ido-completed`, { params });
// };

export const getIDOLaunchedDetail = (ticker: string, address?: string) => {
  return http.get<IDOLaunchedDetail>(`${prefix}/web-unauthorized/ido-launched-detail`, {
    params: { ticker, address },
  });
};

export const getIDOLaunchedDetailTop10 = (params: {
  pageSize: number;
  pageNumber: number;
  ticker: string;
  address?: string;
}) => {
  return http.get<IDOLaunchedDetailTop10[]>(`${prefix}/web-unauthorized/ido-launched-detail-top10`, { params });
};

export const getIDOQueueDetail = (ticker: string, address?: string) => {
  return http.get<IDOQueueDetail>(`${prefix}/web-unauthorized/ido-queue-detail`, { params: { ticker, address } });
};

export const follow = (twitter: string) => {
  return http.get<boolean>(`${prefix}/web-oriented/twitter-follow`, { params: { twitter } });
};

export const imoParticipate = (postBody: { balance: number; ethAmout: number; ticker: string }) => {
  return http.get<string>(`${prefix}/web-oriented/imo-participate`, { data: postBody });
};
export const myAirdropDetail = (params: {
  ticker: string;
  signature: string;
  timestap: string;
  chain: 'Ethereum' | 'Solana';
}) => {
  return http.get<AirdropDetail>(`${prefix}/web-oriented/my-airdrop-detail`, { params });
};
