import request from '@/utils/request';
import { ITaskResult } from '@/types/task';
interface SortProps {
  fromId: number;
  referenceId: number;
  type: 'before' | 'after';
  fromPondId?: number;
  toPondId?: number;
}

export function getPondList() {
  return request({
    url: '/pond/list',
    method: 'get',
  });
}
export function getTaskList(userId: number | undefined) {
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
  return request({
    url: '/task/info',
    method: 'get',
    params: { id },
  });
}

export function reorderTasks(data: SortProps) {
  return request({
    url: '/task/reorder',
    method: 'post',
    data,
  });
}
