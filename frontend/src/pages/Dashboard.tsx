import React from 'react';
import { Card, Typography, Button } from 'antd';
import { useAuth } from '../contexts/AuthContext';

const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div style={{ padding: 24 }}>
            <Card>
                <Title level={2}>Dashboard</Title>
                <Paragraph>
                    환영합니다, <strong>{user?.name}</strong>님! ({user?.role})
                </Paragraph>
                <Paragraph>
                    이곳에서 재고 및 수요 예측 현황을 확인하실 수 있습니다.
                </Paragraph>
                <Button onClick={logout} danger>로그아웃</Button>
            </Card>
        </div>
    );
};

export default Dashboard;
