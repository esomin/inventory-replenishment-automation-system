import { Entity, Column, ManyToOne, JoinColumn, Index, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Role } from './Role';
import { PurchaseOrder } from './PurchaseOrder';
import { Notification } from './Notification';
import { AuditLog } from './AuditLog';

@Entity('users')
@Index('idx_users_role_id', ['role'])
export class User extends BaseEntity {
    @Column({ unique: true })
    email: string;

    @Column({ name: 'password_hash' })
    passwordHash: string;

    @Column()
    name: string;

    @Column({ name: 'role_id' })
    roleId: string;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @Column({ name: 'last_login_at', nullable: true })
    lastLoginAt: Date;

    // Relations
    @OneToMany(() => PurchaseOrder, (po) => po.requestedBy)
    requestedPurchaseOrders: PurchaseOrder[];

    @OneToMany(() => PurchaseOrder, (po) => po.approvedBy)
    approvedPurchaseOrders: PurchaseOrder[];

    @OneToMany(() => Notification, (notification) => notification.createdBy)
    notifications: Notification[];

    @OneToMany(() => AuditLog, (log) => log.user)
    auditLogs: AuditLog[];
}
