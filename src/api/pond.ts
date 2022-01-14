import request from '@/utils/request';

export function getPondList() {
  return request({
    url: '/pond/list',
    method: 'get',
  });
}

export function reorderPonds<T>(data: T) {
  return request({
    url: '/pond/reorder',
    method: 'post',
    data,
  });
}
