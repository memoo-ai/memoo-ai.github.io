import http from '@/utils/http';
import { prefix } from '.';
import { SearchUserRanking, pageParams } from '@/types';

export const searchUserRanking = (address: string) => {
  return http.get<SearchUserRanking[]>(`${prefix}/web-unauthorized/search-user-ranking`, { params: { address } });
};
export const getInvitationCode = () => {
  return http.get(`${prefix}/web-oriented/invitation-code`, {});
};
export const invitationJoin = (invitationCode: string) => {
  return http.post(`${prefix}/web-oriented/invitation-join`, { InvitationCode: invitationCode });
};
export const getInvitationTop = (address: string) => {
  return http.get(`${prefix}/web-oriented/invitation-top`, { params: { address } });
};
export const getInvitation = () => {
  return http.get(`${prefix}/web-oriented/invitation`, {});
};

export const getUserRankingList = (params: pageParams) => {
  return http.get(`${prefix}/web-unauthorized/search-user-ranking-list`, { params });
};
export const getInvitationQuery = () => {
  return http.get(`${prefix}/web-oriented/invitation-code-query`, {});
};
