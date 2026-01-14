import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity('roles')
export class Role extends BaseEntity {
    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
