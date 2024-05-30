import http from '@/utils/http';
import { prefix } from '.';
import { pageParams, LaunchpadIMO, LaunchpadAirdrop, LaunchpadIDOCompeted, PageWrapper } from '@/types';

export const getLaunchpadImo = (params: pageParams) => {
  return http.get<PageWrapper<LaunchpadIMO>>(`${prefix}/web-oriented/imo`, { params });
};
export const getLaunchpadAirdrop = (params: pageParams) => {
  return http.get<PageWrapper<LaunchpadAirdrop>>(`${prefix}/web-oriented/airdrop`, { params });
};
export const getImoCompleted = (params: pageParams) => {
  return http.get<PageWrapper<LaunchpadIDOCompeted>>(`${prefix}/web-oriented/ido-completed`, { params });
};
