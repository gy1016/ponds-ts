import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getPondList } from '@/api/pond';

export const usePonds = () => {
  const { data: res } = useQuery(['ponds'], () => getPondList());
  return res?.data;
};
