import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SkuModule } from './sku/sku.module';
import { PredictionsModule } from './predictions/predictions.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    SkuModule,
    PredictionsModule,
    PurchaseOrdersModule,
  ],
})
export class AppModule { }
