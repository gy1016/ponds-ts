import request from '../utils/request';

export function getHistoryList(userId: number | undefined) {
  return request({
    url: '/history/list',
    method: 'get',
    params: { userId },
  });
}

export function addHistory(data: any) {
  return request({
    url: '/history/add',
    method: 'post',
    data,
  });
}
