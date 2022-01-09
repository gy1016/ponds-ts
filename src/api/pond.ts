import request from '@/utils/request';

export function getPondList() {
  return request({
    url: '/pond/list',
    method: 'get',
  });
}
