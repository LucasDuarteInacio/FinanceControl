import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { wallet } from '@prisma/client';
import { WalletRequestDTO } from './DTO/walletRequestDTO.model';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  constructor(private walletRepository: WalletRepository) {}

  newWallet(wallet: WalletRequestDTO) {
    this.walletRepository.save(wallet);
  }

  async findById(id: string): Promise<wallet> {
    const wallet = await this.walletRepository.findById(id);
    if (!wallet) {
      throw new HttpException(`Nao existe nenhuma carteira com o id: ${id}`, HttpStatus.NOT_FOUND);
    }

    return wallet;
  }
}
