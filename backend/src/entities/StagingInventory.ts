import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('staging_inventory')
@Index('idx_staging_inventory_sku_date', ['skuId', 'snapshotDate'])
export class StagingInventory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'sku_id' })
    skuId: string;

    @Column({ name: 'snapshot_date' })
    snapshotDate: Date;

    @Column({ name: 'location_code' })
    locationCode: string;

    @Column('int', { name: 'quantity_on_hand' })
    quantityOnHand: number;

    @Column('int', { name: 'quantity_reserved' })
    quantityReserved: number;

    @Column({ name: 'ingestion_time' })
    ingestionTime: Date;
}
