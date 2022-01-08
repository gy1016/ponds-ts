import React, { FC } from 'react';
import { Row, Col, Image, Tabs, Space } from 'antd';
import Login from './components/Login';
import Register from './components/Register';
import Logo from '@/assets/bg-logo.png';
import Task from '@/assets/tp-title.png';
import './index.less';

const UnauthenticatedApp: FC = () => {
  const { TabPane } = Tabs;

  function callback() {
    console.log('cbk');
  }

  return (
    <div className="unauth-app">
      <div className="unauth-app-container">
        <Row align="middle" justify="center">
          <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="img-left" />
            <div style={{ position: 'relative', width: '360px' }}>
              <div style={{ marginTop: '-80px' }}>
                <Space size="middle">
                  <Image width={120} src={Logo} preview={false} />
                  <Image width={222} src={Task} preview={false} />
                </Space>
              </div>
              <div style={{ width: '360px', height: '284px', position: 'absolute', top: 'calc(50% - 142px)' }}>
                <Tabs defaultActiveKey="1" onChange={callback} animated>
                  <TabPane tab="Login" key="1">
                    <Login />
                  </TabPane>
                  <TabPane tab="Sign Up" key="2">
                    <Register />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UnauthenticatedApp;
