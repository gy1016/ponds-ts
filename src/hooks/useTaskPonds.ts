import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getPondList, reorderPonds } from '@/api/pond';
import { getTaskList, addTask, editTask, getTask, reorderTasks } from '@/api/task';
import { ITaskResult, IPondResult } from '@/types/task';
import { getHistoryList } from '@/api/history';
import { reorder } from '@/utils/taskpanel/reorder';

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

export const useReorderTask = (queryKey: string) => {
  const queryClient = useQueryClient();

  return useMutation((data: ITaskSortProps) => reorderTasks<ITaskSortProps>(data), {
    // 查询成功后的回调
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target) {
      // 得到react-query为我们保存的数据
      const previousItems = queryClient.getQueryData(queryKey);
      // 设置发送的请求返回前我们保存的数据
      queryClient.setQueryData(queryKey, (old: any) => {
        const { fromId, referenceId, fromPondId, toPondId, type, tag } = target;
        const fromTask = old?.data.find((t: ITaskResult) => t.id === tag);
        if (fromPondId !== toPondId) {
          fromTask.belong = toPondId;
          old?.data.forEach((t: ITaskResult) => {
            if (t.belong === fromPondId && t.sort > fromTask.sort) {
              t.sort -= 1;
            } else if (t.belong === toPondId && t.sort > referenceId) {
              t.sort += 1;
            }
          });
        } else {
          // fromId与referenceId是从0开始的，而我们的sort是从1开始的
          if (type === 'after') {
            old?.data.forEach((t: ITaskResult) => {
              if (t.belong === fromPondId && t.sort > fromId + 1 && t.sort < referenceId + 2) {
                t.sort -= 1;
              }
            });
          } else {
            old?.data.forEach((t: ITaskResult) => {
              if (t.belong === fromPondId && t.sort > referenceId && t.sort < fromId + 1) {
                t.sort += 1;
              }
            });
          }
        }
        fromTask.sort = referenceId + 1;
        old?.data.sort((a: ITaskResult, b: ITaskResult) => a.sort - b.sort);
        return old;
      });
      return { previousItems };
    },
    onError(error, newItem, context) {
      queryClient.setQueryData(queryKey, (context as { previousItems: any[] }).previousItems);
    },
  });
};
