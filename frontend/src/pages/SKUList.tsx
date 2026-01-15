import React, { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import { type Sku, getSkus, type SkuFilterParams } from '../services/sku.service';
import SKUTable from '../components/SKU/SKUTable';
import SKUFilters from '../components/SKU/SKUFilters';

const { Title } = Typography;

const SKUList: React.FC = () => {
    const [skus, setSkus] = useState<Sku[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [filters, setFilters] = useState<any>({});
    const [sorter, setSorter] = useState<any>({});

    const fetchData = async () => {
        setLoading(true);
        try {
            const params: SkuFilterParams = {
                page: pagination.current,
                limit: pagination.pageSize,
                ...filters,
            };

            if (sorter.field) {
                params.sortBy = sorter.field === 'name' ? 'name' : sorter.field === 'stockoutDate' ? 'stockoutDate' : undefined;
                params.sortOrder = sorter.order === 'ascend' ? 'ASC' : 'DESC';
            }

            const data = await getSkus(params);
            setSkus(data.items);
            setPagination(prev => ({
                ...prev,
                total: data.total,
            }));
        } catch (error) {
            console.error("Failed to fetch SKUs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pagination.current, pagination.pageSize, filters, sorter]);

    const handleTableChange = (newPagination: any, _newFilters: any, newSorter: any) => {
        setPagination(prev => ({
            ...prev,
            current: newPagination.current,
            pageSize: newPagination.pageSize
        }));
        setSorter(newSorter);
    };

    const handleFilterSearch = (values: any) => {
        setFilters(values);
        setPagination(prev => ({ ...prev, current: 1 })); // Reset to page 1 on search
    };

    const handleViewDetails = (skuId: string) => {
        console.log(`View details for ${skuId}`);
        // Navigate to details page (to be implemented)
    };

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>재고(SKU) 관리</Title>
            <Card style={{ marginBottom: 24 }}>
                <SKUFilters onSearch={handleFilterSearch} />
            </Card>
            <Card>
                <SKUTable
                    data={skus}
                    loading={loading}
                    pagination={pagination}
                    onChange={handleTableChange}
                    onViewDetails={handleViewDetails}
                />
            </Card>
        </div>
    );
};

export default SKUList;
