import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { wallet } from '@prisma/client';
import { WalletService } from './wallet.service';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletController {
    constructor(private walletService: WalletService) { }


}
