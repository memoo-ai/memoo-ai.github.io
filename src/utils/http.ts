import axios from 'axios';

const http = axios.create({
  baseURL: '',
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
