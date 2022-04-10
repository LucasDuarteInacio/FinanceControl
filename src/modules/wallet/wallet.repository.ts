import { Injectable } from '@nestjs/common';
import { wallet } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WalletRepository {
  constructor(private prisma: PrismaService) {}

  async save(data: any): Promise<wallet> {
    data.walletid = uuidv4();
    return this.prisma.wallet.create({
      data: data,
    });
  }

  async findById(walletid: string): Promise<wallet> {
    return this.prisma.wallet.findUnique({
      where: {
        walletid,
      },
    });
  }
}
