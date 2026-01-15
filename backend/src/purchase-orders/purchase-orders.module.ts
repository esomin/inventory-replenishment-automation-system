import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrdersController } from './purchase-orders.controller';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrder } from '../entities/PurchaseOrder';
import { Product } from '../entities/Product';

@Module({
    imports: [TypeOrmModule.forFeature([PurchaseOrder, Product])],
    controllers: [PurchaseOrdersController],
    providers: [PurchaseOrdersService],
    exports: [PurchaseOrdersService],
})
export class PurchaseOrdersModule { }
