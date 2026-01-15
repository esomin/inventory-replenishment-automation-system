import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, SelectQueryBuilder } from 'typeorm';
import { Product } from '../entities/Product';
import { SkuFilterDto } from './dto/sku-filter.dto';

@Injectable()
export class SkuService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    async findAll(filterDto: SkuFilterDto) {
        const { page = 1, limit = 10, search, category, showStockoutRisks, sortBy, sortOrder = 'ASC' } = filterDto;

        const query = this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.inventories', 'inventory')
            .leftJoinAndSelect('product.predictions', 'prediction', 'prediction.targetDate > :now', { now: new Date() }); // Current/Future predictions

        if (search) {
            query.andWhere('(product.sku LIKE :search OR product.name LIKE :search)', { search: `%${search}%` });
        }

        if (category) {
            query.andWhere('product.category = :category', { category });
        }

        // Note: 'stockout risk' logic might be complex. 
        // For simplicity, we assume if there's a prediction with predictedStockoutDate NOT NULL relative to near future.
        // Or we can rely on a pre-calculated field in SkuFeatures or caching. 
        // Here we try to filter by joining with prediction k is high (if possible) or do in-memory (costly for large db).
        // Let's assume we sort by joining prediction.

        if (showStockoutRisks) {
            query.andWhere('prediction.predictedStockoutDate IS NOT NULL');
            // Check if it's within let's say 30 days. 
            // query.andWhere('prediction.predictedStockoutDate <= :riskDate', { riskDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
        }

        // Sorting
        if (sortBy) {
            if (sortBy === 'name') {
                query.orderBy('product.name', sortOrder);
            } else if (sortBy === 'stockoutDate') {
                // Sort by the earliest stockout date
                // This requires aggregation or careful joining. 
                // Simplified:
                query.orderBy('prediction.predictedStockoutDate', sortOrder);
            }
            // 'risk' and 'sales' might need aggregation.
            // For now, simple sorts.
        } else {
            query.orderBy('product.createdAt', 'DESC');
        }

        const [items, total] = await query
            .take(limit)
            .skip((page - 1) * limit)
            .getManyAndCount();

        // Post-processing to flatten or summarize if needed
        const result = items.map(item => {
            // Find most recent/relevant prediction for summaries
            // Assuming 0-th prediction is the join result (TypeORM populates array)
            // We might want to sort predictions in memory if query didn't strictly guarantee order
            const latestPrediction = item.predictions && item.predictions.length > 0 ? item.predictions[0] : null;

            // Total stock
            const totalStock = item.inventories?.reduce((sum, inv) => sum + inv.quantityOnHand, 0) || 0;

            return {
                ...item,
                totalStock,
                latestPrediction
            };
        });

        return {
            items: result,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        };
    }

    async findOne(id: number | string) {
        // If id is numeric ID
        const query = this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.inventories', 'inventory')
            .leftJoinAndSelect('product.predictions', 'prediction')
            .leftJoinAndSelect('product.features', 'features');

        if (typeof id === 'number' || !isNaN(Number(id))) {
            query.where('product.id = :id', { id });
        } else {
            query.where('product.sku = :id', { id });
        }

        return await query.getOne();
    }
}
