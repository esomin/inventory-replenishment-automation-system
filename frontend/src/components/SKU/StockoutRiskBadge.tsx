import React from 'react';
import { Tag, Tooltip } from 'antd';
import { WarningOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import moment from 'moment';

interface StockoutRiskBadgeProps {
    prediction: {
        predictedStockoutDate: string | null;
        stockoutRiskScore: number;
    } | undefined;
}

const StockoutRiskBadge: React.FC<StockoutRiskBadgeProps> = ({ prediction }) => {
    if (!prediction || !prediction.predictedStockoutDate) {
        return <Tag icon={<SafetyCertificateOutlined />} color="success">안전</Tag>;
    }

    const stockoutDate = moment(prediction.predictedStockoutDate);
    const now = moment();
    const daysUntilStockout = stockoutDate.diff(now, 'days');

    let color = 'gold';
    let text = '주의';

    if (daysUntilStockout <= 7) {
        color = 'error';
        text = '위험 (7일 이내)';
    } else if (daysUntilStockout <= 14) {
        color = 'warning';
        text = '경고 (14일 이내)';
    }

    return (
        <Tooltip title={`예상 품절일: ${stockoutDate.format('YYYY-MM-DD')}`}>
            <Tag icon={<WarningOutlined />} color={color}>
                {text}
            </Tag>
        </Tooltip>
    );
};

export default StockoutRiskBadge;
