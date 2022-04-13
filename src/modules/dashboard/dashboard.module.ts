import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { OperationModule } from '../operation/operation.module';
import { AssetModule } from '../asset/asset.module';

@Module({
  providers: [DashboardService],
  controllers: [DashboardController],
  imports: [OperationModule, AssetModule],
})
export class DashboardModule {}
