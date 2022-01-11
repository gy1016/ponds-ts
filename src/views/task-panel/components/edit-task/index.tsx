import React, { FC, useEffect } from 'react';
import moment from 'moment';
import { useForm } from 'antd/es/form/Form';
import { Form, Input, Modal, DatePicker, Slider } from 'antd';
import { useEditTask, useOneTask } from '@/hooks/useTaskPonds';

const useTaskModal = (taskId: number | undefined) => {
  const { data: res } = useOneTask(taskId);
  const editingTask = { ...res?.data, startAt: moment(res?.data?.startAt), endAt: moment(res?.data?.endAt) };
  return { editingTask };
};

interface IEditTaskProps {
  taskId: number | undefined;
  toggleEditModal: () => void;
}

const EditTaskModal: FC<IEditTaskProps> = (props) => {
  const { taskId, toggleEditModal } = props;
  const [form] = useForm();
  const { editingTask } = useTaskModal(taskId);
  const { mutateAsync: editTask } = useEditTask('tasks');
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    toggleEditModal();
  };

  const onCancel = () => {
    toggleEditModal();
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText="确认"
      cancelText="取消"
      title="编辑任务"
      visible={!!taskId}
    >
      <Form {...layout} form={form}>
        <Form.Item label="任务描述" name="describe" rules={[{ required: true, message: '请输入任务描述' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="开始时间" name="startAt">
          <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} />
        </Form.Item>
        <Form.Item label="结束时间" name="endAt">
          <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} />
        </Form.Item>
        <Form.Item label="重要程度" name="importance">
          <Slider min={-5} max={5} />
        </Form.Item>
        <Form.Item label="紧急程度" name="urgency">
          <Slider min={-5} max={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
