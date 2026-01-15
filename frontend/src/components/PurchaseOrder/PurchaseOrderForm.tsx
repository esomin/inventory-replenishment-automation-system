import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select, Modal, message } from 'antd';
import { createPurchaseOrder, type CreatePurchaseOrderDto } from '../../services/purchaseOrder.service';
import { getSkus, type Sku } from '../../services/sku.service';

interface PurchaseOrderFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const PurchaseOrderForm: React.FC<PurchaseOrderFormProps> = ({ onSuccess, onCancel }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [skus, setSkus] = useState<Sku[]>([]);
    const [skuLoading, setSkuLoading] = useState(false);

    useEffect(() => {
        fetchSkus();
    }, []);

    const fetchSkus = async () => {
        setSkuLoading(true);
        try {
            const data = await getSkus({ page: 1, limit: 100 }); // Fetch top 100 for dropdown
            setSkus(data.items);
        } catch (error) {
            console.error(error);
        } finally {
            setSkuLoading(false);
        }
    };

    const handleFinish = async (values: any) => {
        setLoading(true);
        try {
            const dto: CreatePurchaseOrderDto = {
                skuId: values.skuId,
                quantity: values.quantity,
                notes: values.notes,
            };
            await createPurchaseOrder(dto);
            message.success('발주안이 생성되었습니다.');
            form.resetFields();
            onSuccess();
        } catch (error) {
            message.error('발주안 생성 실패');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
                name="skuId"
                label="상품 (SKU)"
                rules={[{ required: true, message: '상품을 선택해주세요.' }]}
            >
                <Select
                    showSearch
                    placeholder="SKU 검색"
                    loading={skuLoading}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={skus.map(sku => ({ label: `${sku.name} (${sku.sku})`, value: sku.id }))}
                />
            </Form.Item>

            <Form.Item
                name="quantity"
                label="수량"
                rules={[{ required: true, message: '수량을 입력해주세요.' }]}
            >
                <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="notes" label="메모">
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        생성
                    </Button>
                    <Button onClick={onCancel}>
                        취소
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

import { Space } from 'antd';

export default PurchaseOrderForm;
