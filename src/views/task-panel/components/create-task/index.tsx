import React, { FC, useEffect, useState } from 'react';
import { Card, Input, Button } from 'antd';
import { useAddTask } from '@/hooks/useTaskPonds';

interface ICreateTaskProps {
  belong: number;
  userId: number;
}

const CreateTask: FC<ICreateTaskProps> = (props) => {
  const { belong, userId } = props;

  const [describe, setDescribe] = useState('');
  const [inputMode, setInputMode] = useState(false);
  const { mutateAsync: add } = useAddTask('tasks');

  const submit = async () => {
    await add({ belong, userId, describe });
    setInputMode(false);
    setDescribe('');
  };

  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) {
      setDescribe('');
    }
  }, [inputMode]);

  if (!inputMode) {
    return (
      <Button type="dashed" block onClick={toggle}>
        <i className="iconfont icon-tianjia" style={{ fontStyle: '15px' }} />
        创建任务
      </Button>
    );
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder="有什么安排呀"
        autoFocus={true}
        onPressEnter={submit}
        value={describe}
        onChange={(evt) => setDescribe(evt.target.value)}
      />
    </Card>
  );
};

export default CreateTask;
