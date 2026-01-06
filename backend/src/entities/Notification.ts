import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity('notifications')
export class Notification extends BaseEntity {
    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    type: string; // SYSTEM, ALERT, WORKFLOW

    @Column()
    title: string;

    @Column('text')
    message: string;

    @Column({ default: false, name: 'is_read' })
    isRead: boolean;
}
