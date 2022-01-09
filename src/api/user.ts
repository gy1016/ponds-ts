import request from '@/utils/request';
import { IUser } from '@/types/user';

export function login(data: IUser) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  });
}

export function register(data: IUser) {
  return request({
    url: '/user/register',
    method: 'post',
    data,
  });
}

export function me() {
  return request({
    url: '/user/me',
    method: 'get',
  });
}
