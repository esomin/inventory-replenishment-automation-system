import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('predictions')
@UseGuards(JwtAuthGuard)
export class PredictionsController {
    constructor(private readonly predictionsService: PredictionsService) { }

    @Get('anomalies')
    getAnomalies(@Query('skuId') skuId: string) {
        return this.predictionsService.findAnomalies(skuId);
    }

    @Get(':skuId')
    getPredictions(@Param('skuId') skuId: string) {
        return this.predictionsService.findBySku(skuId);
    }
}
