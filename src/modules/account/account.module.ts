import { Module } from '@nestjs/common';
import { WalletModule } from '../wallet/wallet.module';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { AccountService } from './account.service';

@Module({
  providers: [AccountService, AccountRepository],
  controllers: [AccountController],
  imports: [WalletModule],
  exports: [AccountService, AccountRepository],
})
export class AccountModule {}
