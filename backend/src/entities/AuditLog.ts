import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity('audit_logs')
export class AuditLog extends BaseEntity {
    @Column({ name: 'user_id', nullable: true })
    userId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    action: string; // LOGIN, CREATE_PO, APPROVE_PO, etc.

    @Column({ name: 'entity_type', nullable: true })
    entityType: string;

    @Column({ name: 'entity_id', nullable: true })
    entityId: string;

    @Column({ type: 'jsonb', nullable: true })
    details: any; // Changed fields, old/new values, etc.
}
