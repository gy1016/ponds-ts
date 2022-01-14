import React, { FC } from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { IPondResult, ITaskResult } from '@/types/task';
import { EMO_JI_MAP } from '@/settings/siteSetting';
import useAuth from '@/hooks/useAuth';
import TaskCard from '../task-card';
import CreateTask from '../create-task';
import './index.less';
import { Drop, DropChild, Drag } from '@/components/drag-and-drop';

interface IPondProps {
  pondInfo: IPondResult;
  taskList: Array<ITaskResult>;
  toggleEditModal: (taskId: number) => void;
}

const Pond: FC<IPondProps> = React.forwardRef<HTMLDivElement, IPondProps>(
  ({ pondInfo, taskList, toggleEditModal, ...props }, ref) => {
    const { name_cn: nameCn, name_en: nameEn, info: desc, id } = pondInfo;
    const { user } = useAuth();

    const classes = classNames('tp-pond', nameEn);

    return (
      <div className={classes} ref={ref} {...props}>
        <div className="tp-pond-header">
          <span className="pond-header-emoji">
            {`${EMO_JI_MAP[id]} ${nameCn + ' '}`}
            <Tooltip placement="rightTop" title={desc}>
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
          <div className="pond-header-count">{`共计:${taskList?.length}条`}</div>
        </div>
        <div className="tp-pond-container">
          <Drop type="ROW" direction="vertical" droppableId={String(id)}>
            <DropChild style={{ minHeight: '1rem' }}>
              {taskList?.map((t, idx) => (
                <Drag key={t.id} index={idx} draggableId={'drag' + t.id}>
                  <div>
                    <TaskCard toggleEditModal={toggleEditModal} key={t.id} task={t} />
                  </div>
                </Drag>
              ))}
            </DropChild>
          </Drop>
        </div>
        <CreateTask belong={id} userId={user!.id} />
      </div>
    );
  },
);

export default Pond;
