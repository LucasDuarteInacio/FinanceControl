import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OpeationRepository } from './opeation.repository';
import { currencyEnumArray } from './enum/currency.enum';
import { typeEnumArray } from './enum/type.enum';
import { WalletService } from '../wallet/wallet.service';
import { AssetService } from '../asset/asset.service';
import { operation } from "@prisma/client";

@Injectable()
export class OperationService {
  constructor(
    private operationRepository: OpeationRepository,
    private walletService: WalletService,
    private assetService: AssetService,
  ) {}

  async newOperation(operation): Promise<operation> {
    await this.validateOperation(operation);
    operation.date = new Date();
    await this.operationRepository.save(operation);
    return operation;
  }

  async validateOperation(operation): Promise<void> {
    if (!typeEnumArray.includes(operation.type)) {
      throw new HttpException(
        `Nao existe nenhum tipo de operação chamado: ${operation.type}`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!currencyEnumArray.includes(operation.currency)) {
      throw new HttpException(
        `Nao foi econtrada nenhuma moeda chamada: ${operation.currency}`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.walletService.findById(operation.walletid);
    await this.assetService.findById(operation.assetid);
  }
}
