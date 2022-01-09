import React, { FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Loading from '@/views/sys/loading';
import { TpViewProps } from '@/types/global';

interface TpContentProps {
  collapsed: boolean;
  toggle: () => void;
  viewArr: Array<TpViewProps>;
}

const TpContent: FC<TpContentProps> = (props) => {
  const { collapsed, toggle, viewArr } = props;
  const { Header, Content } = Layout;
  const defaultView = viewArr.find((view) => view.default)?.path;

  return (
    <Layout className="auth-app-layout">
      <Header className="app-layout-header" style={{ padding: 0 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: toggle,
        })}
      </Header>
      <Content className="app-layout-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to={`/${defaultView}`} />} />
            {viewArr.map((view) => {
              return <Route key={view.id} path={view.path} element={view.element} />;
            })}
          </Routes>
        </Suspense>
      </Content>
    </Layout>
  );
};

export default TpContent;
