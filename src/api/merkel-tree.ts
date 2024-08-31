import http from '@/utils/http';
import { ProofRes } from '@/types';

const prefix = '/api/v1/merkel-tree';

export const getProof = (project: string, address: string) => {
  return http.get<ProofRes>(`${prefix}/proof`, { params: { project, address } });
};
