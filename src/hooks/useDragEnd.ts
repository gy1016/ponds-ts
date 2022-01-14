import useAuth from '@/hooks/useAuth';
import { reorderPonds } from '@/api/pond';
import { useReorderPond, useReorderTask } from './useTaskPonds';
import { usePonds, useTasks } from '@/hooks/useTaskPonds';
import { DropResult } from 'react-beautiful-dnd';
import { useCallback } from 'react';
import { addHistory } from '@/api/history';

export const useDragEnd = () => {
  const { user } = useAuth();
  const ponds = usePonds();
  const tasks = useTasks(user!.id);
  const { mutate: reorderPonds } = useReorderPond();
  const { mutate: reorderTask } = useReorderTask();

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // 池子排序，不过我们不允许，还是要有的
      if (type === 'COLUMN') {
        const fromId = ponds?.[source.index].id;
        const toId = ponds?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? 'after' : 'before';
        reorderPonds({ fromId, referenceId: toId, type });
      }

      // 任务排序
      if (type === 'ROW') {
        const fromPondId = Number(source.droppableId);
        const toPondId = Number(destination.droppableId);
        console.log(source, destination);
        console.log(source.index, destination.index);
        const fromTask = tasks.filter((task) => task.belong === fromPondId)[source.index];
        // toTask可能为空，因为toPond里面可能就没有任务
        const toTask = tasks.filter((task) => task.belong === toPondId)[destination.index];
        console.log('fromPondId', fromPondId, 'toPondId', toPondId, 'fromTask', fromTask, 'toTask', toTask);
        if (fromPondId !== toPondId) {
          addHistory({
            userId: user!.id,
            taskId: fromTask?.id,
            fromId: fromPondId,
            toId: toPondId,
          });
        }
        // console.log(fromPondId === toPondId && destination.index > source.index ? 'after' : 'before');

        reorderTask({
          // 直接写成source.index应该也可以
          fromId: source.index,
          // 写成destination.index应该也可以
          referenceId: destination.index,
          fromPondId,
          toPondId,
          type: fromPondId === toPondId && destination.index > source.index ? 'after' : 'before',
          tag: fromTask?.id,
        });
      }
    },
    [ponds, reorderPonds, tasks, reorderTask, addHistory],
  );
};
