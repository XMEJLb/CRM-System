import { Outlet } from 'react-router'
import { SideMenu } from './components/SideMenu/SideMenu'
import { Layout } from 'antd'

const { Content, Sider } = Layout

function AppLayout() {
  return (
    <Layout style={{ minHeight: '100vh', width: '100%' }}>
      <Sider width={240}>
        <SideMenu />
      </Sider>

      <Layout style={{ background: '#fff' }}>
        <Content style={{ background: '#fff', padding: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
