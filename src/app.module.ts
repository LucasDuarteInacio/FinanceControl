import { Global, Module } from '@nestjs/common';
import { AssetModule } from './modules/asset/asset.module';
import { UserModule } from './modules/user/user.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { PrismaService } from './shared/prisma.service';

@Global()
@Module({
  imports: [UserModule,WalletModule,AssetModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
