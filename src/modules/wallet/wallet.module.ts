import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { WalletController } from './wallet.controller';
import { WalletRepository } from './wallet.repository';
import { WalletService } from './wallet.service';


@Module({
    controllers: [WalletController],
    providers: [WalletRepository,WalletService],
    exports:[WalletRepository,WalletService]
})
export class WalletModule {}
