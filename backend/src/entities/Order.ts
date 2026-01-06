import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity('orders')
export class Order extends BaseEntity {
    @Column({ name: 'order_no' })
    orderNo: string;

    @Column({ name: 'product_id' })
    productId: string;

    @ManyToOne(() => Product, (product) => product.orders)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column('int')
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({ name: 'order_date' })
    orderDate: Date;

    @Column()
    status: string;

    @Column({ name: 'customer_id', nullable: true })
    customerId: string;
}
