import request from '@/utils/request';
import { User } from '@/types/user';

export function login(data: User) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  });
}

export function register(data: User) {
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
