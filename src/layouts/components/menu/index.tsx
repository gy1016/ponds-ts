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
      style={{ background: '#ffffff', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}
    >
      <div className="logo">
        <svg className="logo-svg" viewBox={logo.viewBox}>
          <use xlinkHref={`#${logo.id}`} />
        </svg>
        <span>{!collapsed ? siteTitle : ''}</span>
      </div>
      <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
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
