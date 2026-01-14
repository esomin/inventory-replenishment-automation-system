import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity('sku_features')
@Index('idx_sku_features_sku_date_horizon', ['product', 'featureDate', 'horizonDays'])
export class SkuFeature extends BaseEntity {
    @Column({ name: 'sku_id' })
    skuId: string;

    @ManyToOne(() => Product, (product) => product.features)
    @JoinColumn({ name: 'sku_id' })
    product: Product;

    @Column({ name: 'feature_date' })
    featureDate: Date;

    @Column('int', { name: 'horizon_days' })
    horizonDays: number;

    // Time Features
    @Column('int', { name: 'day_of_week' })
    dayOfWeek: number;

    @Column({ name: 'is_weekend' })
    isWeekend: boolean;

    @Column()
    season: string;

    // Price Features
    @Column('decimal', { name: 'base_price', precision: 10, scale: 2 })
    basePrice: number;

    @Column('decimal', { name: 'current_price', precision: 10, scale: 2 })
    currentPrice: number;

    @Column('decimal', { name: 'discount_rate', precision: 5, scale: 2 })
    discountRate: number;

    // Ops Features
    @Column('int', { name: 'lead_time_days' })
    leadTimeDays: number;

    @Column('decimal', { name: 'inventory_turnover', precision: 10, scale: 2 })
    inventoryTurnover: number;

    @Column('decimal', { name: 'return_rate', precision: 5, scale: 2 })
    returnRate: number;

    @Column('decimal', { name: 'promo_intensity', precision: 10, scale: 2 })
    promoIntensity: number;

    @Column('decimal', { name: 'ad_intensity', precision: 10, scale: 2 })
    adIntensity: number;

    @Column({ name: 'raw_features', type: 'jsonb', nullable: true })
    rawFeatures: Record<string, any>;
}
