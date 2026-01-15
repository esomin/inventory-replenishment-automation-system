import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkuController } from './sku.controller';
import { SkuService } from './sku.service';
import { Product } from '../entities/Product';