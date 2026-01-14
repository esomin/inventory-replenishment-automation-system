import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity('promotions')
@Index('idx_promotions_period', ['startAt', 'endAt'])
@Index('idx_promotions_target_sku', ['product'])
export class Promotion extends BaseEntity {
    @Column()
    name: string;

    @Column({ name: 'promotion_type' })
    promotionType: string;

    @Column({ name: 'discount_type' })
    discountType: string;

    @Column('decimal', { name: 'discount_value', precision: 10, scale: 2 })
    discountValue: number;

    @Column({ name: 'start_at' })
    startAt: Date;

    @Column({ name: 'end_at' })
    endAt: Date;

    @Column({ name: 'target_sku_id', nullable: true })
    targetSkuId: string;

    @ManyToOne(() => Product, (product) => product.promotions, { nullable: true })
    @JoinColumn({ name: 'target_sku_id' })
    product: Product;

    @Column({ name: 'target_category', nullable: true })
    targetCategory: string;
}
