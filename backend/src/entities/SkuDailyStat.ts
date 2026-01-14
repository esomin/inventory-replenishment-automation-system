import { Entity, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity('sku_daily_stats')
@Unique('ux_sku_daily_stats_sku_date', ['product', 'statDate'])
@Index('idx_sku_daily_stats_date', ['statDate'])
export class SkuDailyStat extends BaseEntity {
    @Column({ name: 'sku_id' })
    skuId: string;

    @ManyToOne(() => Product, (product) => product.dailyStats)
    @JoinColumn({ name: 'sku_id' })
    product: Product;

    @Column({ name: 'stat_date' })
    statDate: Date;

    @Column('int', { name: 'units_sold', default: 0 })
    unitsSold: number;

    @Column('decimal', { name: 'gross_revenue', precision: 12, scale: 2, default: 0 })
    grossRevenue: number;

    @Column('decimal', { name: 'net_revenue', precision: 12, scale: 2, default: 0 })
    netRevenue: number;

    @Column('int', { name: 'units_returned', default: 0 })
    unitsReturned: number;

    @Column('int', { name: 'ending_inventory', default: 0 })
    endingInventory: number;

    @Column('decimal', { name: 'ad_spend', precision: 12, scale: 2, default: 0 })
    adSpend: number;

    @Column({ name: 'promo_flag', default: false })
    promoFlag: boolean;
}
