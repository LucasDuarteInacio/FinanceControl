import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { account } from '@prisma/client';
import { WalletRequestDTO } from '../wallet/DTO/walletRequestDTO.model';
import { WalletService } from '../wallet/wallet.service';
import { AccountRequestDTO } from './DTO/accountRequestDTO.model';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository, private walletService: WalletService) {}

  async findById(id: string): Promise<account> {
    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new HttpException(`Nao existe nenhuma conta esse id`, HttpStatus.NOT_FOUND);
    }
    return account;
  }

  async updateAccount(accountId, acccount): Promise<account> {
    await this.findById(accountId);
    acccount.accountid = accountId;
    return this.accountRepository.update(acccount);
  }

  async deleteAccount(accountId): Promise<account> {
    await this.findById(accountId);
    return this.accountRepository.delete(accountId);
  }

  async findAll(): Promise<account[]> {
    return this.accountRepository.findAll();
  }

  async newAccount(account: AccountRequestDTO): Promise<account> {
    let accountCreated;

    const cpf = await this.accountRepository.findBy('cpf', account.cpf);
    const email = await this.accountRepository.findBy('email', account.email);
    const cellphone = await this.accountRepository.findBy('cellphone', account.cellphone);

    if (cpf || email || cellphone) {
      throw new HttpException(`Usuario ja existe`, HttpStatus.CONFLICT);
    }

    try {
      accountCreated = await this.accountRepository.save(account);
      const wallet = new WalletRequestDTO(0, 0, 0, accountCreated.accountid);
      await this.walletService.newWallet(wallet);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return accountCreated;
  }
}
