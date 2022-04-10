import { Module } from '@nestjs/common';
import { OperationController } from './operation.controller';
import { OpeationRepository } from './opeation.repository';
import { OperationService } from './operation.service';
import { WalletModule } from '../wallet/wallet.module';
import { AssetModule } from '../asset/asset.module';

@Module({
  controllers: [OperationController],
  providers: [OperationService, OpeationRepository],
  imports: [WalletModule, AssetModule],
})
export class OperationModule {}
