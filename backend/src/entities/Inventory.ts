import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity('inventory')
export class Inventory extends BaseEntity {
    @Column({ name: 'product_id' })
    productId: string;

    @ManyToOne(() => Product, (product) => product.inventories)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ name: 'warehouse_id' })
    warehouseId: string;

    @Column('int')
    quantity: number;

    @Column({ nullable: true })
    location: string;
}
