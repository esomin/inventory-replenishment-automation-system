import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prediction } from '../entities/Prediction';
import { AnomalyDetection } from '../entities/AnomalyDetection';

@Injectable()
export class PredictionsService {
    constructor(
        @InjectRepository(Prediction)
        private predictionRepository: Repository<Prediction>,
        @InjectRepository(AnomalyDetection)
        private anomalyRepository: Repository<AnomalyDetection>,
    ) { }

    async findBySku(skuId: string) {
        return this.predictionRepository.find({
            where: { skuId },
            order: { targetDate: 'ASC' },
        });
    }

    async findAnomalies(skuId?: string) {
        if (skuId) {
            return this.anomalyRepository.find({
                where: { skuId },
                order: { eventDate: 'DESC' },
            });
        }
        return this.anomalyRepository.find({
            order: { eventDate: 'DESC' },
            take: 50, // Limit global anomalies
        });
    }
}
