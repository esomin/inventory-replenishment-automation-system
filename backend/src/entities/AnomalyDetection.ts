import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity('anomaly_detections')
export class AnomalyDetection extends BaseEntity {
    @Column({ name: 'detection_date' })
    detectionDate: Date;

    @Column({ name: 'product_id' })
    productId: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    anomaly_type: string; // SALES_SPIKE, SALES_DROP, HIGH_RETURN, etc.

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    severity_score: number;

    @Column('text', { nullable: true })
    description: string;

    @Column({ default: false })
    is_resolved: boolean;
}
