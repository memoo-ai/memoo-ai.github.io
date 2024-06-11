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
    if (response.data.code !== 200) {
      return Promise.reject(response.data);
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
