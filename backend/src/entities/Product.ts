import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Inventory } from './Inventory';
import { Order } from './Order';
import { Prediction } from './Prediction';
import { SkuDailyStat } from './SkuDailyStat';
import { Promotion } from './Promotion';
import { AdCampaign } from './AdCampaign';
import { SkuFeature } from './SkuFeature';
import { AnomalyDetection } from './AnomalyDetection';
import { PurchaseOrder } from './PurchaseOrder';

@Entity('products')
export class Product extends BaseEntity {
    @Column({ unique: true })
    sku: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    category: string;

    @Column({ nullable: true })
    brand: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    cost: number;

    @Column({ default: 'ACTIVE' })
    status: string;

    // Relations
    @OneToMany(() => Order, (order) => order.product)
    orders: Order[];

    @OneToMany(() => Inventory, (inventory) => inventory.product)
    inventories: Inventory[];

    @OneToMany(() => Promotion, (promotion) => promotion.product)
    promotions: Promotion[];

    @OneToMany(() => AdCampaign, (adCampaign) => adCampaign.product)
    adCampaigns: AdCampaign[];

    @OneToMany(() => SkuDailyStat, (stat) => stat.product)
    dailyStats: SkuDailyStat[];

    @OneToMany(() => SkuFeature, (feature) => feature.product)
    features: SkuFeature[];

    @OneToMany(() => Prediction, (prediction) => prediction.product)
    predictions: Prediction[];

    @OneToMany(() => AnomalyDetection, (anomaly) => anomaly.product)
    anomalies: AnomalyDetection[];

    @OneToMany(() => PurchaseOrder, (po) => po.product)
    purchaseOrders: PurchaseOrder[];
}
