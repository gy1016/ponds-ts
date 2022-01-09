import React, { FC, useState } from 'react';
import { Layout } from 'antd';
import TpMenu from './components/menu';
import TpContent from './components/content';
import TpRouterArr from '@/settings/routerSetting';
import TpViewArr from '@/settings/viewSetting';
import { TP_SITE_TITLE } from '@/settings/siteSetting';
import './index.less';

const AuthenticatedApp: FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="auth-app">
      <TpMenu collapsed={collapsed} routerArr={TpRouterArr} siteTitle={TP_SITE_TITLE} />
      <TpContent collapsed={collapsed} toggle={toggle} viewArr={TpViewArr} />
    </Layout>
  );
};

export default AuthenticatedApp;
