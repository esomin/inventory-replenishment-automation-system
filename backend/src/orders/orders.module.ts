import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/Order';
import { Payment } from '../entities/Payment';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Payment])],
    exports: [TypeOrmModule],
})
export class OrdersModule { }
