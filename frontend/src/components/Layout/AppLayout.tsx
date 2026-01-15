import React, { useState } from 'react';
import { Layout, Menu, Button, Typography, Avatar, Dropdown } from 'antd';
import {
    DashboardOutlined,
    AppstoreOutlined,
    ShoppingCartOutlined,
    BarChartOutlined,
    SettingOutlined,
    UserOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const menuItems = [
        {
            key: '/',
            icon: <DashboardOutlined />,
            label: '대시보드',
        },
        {
            key: '/skus',
            icon: <AppstoreOutlined />,
            label: '재고 관리',
        },
        {
            key: '/predictions',
            icon: <BarChartOutlined />,
            label: '수요 예측',
            disabled: true, // Not implemented yet
        },
        {
            key: '/purchase-orders',
            icon: <ShoppingCartOutlined />,
            label: '발주 관리',
            disabled: true, // Not implemented yet
        },
        {
            key: '/settings',
            icon: <SettingOutlined />,
            label: '설정',
            disabled: true, // Not implemented yet
        },
    ];

    const handleMenuClick = ({ key }: { key: string }) => {
        navigate(key);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };



    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', textAlign: 'center', color: '#fff', lineHeight: '32px', fontWeight: 'bold' }}>
                    {collapsed ? 'IF' : 'Inventory Forecaster'}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={handleMenuClick}
                />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: '0 24px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography.Text strong style={{ marginRight: 16 }}>
                            {user?.name || 'User'} ({user?.role})
                        </Typography.Text>
                        <Dropdown menu={{
                            items: [
                                {
                                    key: '1',
                                    icon: <UserOutlined />,
                                    label: '프로필'
                                },
                                {
                                    type: 'divider'
                                },
                                {
                                    key: '2',
                                    icon: <LogoutOutlined />,
                                    label: '로그아웃',
                                    danger: true,
                                    onClick: handleLogout
                                }
                            ]
                        }} placement="bottomRight">
                            <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: '#fff', // Or transparent if pages have their own cards
                        overflow: 'initial'
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
