import http from '@/utils/http';
import { prefix } from '.';
import {
  pageParams,
  LaunchpadIMO,
  LaunchpadAirdrop,
  LaunchpadIDOCompeted,
  PageWrapper,
  ImoPvCard,
  AirdropCard,
} from '@/types';

export const getLaunchpadImo = (params: pageParams) => {
  return http.get<PageWrapper<LaunchpadIMO>>(`${prefix}/web-unauthorized/imo`, { params });
};
export const getLaunchpadAirdrop = (params: pageParams) => {
  return http.get<PageWrapper<LaunchpadAirdrop>>(`${prefix}/web-unauthorized/airdrop`, { params });
};
export const getImoCompleted = (params: pageParams) => {
  return http.get<PageWrapper<LaunchpadIDOCompeted>>(`${prefix}/web-unauthorized/ido-completed`, { params });
};
export const getImoPvCard = () => {
  return http.get<ImoPvCard[]>(`${prefix}/web-unauthorized/pv-card`);
};
export const getAirdropCard = () => {
  return http.get<AirdropCard[]>(`${prefix}/web-unauthorized/airdrop-card`);
};
