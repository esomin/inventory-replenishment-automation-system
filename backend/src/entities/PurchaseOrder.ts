import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';
import { User } from './User';

@Entity('purchase_orders')
export class PurchaseOrder extends BaseEntity {
    @Column({ name: 'po_number', unique: true })
    poNumber: string;

    @Column({ name: 'product_id' })
    productId: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column('int')
    quantity: number;

    @Column()
    status: string; // DRAFT, PENDING, APPROVED, REJECTED, COMPLETED

    @Column({ name: 'requested_by' })
    requestedById: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'requested_by' })
    requestedBy: User;

    @Column({ name: 'approved_by', nullable: true })
    approvedById: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'approved_by' })
    approvedBy: User;

    @Column({ type: 'date', nullable: true, name: 'expected_delivery_date' })
    expectedDeliveryDate: Date;
}
