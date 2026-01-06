import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('promotions')
export class Promotion extends BaseEntity {
    @Column()
    name: string;

    @Column()
    type: string; // DISCOUNT, BUNDLE, etc.

    @Column('decimal', { precision: 5, scale: 2, nullable: true })
    discount_rate: number;

    @Column({ name: 'start_date' })
    startDate: Date;

    @Column({ name: 'end_date' })
    endDate: Date;

    @Column({ type: 'jsonb', nullable: true })
    target_skus: string[];
}
