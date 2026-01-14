import { Entity, Column, ManyToOne, JoinColumn, Index, Check } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';
import { Prediction } from './Prediction';
import { User } from './User';

@Entity('purchase_orders')
@Index('idx_purchase_orders_sku', ['product'])
@Index('idx_purchase_orders_status', ['status'])
@Check('quantity > 0')
export class PurchaseOrder extends BaseEntity {
    @Column({ name: 'po_number', unique: true })
    poNumber: string;

    @Column({ name: 'sku_id' })
    skuId: string;

    @ManyToOne(() => Product, (product) => product.purchaseOrders)
    @JoinColumn({ name: 'sku_id' })
    product: Product;

    @Column('int')
    quantity: number;

    @Column()
    status: string; // DRAFT, PENDING, APPROVED, REJECTED, COMPLETED

    @Column({ name: 'recommended_by_prediction_id', nullable: true })
    recommendedByPredictionId: string;

    @ManyToOne(() => Prediction, (prediction) => prediction.purchaseOrders, { nullable: true })
    @JoinColumn({ name: 'recommended_by_prediction_id' })
    recommendedByPrediction: Prediction;

    @Column({ name: 'requested_by_user_id' })
    requestedByUserId: string;

    @ManyToOne(() => User, (user) => user.requestedPurchaseOrders)
    @JoinColumn({ name: 'requested_by_user_id' })
    requestedBy: User;

    @Column({ name: 'approved_by_user_id', nullable: true })
    approvedByUserId: string;

    @ManyToOne(() => User, (user) => user.approvedPurchaseOrders, { nullable: true })
    @JoinColumn({ name: 'approved_by_user_id' })
    approvedBy: User;

    @Column({ name: 'expected_arrival_date', nullable: true })
    expectedArrivalDate: Date;

    @Column({ name: 'supplier_name', nullable: true })
    supplierName: string;

    @Column({ type: 'text', nullable: true })
    notes: string;
}
