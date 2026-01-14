import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity('anomaly_detections')
@Index('idx_anomaly_sku_date', ['product', 'eventDate'])
@Index('idx_anomaly_status', ['status'])
export class AnomalyDetection extends BaseEntity {
    @Column({ name: 'sku_id' })
    skuId: string;

    @ManyToOne(() => Product, (product) => product.anomalies)
    @JoinColumn({ name: 'sku_id' })
    product: Product;

    @Column({ name: 'event_date' })
    eventDate: Date;

    @Column({ name: 'anomaly_type' })
    anomalyType: string;

    @Column()
    severity: string;

    @Column('decimal', { name: 'observed_value', precision: 10, scale: 2 })
    observedValue: number;

    @Column('decimal', { name: 'expected_value', precision: 10, scale: 2 })
    expectedValue: number;

    @Column('decimal', { name: 'delta_value', precision: 10, scale: 2 })
    deltaValue: number;

    @Column({ type: 'jsonb', nullable: true })
    details: Record<string, any>;

    @Column()
    status: string;

    @Column({ name: 'resolved_at', nullable: true })
    resolvedAt: Date;
}
