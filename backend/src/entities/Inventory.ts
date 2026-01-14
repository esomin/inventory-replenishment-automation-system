import { Entity, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity('inventory')
@Unique('ux_inventory_sku_location_date', ['product', 'locationCode', 'snapshotDate'])
export class Inventory extends BaseEntity {
    @Column({ name: 'sku_id' })
    skuId: string;

    @ManyToOne(() => Product, (product) => product.inventories)
    @JoinColumn({ name: 'sku_id' })
    product: Product;

    @Column({ name: 'location_code' })
    locationCode: string;

    @Column('int', { name: 'quantity_on_hand' })
    quantityOnHand: number;

    @Column('int', { name: 'quantity_reserved' })
    quantityReserved: number;

    @Column('int', { name: 'safety_stock' })
    safetyStock: number;

    @Column({ name: 'snapshot_date' })
    snapshotDate: Date;
}
