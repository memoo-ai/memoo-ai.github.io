/* eslint-disable no-debugger */
import axios from 'axios';
import { MEMOO_TOKEN_STORAGE } from '@/constants';
const http = axios.create({
  baseURL: import.meta.env.VITE_GO_NODE,
});

http.interceptors.request.use((config) => {
  // config.headers['Authorization'] = `Bearer ${import.meta.env.VITE_DEMO_TOKEN}`;
  config.headers['Authorization'] = `Bearer ${localStorage.getItem(MEMOO_TOKEN_STORAGE) ?? ''}`;
  return config;
});

http.interceptors.response.use(
  (response) => {
    if (response.data.code !== 200) {
      return Promise.reject(response.data);
    } else if (response.data.code === 401) {
      // not authed
      localStorage.removeItem(MEMOO_TOKEN_STORAGE);
    }
    return response.data;
  },
  (reason) => {
    if (reason.response?.data) {
      return Promise.reject(reason.response.data);
    }
    return Promise.reject(reason);
  },
);
export default http;
