import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredictionsController } from './predictions.controller';
import { PredictionsService } from './predictions.service';
import { Prediction } from '../entities/Prediction';
import { AnomalyDetection } from '../entities/AnomalyDetection';

@Module({
    imports: [TypeOrmModule.forFeature([Prediction, AnomalyDetection])],
    controllers: [PredictionsController],
    providers: [PredictionsService],
    exports: [PredictionsService],
})
export class PredictionsModule { }
