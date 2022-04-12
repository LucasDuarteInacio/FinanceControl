import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OpeationRepository } from './opeation.repository';
import { currencyEnumArray } from './enum/currency.enum';
import { typeEnumArray } from './enum/type.enum';
import { WalletService } from '../wallet/wallet.service';
import { AssetService } from '../asset/asset.service';
import { operation } from '@prisma/client';

@Injectable()
export class OperationService {
  constructor(private operationRepository: OpeationRepository, private walletService: WalletService, private assetService: AssetService) {}

  async save(operation): Promise<operation> {
    await this.walletService.findById(operation.walletid);
    await this.validateOperation(operation);
    return this.operationRepository.save(operation);
  }

  async update(operation, operationId): Promise<operation> {
    await this.validateOperation(operation);
    const operationExists = await this.findById(operationId);
    operation.walletid = operationExists.walletid;
    operation.operationid = operationId;
    return this.operationRepository.update(operation);
  }

  async findAllByWalletId(walletId): Promise<operation[]> {
    await this.walletService.findById(walletId);
    return this.operationRepository.findAllByWallet(walletId);
  }

  async delete(operationId): Promise<operation> {
    await this.findById(operationId);
    return this.operationRepository.delete(operationId);
  }

  async validateOperation(operation): Promise<void> {
    if (!typeEnumArray.includes(operation.type)) {
      throw new HttpException(`Nao existe nenhum tipo de operação chamado: ${operation.type}`, HttpStatus.NOT_FOUND);
    }

    if (!currencyEnumArray.includes(operation.currency)) {
      throw new HttpException(`Nao foi econtrada nenhuma moeda chamada: ${operation.currency}`, HttpStatus.NOT_FOUND);
    }
    await this.assetService.findById(operation.assetid);
  }

  async findById(id: string): Promise<operation> {
    const account = await this.operationRepository.findById(id);
    if (!account) {
      throw new HttpException(`Nao existe nenhuma operação com esse id`, HttpStatus.NOT_FOUND);
    }
    return account;
  }
}
