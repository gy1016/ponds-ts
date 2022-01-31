import request from '@/utils/server';

export function getHistoryList(userId: number | undefined) {
  return request({
    url: '/history/list',
    method: 'get',
    params: { userId },
  });
}

export function addHistory<T>(data: T) {
  return request({
    url: '/history/add',
    method: 'post',
    data,
  });
}
