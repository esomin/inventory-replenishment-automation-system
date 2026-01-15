import React from 'react';
import { Layout, Menu, Button, Typography, theme, Avatar, Dropdown } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    BarChartOutlined,
    DatabaseOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const AppLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, user } = useAuth();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuItems = [
        {
            key: '/',
            icon: <BarChartOutlined />,
            label: '대시보드',
        },
        {
            key: '/skus',
            icon: <DatabaseOutlined />,
            label: '재고(SKU) 관리',
        },
        {
            key: '/purchase-orders',
            icon: <ShoppingCartOutlined />,
            label: '발주안 관리',
        }
    ];

    const handleMenuClick = (info: { key: string }) => {
        navigate(info.key);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const userMenu = {
        items: [
            {
                key: 'logout',
                label: '로그아웃',
                icon: <LogoutOutlined />,
                onClick: handleLogout,
                danger: true,
            }
        ]
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={260} style={{ background: '#001529' }}>
                <div style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: 32,
                        height: 32,
                        background: '#1677ff',
                        borderRadius: 6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '18px'
                    }}>
                        IF
                    </div>
                    <Title level={5} style={{ color: 'white', margin: 0, fontWeight: 600 }}>
                        Inventory<br />Forecaster
                    </Title>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={handleMenuClick}
                    style={{ borderRight: 0 }}
                />
            </Sider>
            <Layout>
                <Header style={{
                    padding: '0 24px',
                    background: colorBgContainer,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                    zIndex: 1
                }}>
                    <Dropdown menu={userMenu} placement="bottomRight" arrow>
                        <Button type="text" style={{ height: 'auto', padding: '4px 8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ textAlign: 'right', marginRight: 4 }}>
                                    <Text strong style={{ display: 'block', lineHeight: 1.2 }}>{user?.email || 'User'}</Text>
                                    <Text type="secondary" style={{ fontSize: '11px' }}>{user?.role || 'Operator'}</Text>
                                </div>
                                <Avatar
                                    style={{ backgroundColor: '#1677ff' }}
                                    icon={<UserOutlined />}
                                />
                            </div>
                        </Button>
                    </Dropdown>
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
