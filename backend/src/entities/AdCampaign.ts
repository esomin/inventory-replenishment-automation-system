import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('ad_campaigns')
export class AdCampaign extends BaseEntity {
    @Column()
    name: string;

    @Column()
    platform: string; // FACEBOOK, GOOGLE, etc.

    @Column('decimal', { precision: 10, scale: 2 })
    budget: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    spend: number;

    @Column({ name: 'start_date' })
    startDate: Date;

    @Column({ name: 'end_date', nullable: true })
    endDate: Date;

    @Column({ type: 'jsonb', nullable: true })
    target_skus: string[];
}
