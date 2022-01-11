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

interface IPondProps {
  pondInfo: IPondResult;
  taskList: Array<ITaskResult>;
  toggleEditModal: (taskId: number) => void;
}

const Pond: FC<IPondProps> = (props) => {
  const { pondInfo, taskList, toggleEditModal } = props;
  const { name_cn: nameCn, name_en: nameEn, info: desc, id } = pondInfo;
  const { user } = useAuth();

  const classes = classNames('tp-pond', nameEn);

  return (
    <div className={classes}>
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
        {taskList?.map((t) => (
          <TaskCard toggleEditModal={toggleEditModal} key={t.id} task={t} />
        ))}
      </div>
      <CreateTask belong={id} userId={user!.id} />
    </div>
  );
};

export default Pond;
