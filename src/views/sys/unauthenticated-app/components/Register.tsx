import React, { FC, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Register: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    console.log('haha');
  };

  return (
    <div style={{ width: 360 }}>
      <Form name="tp-register" className="tp-register" initialValues={{ remember: true }} onFinish={handleSubmit}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Please input your Username:"
            type="text"
            id="username"
            autoComplete="on"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Please input your Password:"
            id="password"
            autoComplete="on"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please confirm your Password!' }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Please confirm your Password:"
            id="password"
            autoComplete="on"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
