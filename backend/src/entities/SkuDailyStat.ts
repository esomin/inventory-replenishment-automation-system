import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity('sku_daily_stats')
export class SkuDailyStat extends BaseEntity {
    @Column({ name: 'date' })
    date: Date;

    @Column({ name: 'product_id' })
    productId: string;

    @ManyToOne(() => Product, (product) => product.dailyStats)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column('int', { default: 0 })
    total_sales_qty: number;

    @Column('decimal', { precision: 12, scale: 2, default: 0 })
    total_revenue: number;

    @Column('int', { default: 0 })
    stock_level: number;
}
