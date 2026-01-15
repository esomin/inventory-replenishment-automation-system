import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntitySoftDelete } from './BaseEntity';
import { User } from './User';

@Entity('notifications')
@Index('idx_notifications_channel', ['channel'])
export class Notification extends BaseEntitySoftDelete {
    @Column()
    name: string;

    @Column()
    channel: string; // SLACK, EMAIL

    @Column({ name: 'target_address' })
    targetAddress: string;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @Column({ type: 'jsonb', nullable: true })
    config: Record<string, any>;

    @Column({ name: 'created_by' })
    createdById: string;

    @ManyToOne(() => User, (user) => user.notifications)
    @JoinColumn({ name: 'created_by' })
    createdBy: User;
}
