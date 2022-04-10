import { Global, Module } from '@nestjs/common';
import { AssetModule } from './modules/asset/asset.module';
import { AccountModule } from './modules/account/account.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { PrismaService } from './shared/prisma.service';
import { OperationModule } from './modules/operation/operation.module';

@Global()
@Module({
  imports: [AccountModule, WalletModule, AssetModule, OperationModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
