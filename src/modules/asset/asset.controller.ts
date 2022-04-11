import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { asset } from '@prisma/client';
import { AssetService } from './asset.service';
import { AssetRequestDTO } from './DTO/assetRequestDTO.model';

@ApiTags('Assets')
@Controller('assets')
export class AssetController {
  constructor(private assetService: AssetService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Search asset by id' })
  @ApiResponse({
    status: 404,
    description: 'Did not find asset with the informed is',
  })
  findById(@Param('id') id: string): Promise<asset> {
    return this.assetService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Search all database assets' })
  findAll(): Promise<asset[]> {
    return this.assetService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Register new asset' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  newAsset(@Body() asset: AssetRequestDTO): Promise<asset> {
    return this.assetService.newAsset(asset);
  }

  @Put()
  @ApiOperation({ summary: 'Update account' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  updateAsset(@Body() asset: AssetRequestDTO, @Query('assetId') assetId: string): Promise<asset> {
    return this.assetService.updateAsset(assetId, asset);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete account' })
  @ApiResponse({ status: 404, description: 'accountId does not exist' })
  deleteAsset(@Query('assetId') assetId: string): Promise<asset> {
    return this.assetService.deleteAsset(assetId);
  }
}
