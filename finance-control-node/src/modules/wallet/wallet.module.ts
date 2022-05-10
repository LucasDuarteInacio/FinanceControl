import { Module } from '@nestjs/common';
import { WalletRepository } from './wallet.repository';
import { WalletService } from './wallet.service';

@Module({
  controllers: [],
  providers: [WalletRepository, WalletService],
  exports: [WalletRepository, WalletService],
})
export class WalletModule {}
