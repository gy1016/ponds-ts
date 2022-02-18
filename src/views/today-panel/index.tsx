import useAuth from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTaskPonds';
import React, { FC } from 'react';
import ThreeSpace from './components/three-space';
import Curriculum from './components/curriculum';
import './index.less';

const TodayPanel: FC = () => {
  const { user } = useAuth();
  const tasks = useTasks(user?.id);

  return (
    <div className="today-panel">
      <ThreeSpace tasks={tasks} />
      <Curriculum tasks={tasks} />
    </div>
  );
};

export default TodayPanel;
