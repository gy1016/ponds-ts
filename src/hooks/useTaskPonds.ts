import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getPondList, reorderPonds } from '@/api/pond';
import { getTaskList, addTask, editTask, getTask, reorderTasks } from '@/api/task';
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

export const useOneTask = (id: number | undefined) => {
  return useQuery(['task', id], () => getTask(id));
};

export const useDropHistory = (id: number | undefined) => {
  const { data: res } = useQuery(['histories'], () => getHistoryList(id));
  return res?.data;
};

export const useAddTask = (queryKey: string) => {
  const queryClient = useQueryClient();
  return useMutation(({ belong, userId, describe }: any) => addTask({ belong, userId, describe }), {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
  });
};

export const useEditTask = (queryKey: string) => {
  const queryClient = useQueryClient();
  return useMutation((params) => editTask(params), {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
  });
};

export interface IPondSortProps {
  fromId: number; // 要重新排序的item
  referenceId: number; // 目标item
  type: 'before' | 'after'; // 放在目标item的前还是后
}

export const useReorderPond = () => {
  return useMutation((data: IPondSortProps) => {
    return reorderPonds<IPondSortProps>(data);
  });
};

interface ITaskSortProps {
  fromId: number;
  referenceId: number;
  type: 'before' | 'after';
  fromPondId?: number;
  toPondId?: number;
  tag?: number;
}

export const useReorderTask = () => {
  return useMutation((data: ITaskSortProps) => {
    return reorderTasks<ITaskSortProps>(data);
  });
};
