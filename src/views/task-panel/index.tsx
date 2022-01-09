import React, { FC } from 'react';
import Pond from './components/pond';
import { useTasks, usePonds } from '@/hooks/useTask';
import { IPondResult, ITaskResult } from '@/types/task';
import useAuth from '@/hooks/useAuth';
import './index.less';

const TaskPanel: FC = () => {
  const { user } = useAuth();
  const ponds: Array<IPondResult> = usePonds();
  const tasks: Array<ITaskResult> = useTasks(user?.id);

  return (
    <div className="task-panel">
      {ponds?.map((p) => (
        <Pond key={p.id} pondInfo={p} taskList={tasks?.filter((t) => t.belong === p.id)} />
      ))}
    </div>
  );
};

export default TaskPanel;
