import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('staging_orders')
@Index('idx_staging_orders_sku_date', ['skuId', 'orderDate'])
export class StagingOrder {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'order_number' })
    orderNumber: string;

    @Column({ name: 'order_date' })
    orderDate: Date;

    @Column({ name: 'sku_id' })
    skuId: string;

    @Column('int')
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    revenue: number;

    @Column({ name: 'source_system' })
    sourceSystem: string;

    @Column({ name: 'ingestion_time' })
    ingestionTime: Date;
}
