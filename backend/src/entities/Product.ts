import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Inventory } from './Inventory';
import { Order } from './Order';
import { Prediction } from './Prediction';
import { SkuDailyStat } from './SkuDailyStat';

@Entity('products')
export class Product extends BaseEntity {
    @Column({ unique: true })
    sku: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    category: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    cost: number;

    @Column({ nullable: true })
    brand: string;

    @Column({ type: 'jsonb', nullable: true })
    attributes: Record<string, any>;

    @OneToMany(() => Inventory, (inventory) => inventory.product)
    inventories: Inventory[];

    @OneToMany(() => Order, (order) => order.product)
    orders: Order[];

    @OneToMany(() => Prediction, (prediction) => prediction.product)
    predictions: Prediction[];

    @OneToMany(() => SkuDailyStat, (stat) => stat.product)
    dailyStats: SkuDailyStat[];
}
