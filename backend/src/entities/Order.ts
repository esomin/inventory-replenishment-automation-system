import { Entity, Column, ManyToOne, JoinColumn, Index, OneToMany, Check } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';
import { Payment } from './Payment';

@Entity('orders')
@Index('idx_orders_order_date', ['orderDate'])
@Index('idx_orders_sku_date', ['product', 'orderDate'])
@Index('idx_orders_channel', ['channel'])
@Check('quantity > 0')
export class Order extends BaseEntity {
    @Column({ name: 'order_number', unique: true })
    orderNumber: string;

    @Column({ name: 'order_date' })
    orderDate: Date;

    @Column({ name: 'sku_id' })
    skuId: string;

    @ManyToOne(() => Product, (product) => product.orders)
    @JoinColumn({ name: 'sku_id' })
    product: Product;

    @Column('int')
    quantity: number;

    @Column('decimal', { name: 'unit_price', precision: 10, scale: 2 })
    unitPrice: number;

    @Column()
    channel: string;

    @Column()
    status: string;

    // Relations
    @OneToMany(() => Payment, (payment) => payment.order)
    payments: Payment[];
}
