import request from '@/utils/server';
import { IForm } from '@/types/user';

export function login(data: IForm) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  });
}

export function register(data: IForm) {
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
