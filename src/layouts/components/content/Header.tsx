import React, { FC } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import useAuth from '@/hooks/useAuth';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

interface TpHeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

const TpHeader: FC<TpHeaderProps> = (props) => {
  const { Header } = Layout;
  const { user, logout } = useAuth();
  const { collapsed, toggle } = props;
  const handleLogout = () => {
    // 日后可能加向服务端发起token失效的请求
    logout();
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          个人信息
        </a>
      </Menu.Item>
      <Menu.Item key="logout" danger onClick={handleLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="app-layout-header"
      style={{ position: 'relative', padding: 0, background: '#ffffff', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle,
      })}
      <Dropdown overlay={menu}>
        <div className="tp-avatar">
          <img src={user?.avatar} alt={user?.username} />
        </div>
      </Dropdown>
    </Header>
  );
};

export default TpHeader;
