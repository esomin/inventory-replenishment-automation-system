import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('payments')
export class Payment extends BaseEntity {
    @Column({ name: 'order_id' })
    orderId: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({ name: 'payment_method' })
    paymentMethod: string;

    @Column()
    status: string;

    @Column({ name: 'payment_date' })
    paymentDate: Date;
}
