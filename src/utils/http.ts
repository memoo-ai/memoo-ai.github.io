/* eslint-disable no-debugger */
import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_GO_NODE,
});

http.interceptors.request.use((config) => {
  config.headers[
    'Authorization'
  ] = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgyNDMwNzM2MzlCNzE4OTk3N0U1RGJBN2VkRTFiNWY1RDE4NTMxNDE4IiwiY2hhaW4iOiIiLCJleHAiOjE3MTcxMjM0NDUsIm9yaWdfaWF0IjoxNzE3MDM3MDQ1fQ.WeZYUOoa7YMDHircxkJr62HmlFGkULxh1iw_qhCfgaPYD5Xu3AOnbBVzjjMrrvHr8os6uwoT17NLbxwhVi6a1AoTHsUXbnWg26yN2truzgL_zhNecrtr-AAs4mBTe66hJPnmibsaxSShRhZiewCZFz3kKazkt2LgZIJbZOg-0jPuGqhKKSYqz6diaYaLjwGZeEeII1AkwtUiBFnLZJQ40A4NLXBBPwvWfMCAJylUB3W_dGqLsmFlphrR5denZOxq0PNBvhVIYf93fVr0MaAyiCmDMqOqyCbf_vXd2V_5LfkFmE3aQ-nysTCEUGQ2-YG90wi9ezZ8aSJflCDRrLNFzg`;
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
