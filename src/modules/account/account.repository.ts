import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { account } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { AccountDTO } from './DTO/accountDTO.model';
import { WalletDTO } from '../wallet/DTO/walletDTO.model';

@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<account> {
    return this.prisma.account.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(accountId: string): Promise<AccountDTO> {
    const result: any = await this.prisma.$queryRaw`select * from account as a join wallet w on a.accountid = w.accountid where a.accountid = ${accountId}`;
    if (result.length === 0) {
      return null;
    }
    const account = result[0];

    const walletDTO: WalletDTO = new WalletDTO(account.walletid, account.investmentvalue, account.actualvalue, account.totalearnings);
    return new AccountDTO(
      account.accountid,
      account.firstname,
      account.lastname,
      account.email,
      account.cellphone,
      account.password,
      account.birthdate,
      account.address,
      account.city,
      account.postalcode,
      account.country,
      account.state,
      account.cpf,
      walletDTO,
    );
  }

  async update(data): Promise<account> {
    return this.prisma.account.update({
      where: {
        accountid: data.accountid,
      },
      data: data,
    });
  }

  async delete(accountid): Promise<account> {
    return this.prisma.account.delete({
      where: {
        accountid,
      },
    });
  }

  async findBy(key: string, value: string): Promise<account> {
    switch (key) {
      case 'cpf':
        return this.prisma.account.findFirst({
          where: {
            cpf: value,
          },
        });
      case 'email':
        return this.prisma.account.findFirst({
          where: {
            email: value,
          },
        });
      case 'cellphone':
        return this.prisma.account.findFirst({
          where: {
            cellphone: value,
          },
        });

      default:
        throw new HttpException(`Campo nao existe`, HttpStatus.NOT_FOUND);
    }
  }

  async findAll(): Promise<AccountDTO[]> {
    const accounts: AccountDTO[] = [];
    const query = 'select * from account as a\n' + 'join wallet w on a.accountid = w.accountid';
    const result: any[] = await this.prisma.$queryRawUnsafe(query);

    result.forEach((account) => {
      const walletDTO: WalletDTO = new WalletDTO(account.walletid, account.investmentvalue, account.actualvalue, account.totalearnings);
      const accountDTO: AccountDTO = new AccountDTO(
        account.accountid,
        account.firstname,
        account.lastname,
        account.email,
        account.cellphone,
        account.password,
        account.birthdate,
        account.address,
        account.city,
        account.postalcode,
        account.country,
        account.state,
        account.cpf,
        walletDTO,
      );
      accounts.push(accountDTO);
    });
    return accounts;
  }

  async save(data: any): Promise<account> {
    data.accountid = uuidv4();
    return this.prisma.account.create({
      data: data,
    });
  }
}
