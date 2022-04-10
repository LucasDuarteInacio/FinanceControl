import { Module } from '@nestjs/common';
import { WalletModule } from '../wallet/wallet.module';
import { WalletService } from '../wallet/wallet.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { AccountService } from './account.service';

@Module({
  providers: [AccountService, AccountRepository],
  controllers: [AccountController],
  imports: [WalletModule],
})
export class AccountModule {}
