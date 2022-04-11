import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { asset } from '@prisma/client';
import { AssetRepository } from './asset.repository';
import { AssetRequestDTO } from './DTO/assetRequestDTO.model';

@Injectable()
export class AssetService {
  constructor(private assetRepository: AssetRepository) {}

  async newAsset(asset: AssetRequestDTO): Promise<asset> {
    const name = await this.assetRepository.findBy('abbreviation', asset.abbreviation);
    const abbreviation = await this.assetRepository.findBy('name', asset.name);

    if (name || abbreviation) {
      throw new HttpException(`Ativo ja existe`, HttpStatus.CONFLICT);
    }
    return this.assetRepository.save(asset);
  }

  async deleteAsset(assetId): Promise<asset> {
    await this.findById(assetId);
    return this.assetRepository.delete(assetId);
  }

  async updateAsset(assetId, asset): Promise<asset> {
    await this.findById(assetId);
    asset.assetid = assetId;
    return this.assetRepository.update(asset);
  }

  async findById(id: string): Promise<asset> {
    const asset = await this.assetRepository.findById(id);
    if (!asset) {
      throw new HttpException(`Nao existe nenhum ativo com o id: ${id}`, HttpStatus.NOT_FOUND);
    }

    return asset;
  }

  async findAll(): Promise<asset[]> {
    return await this.assetRepository.findByAll();
  }
}
