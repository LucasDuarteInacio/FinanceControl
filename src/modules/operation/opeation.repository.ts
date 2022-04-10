import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { operation } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OpeationRepository {
  constructor(private prisma: PrismaService) {}

  async save(data: any): Promise<operation> {
    data.operationid = uuidv4();
    return await this.prisma.operation.create({
      data: data,
    });
  }
}
