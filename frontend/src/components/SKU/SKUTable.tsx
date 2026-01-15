import React from 'react';
import { Table, Button, Space } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import { type Sku } from '../../services/sku.service';
import StockoutRiskBadge from './StockoutRiskBadge';

interface SKUTableProps {
    data: Sku[];
    loading: boolean;
    pagination: {
        current: number;
        pageSize: number;
        total: number;
    };
    onChange: (pagination: any, filters: any, sorter: any) => void;
    onViewDetails: (skuId: string) => void;
}

const SKUTable: React.FC<SKUTableProps> = ({ data, loading, pagination, onChange, onViewDetails }) => {
    const columns: ColumnsType<Sku> = [
        {
            title: 'SKU 코드',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: '제품명',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
        },
        {
            title: '카테고리',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: '현재 재고',
            dataIndex: 'totalStock', // This comes from backend enrichment or just inventories sum
            key: 'totalStock',
            render: (val) => val?.toLocaleString() || 0,
        },
        {
            title: '안전 재고',
            dataIndex: 'safetyStock',
            key: 'safetyStock',
            render: (val) => val?.toLocaleString() || 0,
        },
        {
            title: '품절 위험',
            key: 'risk',
            render: (_, record) => (
                <StockoutRiskBadge prediction={record.latestPrediction} />
            ),
        },
        {
            title: '예상 품절일',
            key: 'stockoutDate',
            sorter: true,
            render: (_, record) => record.latestPrediction?.predictedStockoutDate
                ? new Date(record.latestPrediction.predictedStockoutDate).toLocaleDateString()
                : '-'
        },
        {
            title: '작업',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => onViewDetails(record.id)}>상세 보기</Button>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={{
                ...pagination,
                showSizeChanger: true,
            }}
            loading={loading}
            onChange={onChange}
        />
    );
};

export default SKUTable;
