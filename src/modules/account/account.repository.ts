import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { account } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}

  async findById(accountid: string): Promise<account> {
    return this.prisma.account.findUnique({
      where: {
        accountid,
      },
    });
  }

  async findByCpf(cpf: string): Promise<account> {
    return this.prisma.account.findUnique({
      where: {
        cpf,
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

  async findAll(): Promise<account[]> {
    return this.prisma.account.findMany();
  }

  async save(data: any): Promise<account> {
    data.accountid = uuidv4();
    return this.prisma.account.create({
      data: data,
    });
  }
}
