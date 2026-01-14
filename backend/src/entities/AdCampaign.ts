import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity('ad_campaigns')
@Index('idx_ad_campaigns_period', ['startAt', 'endAt'])
@Index('idx_ad_campaigns_sku', ['product'])
export class AdCampaign extends BaseEntity {
    @Column()
    name: string;

    @Column()
    channel: string;

    @Column({ name: 'external_campaign_id', nullable: true })
    externalCampaignId: string;

    @Column({ name: 'sku_id' })
    skuId: string;

    @ManyToOne(() => Product, (product) => product.adCampaigns)
    @JoinColumn({ name: 'sku_id' })
    product: Product;

    @Column('decimal', { name: 'daily_budget', precision: 10, scale: 2 })
    dailyBudget: number;

    @Column({ name: 'start_at' })
    startAt: Date;

    @Column({ name: 'end_at' })
    endAt: Date;
}
