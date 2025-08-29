import { Menu } from 'antd';
import { Link, useLocation } from 'react-router';
import { UnorderedListOutlined, UserOutlined } from '@ant-design/icons';

export const SideMenu = () => {
  const location = useLocation();

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      style={{ height: '100%', borderRight: 0 }}
    >
      <Menu.Item key="/" icon={<UnorderedListOutlined />}>
        <Link to="/">Задачи</Link>
      </Menu.Item>

      <Menu.Item key="/profile" icon={<UserOutlined />}>
        <Link to="/profile">Профиль</Link>
      </Menu.Item>
    </Menu>
  );
};
