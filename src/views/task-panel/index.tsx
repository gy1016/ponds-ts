import React, { FC, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Drop, DropChild } from '@/components/drag-and-drop';
import Pond from './components/pond';
import { useTasks, usePonds } from '@/hooks/useTaskPonds';
import { IPondResult, ITaskResult } from '@/types/task';
import useAuth from '@/hooks/useAuth';
import EditTaskModal from './components/edit-task';
import { useDragEnd } from '@/hooks/useDragEnd';
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

  const onDragEnd = useDragEnd();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-panel">
        <Drop type="COLUMN" direction="horizontal" droppableId="ponds-drop" isDropDisabled={false}>
          <DropChild style={{ width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {ponds?.map((p) => (
              <Pond
                key={p.id}
                pondInfo={p}
                taskList={tasks?.filter((t) => t.belong === p.id)}
                toggleEditModal={toggleEditModal}
              />
            ))}
          </DropChild>
        </Drop>
        <EditTaskModal taskId={taskId} toggleEditModal={toggleEditModal} />
      </div>
    </DragDropContext>
  );
};

export default TaskPanel;
