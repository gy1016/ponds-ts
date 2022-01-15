import request from '@/utils/request';
import { ITaskResult } from '@/types/task';

export function getPondList() {
  return request({
    url: '/pond/list',
    method: 'get',
  });
}
export function getTaskList(userId: number | undefined) {
  if (!userId) return;
  return request({
    url: '/task/list',
    method: 'get',
    params: { userId },
  });
}

export function addTask(data: any) {
  return request({
    url: '/task/add',
    method: 'post',
    data,
  });
}

export function editTask(data: any) {
  return request({
    url: '/task/edit',
    method: 'post',
    data,
  });
}

export function getTask(id: number | undefined) {
  if (!id) return;
  return request({
    url: '/task/info',
    method: 'get',
    params: { id },
  });
}

export function delTask(params: { id: number; sort: number }) {
  return request({
    url: '/task/delete',
    method: 'get',
    params,
  });
}

export function reorderTasks<T>(data: T) {
  return request({
    url: '/task/reorder',
    method: 'post',
    data,
  });
}
