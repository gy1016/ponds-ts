import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getPondList } from '@/api/pond';
import { getTaskList } from '@/api/task';

export const usePonds = () => {
  const { data: res } = useQuery(['ponds'], () => getPondList());
  return res?.data;
};

export const useTasks = (id: number | undefined) => {
  const { data: res } = useQuery(['tasks'], () => getTaskList(id));
  return res?.data;
};
