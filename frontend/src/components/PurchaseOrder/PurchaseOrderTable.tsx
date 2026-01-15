import React, { useState } from 'react';
import { Table, Button, Space, Modal } from 'antd';
import type { PurchaseOrder } from '../../services/purchaseOrder.service';
import StatusBadge from './StatusBadge';
import moment from 'moment';

interface PurchaseOrderTableProps {
    data: PurchaseOrder[];
    loading: boolean;
    pagination: {
        current: number;
        pageSize: number;
        total: number;
    };
    onChange: (pagination: any) => void;
    onUpdateStatus: (id: string, status: string) => void;
    onRefresh: () => void;
    currentUserId?: string;
    currentUserRole?: string;
}

const PurchaseOrderTable: React.FC<PurchaseOrderTableProps> = ({
    data,
    loading,
    pagination,
    onChange,
    onUpdateStatus,
    onRefresh,
    currentUserRole
}) => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedPo, setSelectedPo] = useState<PurchaseOrder | null>(null);

    const columns = [
        {
            title: '발주번호',
            dataIndex: 'poNumber',
            key: 'poNumber',
        },
        {
            title: '상품',
            dataIndex: 'product',
            key: 'product',
            render: (product: any) => product?.name || 'Unknown Product',
        },
        {
            title: '수량',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: '상태',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => <StatusBadge status={status} />,
        },
        {
            title: '요청자',
            dataIndex: 'requestedBy',
            key: 'requestedBy',
            render: (user: any) => user?.name || '-',
        },
        {
            title: '작성일',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => moment(date).format('YYYY-MM-DD HH:mm'),
        },
        {
            title: '작업',
            key: 'action',
            render: (_: any, record: PurchaseOrder) => (
                <Space size="middle">
                    {/* Role based actions */}
                    {record.status === 'DRAFT' && (
                        <Button size="small" onClick={() => handleEdit(record)}>수정</Button>
                    )}
                    {record.status === 'DRAFT' && (
                        <Button size="small" type="primary" onClick={() => onUpdateStatus(record.id, 'PENDING')}>제출</Button>
                    )}
                    {currentUserRole !== 'OPERATOR' && record.status === 'PENDING' && (
                        <>
                            <Button size="small" type="primary" onClick={() => onUpdateStatus(record.id, 'APPROVED')}>승인</Button>
                            <Button size="small" danger onClick={() => onUpdateStatus(record.id, 'REJECTED')}>반려</Button>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const handleEdit = (po: PurchaseOrder) => {
        setSelectedPo(po);
        setEditModalVisible(true);
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                pagination={pagination}
                onChange={onChange}
            />

            {editModalVisible && (
                <Modal
                    title="발주안 수정"
                    open={editModalVisible}
                    footer={null}
                    onCancel={() => setEditModalVisible(false)}
                >
                    {/* Placeholder for Edit Form - Create logic reuses PurchaseOrderForm */}
                    <p>수정 기능은 곧 지원됩니다.</p>
                </Modal>
            )}
        </>
    );
};

export default PurchaseOrderTable;
