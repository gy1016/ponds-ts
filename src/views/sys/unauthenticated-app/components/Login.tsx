import React, { FC, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { IForm } from '@/types/user';
import useAuth from '@/hooks/useAuth';

const Login: FC = () => {
  const account = localStorage.getItem('account');
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(account ? JSON.parse(account).u : '');
  const [password, setpassword] = useState(account ? JSON.parse(account).p : '');
  const { login } = useAuth();

  const handleSubmit = (values: IForm) => {
    login(values);
  };

  return (
    <div style={{ width: 360 }}>
      <Form name="tp-login" className="login-form" initialValues={{ remember: !!account }} onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
          initialValue={username}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="体验用户： taskponds"
            type="text"
            id="username"
            autoComplete="on"
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
          initialValue={password}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="体验密码：taskponds"
            id="password"
            autoComplete="on"
            allowClear
          />
        </Form.Item>

        <Form.Item>
          <div className="form">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a href="">Forgot your password?</a>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
