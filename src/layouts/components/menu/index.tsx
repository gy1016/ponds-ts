import React, { FC } from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { TpRouterProps } from '@/types/global';
import logo from '@/assets/logo.svg';

interface TpMenuProps {
  collapsed: boolean;
  siteTitle: string;
  routerArr: Array<TpRouterProps>;
}

const TpMenu: FC<TpMenuProps> = (props) => {
  const { Sider } = Layout;
  const { collapsed, siteTitle, routerArr } = props;

  return (
    <Sider
      className="auth-app-sider"
      trigger={null}
      collapsible
      collapsed={collapsed}
      width="150px"
      collapsedWidth="40px"
    >
      <div className="logo">
        <svg className="logo-svg" viewBox={logo.viewBox}>
          <use xlinkHref={`#${logo.id}`} />
        </svg>
        <span>{!collapsed ? siteTitle : ''}</span>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {routerArr.map((router) => {
          return (
            <Menu.Item key={router.id} icon={router.icon}>
              <Link to={router.path}>{router.label}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default TpMenu;
