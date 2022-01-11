import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getPondList } from '@/api/pond';
import { getTaskList } from '@/api/task';
import { ITaskResult, IPondResult } from '@/types/task';
import { getHistoryList } from '@/api/history';

export const usePonds = () => {
  const { data: res } = useQuery(['ponds'], () => getPondList());
  return res?.data as Array<IPondResult>;
};

export const useTasks = (id: number | undefined) => {
  const { data: res } = useQuery(['tasks'], () => getTaskList(id));
  return res?.data as Array<ITaskResult>;
};

export const useDropHistory = (id: number | undefined) => {
  const { data: res } = useQuery(['histories'], () => getHistoryList(id));
  return res?.data;
};
