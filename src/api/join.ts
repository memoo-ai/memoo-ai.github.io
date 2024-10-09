import http from '@/utils/http';
import { prefix } from '.';
import { SearchUserRanking } from '@/types';

export const searchUserRanking = (address: string) => {
  return http.get<SearchUserRanking[]>(`${prefix}/web-unauthorized/search-user-ranking`, { params: { address } });
};
