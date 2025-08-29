import '@ant-design/v5-patch-for-react-19';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router';
import 'antd/dist/reset.css';
import './index.css';
import AppLayout from './AppLayout.tsx';
import { Route } from 'react-router';
import { TodosPage } from './pages/TodosPage/TodosPage.tsx';
import { Profile } from './components/Profile/Profile.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<TodosPage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
