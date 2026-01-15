import React from 'react';
import { Form, Input, Select, Checkbox, Button, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

interface SKUFiltersProps {
    onSearch: (values: any) => void;
}

const SKUFilters: React.FC<SKUFiltersProps> = ({ onSearch }) => {
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        onSearch(values);
    };

    return (
        <Form
            form={form}
            name="sku_filters"
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{ showStockoutRisks: false }}
        >
            <Row gutter={16} align="bottom">
                <Col span={6}>
                    <Form.Item name="search" label="검색 (SKU/제품명)">
                        <Input placeholder="SKU 코드 또는 제품명을 입력하세요" allowClear />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name="category" label="카테고리">
                        <Select placeholder="전체" allowClear>
                            <Option value="Electronics">Electronics</Option>
                            <Option value="Clothing">Clothing</Option>
                            <Option value="Home & Garden">Home & Garden</Option>
                            <Option value="Beauty">Beauty</Option>
                            <Option value="Toys">Toys</Option>
                            {/* Add more categories as needed or fetch dynamically */}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="showStockoutRisks" valuePropName="checked">
                        <Checkbox>🔥 품절 위험 품목만 보기</Checkbox>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                            검색
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default SKUFilters;
