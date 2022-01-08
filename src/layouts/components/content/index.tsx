import React, { FC } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Route, Routes } from 'react-router-dom';

interface TpContentProps {
  collapsed: boolean;
  toggle: () => void;
}

const TpContent: FC<TpContentProps> = (props) => {
  const { collapsed, toggle } = props;
  const { Header, Content } = Layout;

  return (
    <Layout className="auth-app-layout">
      <Header className="app-layout-header" style={{ padding: 0 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: toggle,
        })}
      </Header>
      <Content className="app-layout-content">
        <Routes>
          <Route path="panel" element={<div>任务面板</div>} />
          <Route path="analysis" element={<div>分析面板</div>} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default TpContent;
