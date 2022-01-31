import axios, { AxiosRequestHeaders } from 'axios';
import { isExist, getToken } from '../auth';
import { message } from 'antd';
import { BASE_URL, TIMEOUT } from './config';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

instance.interceptors.request.use(
  (config) => {
    // 如果存在 token 则附带在 http header 中
    if (isExist()) {
      (config.headers as AxiosRequestHeaders)['Authorization'] = `Bearer ${getToken()}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 0) {
      message.error({
        content: res.msg || 'Error',
        duration: 5,
      });

      if (res.code === -2) {
        // to re-login
        message.warning({
          content: res.msg || 'Token过期，请重新登陆！',
          duration: 5,
        });
      }
      return Promise.reject(new Error(res.msg || 'Error'));
    } else {
      if (res.msg?.search(/获取/) === -1) {
        message.success({
          content: res.msg || '成功啦！',
          duration: 5,
        });
      }
    }
    return res;
  },
  (error) => {
    message.error({
      content: error.message,
      duration: 5,
    });
    return Promise.reject(error);
  },
);

export default instance;
