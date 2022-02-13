import React, { FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Loading from '@/views/sys/loading';
import { TpViewProps } from '@/types/global';
import TpHeader from './Header';

interface TpContentProps {
  collapsed: boolean;
  toggle: () => void;
  viewArr: Array<TpViewProps>;
}

const TpContent: FC<TpContentProps> = (props) => {
  const { collapsed, toggle, viewArr } = props;
  const { Content } = Layout;
  const defaultView = viewArr.find((view) => view.default)?.path;

  return (
    <Layout className="auth-app-layout">
      <TpHeader collapsed={collapsed} toggle={toggle} />
      <Content className="app-layout-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to={`/${defaultView}`} />} />
            {viewArr.map((view) => {
              return <Route key={view.id} path={view.path} element={view.element} />;
            })}
            <Route path="*" element={<Navigate to={`/${defaultView}`} />} />
          </Routes>
        </Suspense>
      </Content>
    </Layout>
  );
};

export default TpContent;
