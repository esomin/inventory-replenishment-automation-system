import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from '../entities/Promotion';
import { AdCampaign } from '../entities/AdCampaign';

@Module({
    imports: [TypeOrmModule.forFeature([Promotion, AdCampaign])],
    exports: [TypeOrmModule],
})
export class MarketingModule { }
