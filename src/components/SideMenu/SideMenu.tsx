import { Menu } from 'antd'
import { Link, useLocation } from 'react-router'
import { UnorderedListOutlined, UserOutlined } from '@ant-design/icons'

export const SideMenu = () => {
  const location = useLocation()

  const items = [
    {
      key: '/',
      icon: <UnorderedListOutlined />,
      label: <Link to="/">Задачи</Link>,
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: <Link to="/profile">Профиль</Link>,
    },
  ]

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      style={{ height: '100%', borderRight: 0 }}
      items={items}
    />
  )
}
