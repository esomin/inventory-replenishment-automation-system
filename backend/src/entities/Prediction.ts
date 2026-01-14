import { Entity, Column, ManyToOne, JoinColumn, Index, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';
import { PurchaseOrder } from './PurchaseOrder';

@Entity('predictions')
@Index('idx_predictions_sku_target', ['product', 'targetDate', 'horizonDays'])
@Index('idx_predictions_created_at', ['createdAt'])
export class Prediction extends BaseEntity {
    @Column({ name: 'sku_id' })
    skuId: string;

    @ManyToOne(() => Product, (product) => product.predictions)
    @JoinColumn({ name: 'sku_id' })
    product: Product;

    @Column({ name: 'prediction_date' })
    predictionDate: Date;

    @Column({ name: 'target_date' })
    targetDate: Date;

    @Column('int', { name: 'horizon_days' })
    horizonDays: number;

    @Column('decimal', { name: 'predicted_demand', precision: 10, scale: 2 })
    predictedDemand: number;

    @Column({ name: 'predicted_stockout_date', nullable: true })
    predictedStockoutDate: Date;

    @Column('int', { name: 'recommended_order_qty', default: 0 })
    recommendedOrderQty: number;

    @Column({ name: 'model_name' })
    modelName: string;

    @Column({ name: 'model_version' })
    modelVersion: string;

    @Column({ name: 'feature_importance', type: 'jsonb', nullable: true })
    featureImportance: Record<string, any>;

    @Column({ type: 'jsonb', nullable: true })
    explanation: Record<string, any>;

    // Relations
    @OneToMany(() => PurchaseOrder, (po) => po.recommendedByPrediction)
    purchaseOrders: PurchaseOrder[];
}
