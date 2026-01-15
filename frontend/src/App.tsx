import React from 'react';
import { ConfigProvider } from 'antd';
import AppRoutes from './routes/AppRoutes';
import './App.css';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <AppRoutes />
    </ConfigProvider>
  );
};

export default App;
