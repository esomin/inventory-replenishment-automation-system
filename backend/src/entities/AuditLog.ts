import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity('audit_logs')
@Index('idx_audit_logs_user', ['user'])
@Index('idx_audit_logs_entity', ['entityType', 'entityId'])
export class AuditLog extends BaseEntity {
    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => User, (user) => user.auditLogs)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    action: string;

    @Column({ name: 'entity_type' })
    entityType: string;

    @Column({ name: 'entity_id' })
    entityId: string;

    @Column({ type: 'jsonb', nullable: true })
    metadata: Record<string, any>;
}
