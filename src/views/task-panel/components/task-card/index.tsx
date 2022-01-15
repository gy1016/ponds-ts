import React, { BaseSyntheticEvent, FC, useRef, useState } from 'react';
import { Card, Rate } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined, DeleteOutlined } from '@ant-design/icons';
import { ITaskResult } from '@/types/task';
import { useDelTask } from '@/hooks/useTaskPonds';
import './index.less';

interface ITaskCardProps {
  task: ITaskResult;
  toggleEditModal: (taskId: number) => void;
}

const importanceDesc = ['不重要', '不太重要', '重要', '有点重要', '非常重要！'];
const urgencyDesc = ['不着急', '不太着急', '着急', '有点着急', '十万火急！'];
const customIcons: any = {
  1: <SmileOutlined />,
  2: <SmileOutlined />,
  3: <MehOutlined />,
  4: <FrownOutlined />,
  5: <FrownOutlined />,
};

const TaskCard: FC<ITaskCardProps> = (props) => {
  const { task, toggleEditModal } = props;
  const starMap = (val: number) => {
    const m = [
      [0, -5],
      [0.5, -4],
      [1, -3],
      [1.5, -2],
      [2, -1],
      [2.5, 0],
      [3, 1],
      [3.5, 2],
      [4, 3],
      [4.5, 4],
      [5, 5],
    ];
    return (m.find((item) => item[1] === val) as any)[0];
  };
  const del = useRef<HTMLDivElement>(null);
  const { mutateAsync: delTask } = useDelTask('tasks');

  const handleDel = (e: BaseSyntheticEvent) => {
    e.stopPropagation();
    delTask({ id: task.id, sort: task.sort });
  };

  return (
    <Card
      onClick={() => {
        toggleEditModal(task.id);
      }}
      onMouseEnter={() => {
        (del.current as HTMLDivElement).style.width = '8rem';
      }}
      onMouseLeave={() => {
        (del.current as HTMLDivElement).style.width = '0';
      }}
      size="small"
      style={{ marginBottom: '1rem', backgroundColor: '#F0F5FF', cursor: 'pointer', position: 'relative' }}
    >
      <div>{task.describe}</div>
      <div>
        <Rate
          tooltips={importanceDesc}
          disabled
          value={starMap(task.importance)}
          allowHalf
          style={{ fontSize: '1rem', marginRight: '1.5rem' }}
        />
        <Rate
          tooltips={urgencyDesc}
          value={starMap(task.urgency)}
          disabled
          allowHalf
          character={({ index }: { index: number }) => customIcons[index + 1]}
          style={{ fontSize: '1rem' }}
        />
      </div>
      <div className="tp-del" ref={del} onClick={(e) => handleDel(e)}>
        删除
      </div>
    </Card>
  );
};

export default TaskCard;
