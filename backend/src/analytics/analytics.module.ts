import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkuDailyStat } from '../entities/SkuDailyStat';
import { SkuFeature } from '../entities/SkuFeature';

@Module({
    imports: [TypeOrmModule.forFeature([SkuDailyStat, SkuFeature])],
    exports: [TypeOrmModule],
})
export class AnalyticsModule { }
