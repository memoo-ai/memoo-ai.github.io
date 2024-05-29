/* eslint-disable no-debugger */
import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_GO_NODE,
});

http.interceptors.request.use((config) => {
  config.headers[
    'Authorization'
  ] = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgyNDMwNzM2MzlCNzE4OTk3N0U1RGJBN2VkRTFiNWY1RDE4NTMxNDE4IiwiY2hhaW4iOiIiLCJleHAiOjE3MTY5OTMyNTksIm9yaWdfaWF0IjoxNzE2OTA2ODU5fQ.v1w549bCDrcu2l-79YkKIJSbwvEUiseo7Oi6YbE9xk9pW8UNEwTuFJc9Ri7v8Fz2JfO8kAXfMGCGb39AX6one8aGJN4F7HKJ_zCC030JJ9VJ217ZVlHLleyAcM4hH5kMfSlTaeOJkOQvWleMGRjncJx0-sBCQk0hWVKBBFfDT9A9PP7XuCSXmtNQXIinrlW8D9uF88qfCbE0eYsvT9YMvNluN5fwNTEPMsSeCV84bfMuYh1Lzse-LjMTVRwBqR90tHCfGOa65OeG5rshJhEATK10CPZpDG_Sl_DNaKb03yP-hWNL4ImuQNdG0KyUqZIn83yPHh_dTH_uUqckhrOvlw`;
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
