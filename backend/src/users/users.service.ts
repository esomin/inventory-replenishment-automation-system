import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { Role } from '../entities/Role';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) { }

    async onModuleInit() {
        // Init default roles
        const roles = ['ADMIN', 'MANAGER', 'OPERATOR'];
        for (const roleName of roles) {
            const exists = await this.rolesRepository.findOne({ where: { name: roleName } });
            if (!exists) {
                await this.rolesRepository.save({ name: roleName, description: `${roleName} Role` });
                console.log(`Role ${roleName} created.`);
            }
        }

        // Init default user
        const adminEmail = 'admin@example.com';
        const exists = await this.usersRepository.findOne({ where: { email: adminEmail } });
        if (!exists) {
            const adminRole = await this.rolesRepository.findOne({ where: { name: 'ADMIN' } });
            if (adminRole) {
                const hashedPassword = await bcrypt.hash('123', 10);
                await this.usersRepository.save({
                    email: adminEmail,
                    passwordHash: hashedPassword,
                    name: 'Admin User',
                    role: adminRole,
                    isActive: true,
                });
                console.log(`Default user created: ${adminEmail} / dddd`);
            }
        }
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { email },
            relations: ['role'],
        });
    }

    async findOneById(id: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { id },
            relations: ['role'],
        });
    }

    async create(userData: Partial<User>): Promise<User> {
        const user = this.usersRepository.create(userData);
        return this.usersRepository.save(user);
    }

    async findRoleByName(name: string): Promise<Role | null> {
        return this.rolesRepository.findOne({ where: { name } });
    }
}
