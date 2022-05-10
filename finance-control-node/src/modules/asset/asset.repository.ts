import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { asset } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AssetRepository {
  constructor(private prisma: PrismaService) {}

  async save(data: any): Promise<asset> {
    data.assetid = uuidv4();
    return await this.prisma.asset.create({
      data: data,
    });
  }

  async update(data): Promise<asset> {
    return this.prisma.asset.update({
      where: {
        assetid: data.assetid,
      },
      data: data,
    });
  }

  async delete(assetid): Promise<asset> {
    return this.prisma.asset.delete({
      where: {
        assetid,
      },
    });
  }

  async findById(assetid: string): Promise<asset> {
    return await this.prisma.asset.findUnique({
      where: {
        assetid,
      },
    });
  }

  async findBy(key: string, value: string): Promise<asset> {
    switch (key) {
      case 'abbreviation':
        return await this.prisma.asset.findUnique({
          where: {
            abbreviation: value,
          },
        });
      case 'name':
        return await this.prisma.asset.findUnique({
          where: {
            name: value,
          },
        });

      default:
        throw new HttpException(`Campo nao existe`, HttpStatus.NOT_FOUND);
    }
  }

  async findByAll(): Promise<asset[]> {
    return await this.prisma.asset.findMany();
  }
}
