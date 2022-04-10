import { Module } from '@nestjs/common';
import { WalletModule } from '../wallet/wallet.module';
import { WalletService } from '../wallet/wallet.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  imports: [WalletModule],
})
export class UserModule {}
