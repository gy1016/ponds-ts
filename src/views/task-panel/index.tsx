import React, { FC, useState } from 'react';
import Pond from './components/pond';
import { useTasks, usePonds } from '@/hooks/useTaskPonds';
import { IPondResult, ITaskResult } from '@/types/task';
import useAuth from '@/hooks/useAuth';
import EditTaskModal from './components/edit-task';
import './index.less';

const TaskPanel: FC = () => {
  const { user } = useAuth();
  const ponds: Array<IPondResult> = usePonds();
  const tasks: Array<ITaskResult> = useTasks(user?.id);
  const [isEditVis, setIsEditVis] = useState(false);
  const [taskId, setTaskId] = useState<undefined | number>();

  const toggleEditModal = (taskId?: number) => {
    setTaskId(taskId);
    setIsEditVis(!isEditVis);
  };

  return (
    <div className="task-panel">
      {ponds?.map((p) => (
        <Pond
          key={p.id}
          pondInfo={p}
          taskList={tasks?.filter((t) => t.belong === p.id)}
          toggleEditModal={toggleEditModal}
        />
      ))}
      <EditTaskModal taskId={taskId} toggleEditModal={toggleEditModal} />
    </div>
  );
};

export default TaskPanel;
