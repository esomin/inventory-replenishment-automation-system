import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity('sku_features')
export class SkuFeature extends BaseEntity {
    @Column({ name: 'date' })
    date: Date;

    @Column({ name: 'product_id' })
    productId: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column('int', { nullable: true })
    day_of_week: number; // 0-6

    @Column({ nullable: true })
    season: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    price_volatility: number;

    @Column('decimal', { precision: 5, scale: 2, nullable: true })
    discount_rate: number;

    @Column('int', { nullable: true })
    lead_time_days: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    inventory_turnover: number;

    @Column('decimal', { precision: 5, scale: 2, nullable: true })
    return_rate: number;
}
