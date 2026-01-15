import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../entities/AuditLog';
import { User } from '../entities/User';

@Injectable()
export class AuditLogsService {
    constructor(
        @InjectRepository(AuditLog)
        private auditLogRepository: Repository<AuditLog>,
    ) { }

    async logAction(user: User, action: string, entityType: string, entityId: string, metadata?: Record<string, any>) {
        const log = this.auditLogRepository.create({
            user,
            action,
            entityType,
            entityId,
            metadata,
        });
        return this.auditLogRepository.save(log);
    }

    async findAll() {
        return this.auditLogRepository.find({
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }

    async findByEntity(entityType: string, entityId: string) {
        return this.auditLogRepository.find({
            where: { entityType, entityId },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }
}
