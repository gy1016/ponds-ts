import React, { FC } from 'react';
import { usePonds } from '@/hooks/useTask';

const TaskPanel: FC = () => {
  const ponds = usePonds();
  return <div className="task-panel">任务面板</div>;
};

export default TaskPanel;
