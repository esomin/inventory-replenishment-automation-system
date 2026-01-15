import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getPurchaseOrders, type PurchaseOrder, updatePurchaseOrder } from '../services/purchaseOrder.service';
import PurchaseOrderTable from '../components/PurchaseOrder/PurchaseOrderTable';
import PurchaseOrderForm from '../components/PurchaseOrder/PurchaseOrderForm';
import { useAuth } from '../contexts/AuthContext';

const { Title } = Typography;

const PurchaseOrders: React.FC = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<PurchaseOrder[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getPurchaseOrders({
                page: pagination.current,
                limit: pagination.pageSize,
            });
            setOrders(data.items);
            setPagination(prev => ({
                ...prev,
                total: data.total,
            }));
        } catch (error) {
            console.error(error);
            message.error('발주안 목록을 불러오지 못했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pagination.current, pagination.pageSize]);

    const handleTableChange = (newPagination: any) => {
        setPagination(prev => ({
            ...prev,
            current: newPagination.current,
            pageSize: newPagination.pageSize
        }));
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await updatePurchaseOrder(id, { status });
            message.success('상태가 변경되었습니다.');
            fetchData();
        } catch (error) {
            message.error('상태 변경 실패');
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Title level={2} style={{ margin: 0 }}>발주안 관리</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCreateModalOpen(true)}>
                    새 발주안 작성
                </Button>
            </div>

            <Card>
                <PurchaseOrderTable
                    data={orders}
                    loading={loading}
                    pagination={pagination}
                    onChange={handleTableChange}
                    onUpdateStatus={handleUpdateStatus}
                    onRefresh={fetchData}
                    currentUserId={user?.id ? String(user.id) : undefined}
                    currentUserRole={user?.role}
                />
            </Card>

            <Modal
                title="새 발주안 작성"
                open={isCreateModalOpen}
                footer={null}
                onCancel={() => setIsCreateModalOpen(false)}
                destroyOnClose
            >
                <PurchaseOrderForm
                    onSuccess={() => {
                        setIsCreateModalOpen(false);
                        fetchData();
                    }}
                    onCancel={() => setIsCreateModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default PurchaseOrders;
