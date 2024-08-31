import http from '@/utils/http';
import { prefix } from '.';
import { TrendingTokens, TrendingCreators, PageWrapper, pageParams } from '@/types';

export const getTrendingTokens = (params: pageParams) => {
  return http.get<PageWrapper<TrendingTokens>>(`${prefix}/web-unauthorized/trending-tokens`, { params });
};
export const getTrendingCreators = (params: pageParams) => {
  return http.get<PageWrapper<TrendingCreators>>(`${prefix}/web-unauthorized/trending-creators`, { params });
};
export const getTopTokens = (params: pageParams) => {
  return http.get<PageWrapper<TrendingTokens>>(`${prefix}/web-unauthorized/top-tokens`, { params });
};
export const getTopCreators = (params: pageParams) => {
  return http.get<PageWrapper<TrendingCreators>>(`${prefix}/web-unauthorized/top-creators`, { params });
};
