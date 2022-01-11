import React, { FC, useState } from 'react';
import { List, Modal, Input } from 'antd';
import { SmileTwoTone } from '@ant-design/icons';
import './index.less';

interface ITaskTraceProps {
  onSearch: (val: string) => any;
}

const TaskTraceCard: FC<ITaskTraceProps> = (props) => {
  const { onSearch: onSearchFunc } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [operand, setOperand] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const { Search } = Input;

  const onSearch = (value: string) => {
    setOperand(onSearchFunc(value));
    setSearchValue(value);
    setIsVisible(true);
  };

  return (
    <div className="task-trace-card">
      <span className="title-style">检索任务操作过程</span>
      <Search placeholder="请输入需要搜索的任务名称" size="large" onSearch={onSearch} style={{ width: '30rem' }} />
      <Modal
        title={`操作记录 ${searchValue}`}
        visible={isVisible}
        onCancel={() => {
          setIsVisible(false);
        }}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          size="small"
          dataSource={operand}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta avatar={<SmileTwoTone />} title={item.type} description={item.time?.toLocaleString()} />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default TaskTraceCard;
