import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity('predictions')
export class Prediction extends BaseEntity {
    @Column({ name: 'prediction_date' })
    predictionDate: Date; // The date when the prediction was made

    @Column({ name: 'target_date' })
    targetDate: Date; // The future date being predicted

    @Column({ name: 'product_id' })
    productId: string;

    @ManyToOne(() => Product, (product) => product.predictions)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column('decimal', { precision: 10, scale: 2 })
    predicted_demand: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    confidence_score: number;

    @Column({ type: 'jsonb', nullable: true })
    explanation: any; // Feature importance, etc.
}
