import { Outlet } from 'react-router';
import { SideMenu } from './components/SideMenu/SideMenu';

function AppLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ width: 150, borderRight: '1px solid #f0f0f0' }}>
        <SideMenu />
      </div>
      <div style={{ flex: 1, padding: 16, width: 700 }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
