import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrder } from '../entities/PurchaseOrder';
import { Product } from '../entities/Product';
import { CreatePurchaseOrderDto, UpdatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { User } from '../entities/User';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PurchaseOrdersService {
    constructor(
        @InjectRepository(PurchaseOrder)
        private poRepository: Repository<PurchaseOrder>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    private generatePoNumber(): string {
        return 'PO-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    }

    async create(createDto: CreatePurchaseOrderDto, user: User) {
        const product = await this.productRepository.findOne({ where: { sku: createDto.skuId } });
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const po = this.poRepository.create({
            skuId: createDto.skuId,
            quantity: createDto.quantity,
            supplierName: createDto.supplierName,
            expectedArrivalDate: createDto.expectedArrivalDate,
            notes: createDto.notes,
            product,
            status: 'DRAFT',
            requestedBy: user,
            poNumber: this.generatePoNumber(),
        });

        return this.poRepository.save(po);
    }

    async findAll() {
        return this.poRepository.find({
            relations: ['product', 'requestedBy', 'approvedBy'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string) {
        const po = await this.poRepository.findOne({
            where: { id: id },
            relations: ['product', 'requestedBy', 'approvedBy'],
        });
        if (!po) throw new NotFoundException('Purchase Order not found');
        return po;
    }

    async update(id: string, updateDto: UpdatePurchaseOrderDto, user: User) {
        const po = await this.findOne(id);

        if (updateDto.status) {
            po.status = updateDto.status;
            if (updateDto.status === 'APPROVED' || updateDto.status === 'REJECTED') {
                po.approvedBy = user;
                // po.approvedAt = new Date(); // Field doesn't exist in entity yet
            }
        }

        if (updateDto.quantity) po.quantity = updateDto.quantity;
        if (updateDto.notes) po.notes = updateDto.notes;

        return this.poRepository.save(po);
    }
}
