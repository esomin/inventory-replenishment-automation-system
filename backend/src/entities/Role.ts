import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('roles')
export class Role extends BaseEntity {
    @Column({ unique: true })
    name: string; // OPERATOR, MANAGER, ADMIN

    @Column({ nullable: true })
    description: string;
}
