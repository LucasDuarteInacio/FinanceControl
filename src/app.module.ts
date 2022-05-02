import { Global, Module } from '@nestjs/common';
import { AssetModule } from './modules/asset/asset.module';
import { AccountModule } from './modules/account/account.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { PrismaService } from './shared/prisma.service';
import { OperationModule } from './modules/operation/operation.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './configs/mailer.config';

@Global()
@Module({
  imports: [AccountModule, WalletModule, AssetModule, OperationModule, DashboardModule, AuthModule, MailerModule.forRoot(mailerConfig)],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
