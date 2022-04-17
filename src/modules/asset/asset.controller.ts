import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { asset } from '@prisma/client';
import { AssetService } from './asset.service';
import { AssetRequestDTO } from './DTO/assetRequestDTO.model';
import { Roles } from '../../decorators/roles.decorator';
import { RolesEnum } from '../auth/enum/roles.enum';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';

@ApiTags('Assets')
@Controller('assets')
export class AssetController {
  constructor(private assetService: AssetService) {}

  @Get(':id')
  @ApiBearerAuth()
  @Roles(RolesEnum.Default, RolesEnum.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Search asset by id' })
  @ApiResponse({
    status: 404,
    description: 'Did not find asset with the informed is',
  })
  findById(@Param('id') id: string): Promise<asset> {
    return this.assetService.findById(id);
  }

  @Get()
  @ApiBearerAuth()
  @Roles(RolesEnum.Default, RolesEnum.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Search all database assets' })
  findAll(): Promise<asset[]> {
    return this.assetService.findAll();
  }

  @Post()
  @Roles(RolesEnum.Admin)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Register new asset' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  newAsset(@Body() asset: AssetRequestDTO): Promise<asset> {
    return this.assetService.newAsset(asset);
  }

  @Put()
  @Roles(RolesEnum.Admin)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update asset' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 404, description: 'assetId does not exist' })
  updateAsset(@Body() asset: AssetRequestDTO, @Query('assetId') assetId: string): Promise<asset> {
    return this.assetService.updateAsset(assetId, asset);
  }

  @Delete()
  @Roles(RolesEnum.Admin)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete asset' })
  @ApiResponse({ status: 404, description: 'assetId does not exist' })
  async deleteAsset(@Query('assetId') assetId: string): Promise<void> {
    await this.assetService.deleteAsset(assetId);
  }
}
