/* eslint-disable no-debugger */
import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_GO_NODE,
});

http.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${import.meta.env.VITE_DEMO_TOKEN}`;
  return config;
});

http.interceptors.response.use(
  (response) => {
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
