import React from 'react';
import { Tag } from 'antd';

interface StatusBadgeProps {
    status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    let color = 'default';

    switch (status) {
        case 'APPROVED':
        case 'COMPLETED':
            color = 'success';
            break;
        case 'PENDING':
            color = 'processing';
            break;
        case 'REJECTED':
            color = 'error';
            break;
        case 'DRAFT':
            color = 'default';
            break;
        default:
            color = 'default';
            break;
    }

    return (
        <Tag color={color}>
            {status}
        </Tag>
    );
};

export default StatusBadge;
