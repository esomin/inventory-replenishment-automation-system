import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Order } from './Order';

@Entity('payments')
@Index('idx_payments_order_id', ['order'])
@Index('idx_payments_status', ['status'])
export class Payment extends BaseEntity {
    @Column({ name: 'order_id' })
    orderId: string;

    @ManyToOne(() => Order, (order) => order.payments)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column()
    method: string;

    @Column()
    status: string;

    @Column({ name: 'paid_at', nullable: true })
    paidAt: Date;

    @Column('decimal', { name: 'refund_amount', precision: 10, scale: 2, nullable: true })
    refundAmount: number;

    @Column({ name: 'refund_at', nullable: true })
    refundAt: Date;
}
